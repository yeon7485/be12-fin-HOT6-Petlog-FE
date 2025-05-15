import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useUserStore } from "../stores/useUserStore";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const useNotificationStore = defineStore("notification", () => {
  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isLogin);
  const notifications = ref([]);
  const unreadNotifications = ref(0);
  const currentUserId = ref(null);
  const stompClient = ref(null);

  const formatTime = (sentAt) => {
    const now = new Date();
    const sent = new Date(sentAt);
    const diffMs = now - sent;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return sent.toLocaleDateString() + " " + sent.toLocaleTimeString().slice(0, 5);
  };

  const fetchNotificationsFromServer = async () => {
    if (!currentUserId.value) return;
    try {
      const res = await axios.get(`/api/notification/user/${currentUserId.value}`);
      notifications.value = res.data.map((n) => ({
        idx: n.idx,
        title: "[알림]",
        content: `"${n.petName}"의 ${n.message}`,
        time: formatTime(n.sentAt),
        scheduleId: n.scheduleId,
        read: n.isRead,
      }));
    } catch (err) {
      console.error("❌ 알림 불러오기 실패:", err);
    }
  };

  const fetchUnreadCountFromServer = async () => {
    if (!currentUserId.value) return;
    try {
      const res = await axios.get(`/api/notification/user/unreadCount`);
      unreadNotifications.value = res.data;
      localStorage.setItem("unreadNotifications", unreadNotifications.value);
    } catch (err) {
      console.error("❌ 읽지 않은 알림 수 불러오기 실패:", err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/notification/${notificationId}/read`);

      const index = notifications.value.findIndex((n) => n.idx === notificationId);
      if (index !== -1) {
        notifications.value[index] = {
          ...notifications.value[index],
          read: true,
        };
      }

      await fetchUnreadCountFromServer();
    } catch (err) {
      console.error("❌ 알림 읽음 처리 실패:", err);
    }
  };

  const deleteNotification = async (notificationIdx, index) => {
    try {
      await axios.delete(`/api/notification/${notificationIdx}`);
      removeNotification(index);
      await fetchUnreadCountFromServer();
    } catch (err) {
      console.error("❌ 알림 삭제 실패:", err);
    }
  };

  const removeNotification = (index) => {
    notifications.value.splice(index, 1);
  };

  const connectWebSocket = () => {
    if (!currentUserId.value) return;
    if (stompClient.value) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("/api/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/alerts/${currentUserId.value}`, (msg) => {
          const data = JSON.parse(msg.body);
          notifications.value.unshift({
            idx: data.idx,
            title: "[알림]",
            content: `"${data.petName}"의 ${data.message}`,
            time: "방금 전",
            scheduleId: data.scheduleId,
            read: false,
          });

          unreadNotifications.value += 1;
          localStorage.setItem("unreadNotifications", unreadNotifications.value);
        });
      },
      onStompError: (frame) => {
        console.error("❌ WebSocket 오류:", frame);
      },
    });

    client.activate();
    stompClient.value = client;
  };

  const disconnectWebSocket = () => {
    if (stompClient.value) {
      stompClient.value.deactivate();
      stompClient.value = null;
    }
  };

  const loadUnreadNotifications = () => {
    const storedUnread = localStorage.getItem("unreadNotifications");
    if (storedUnread) {
      unreadNotifications.value = parseInt(storedUnread);
    }
  };

  const initNotification = async () => {
    currentUserId.value = userStore.idx || null;
    if (!currentUserId.value) return;

    await fetchNotificationsFromServer();
    await fetchUnreadCountFromServer();
    loadUnreadNotifications();
    connectWebSocket();
  };

  watch(isLoggedIn, (loggedIn) => {
    if (loggedIn) {
      initNotification();
    } else {
      currentUserId.value = null;
      notifications.value = [];
      unreadNotifications.value = 0;
      localStorage.removeItem("unreadNotifications");
      disconnectWebSocket();
    }
  }, { immediate: true });

  return {
    notifications,
    unreadNotifications,
    fetchNotificationsFromServer,
    fetchUnreadCountFromServer,
    deleteNotification,
    removeNotification,
    markAsRead,
    connectWebSocket,
    disconnectWebSocket,
    loadUnreadNotifications,
    initNotification,
  };
});
