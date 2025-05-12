import { defineStore } from "pinia";
import { ref } from "vue";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]); // 알림 리스트
  const stompClient = ref(null); // WebSocket 클라이언트
  const unreadNotifications = ref(0); // 읽지 않은 알림 수

  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const currentUserId = ref(storedUser.idx || null); // 로그인된 유저 ID

  // 시간 포맷 함수
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

  // ✅ 서버에서 알림 전체 불러오기
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

  // ✅ 안 읽은 알림 개수만 서버에서 가져오기
  const fetchUnreadCountFromServer = async () => {
    try {
      const res = await axios.get(`/api/notification/user/unread-count`);
      unreadNotifications.value = res.data;
      localStorage.setItem("unreadNotifications", unreadNotifications.value);
    } catch (err) {
      console.error("❌ 읽지 않은 알림 수 불러오기 실패:", err);
    }
  };

  // 알림 삭제
  const deleteNotification = async (notificationIdx, index) => {
    try {
      await axios.delete(`/api/notification/${notificationIdx}`);
      removeNotification(index);
    } catch (err) {
      console.error("❌ 알림 삭제 실패:", err);
    }
  };

  // WebSocket 연결 및 실시간 알림 수신
  const connectWebSocket = () => {
    if (!currentUserId.value || stompClient.value) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("/ws"),
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

          // ✅ 새 알림이므로 수동으로 +1
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

  // 알림 삭제 (UI에서만 제거)
  const removeNotification = (index) => {
    notifications.value.splice(index, 1);
  };

  // 알림 읽음 처리
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

      // ✅ 서버에서 최신 unread count 재동기화
      await fetchUnreadCountFromServer();
    } catch (err) {
      console.error("❌ 알림 읽음 처리 실패:", err);
    }
  };

  // 페이지 이동 시 로컬 값으로 초기 설정
  const loadUnreadNotifications = () => {
    const storedUnread = localStorage.getItem("unreadNotifications");
    if (storedUnread) {
      unreadNotifications.value = parseInt(storedUnread);
    }
  };

  return {
    notifications,
    currentUserId,
    unreadNotifications,
    fetchNotificationsFromServer,
    fetchUnreadCountFromServer, // ✅ 새로 추가된 메서드
    deleteNotification,
    removeNotification,
    connectWebSocket,
    markAsRead,
    loadUnreadNotifications,
  };
});
