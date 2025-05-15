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
  const stompClient = ref(null); // ✅ stomp client 상태 저장

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
    if (!currentUserId.value) return;
    try {
      const res = await axios.get(`/api/notification/user/unread-count`);
      unreadNotifications.value = res.data;
      localStorage.setItem("unreadNotifications", unreadNotifications.value);
    } catch (err) {
      console.error("❌ 읽지 않은 알림 수 불러오기 실패:", err);
    }
  };

  // ✅ 웹소켓 연결 함수
  const connectWebSocket = () => {
    if (!currentUserId.value) return;

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

  // ✅ 로그인 상태 변화 감지
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      currentUserId.value = userStore.idx;
      fetchNotificationsFromServer();
      fetchUnreadCountFromServer();
      connectWebSocket(); // 웹소켓 연결
    } else {
      currentUserId.value = null;
      notifications.value = [];
      unreadNotifications.value = 0;
      if (stompClient.value) {
        stompClient.value.deactivate(); // 로그아웃 시 웹소켓 연결 해제
        stompClient.value = null;
      }
    }
  });

  return {
    notifications,
    fetchNotificationsFromServer,
    fetchUnreadCountFromServer,
    unreadNotifications,
    connectWebSocket, // ✅ 외부에서 사용 가능하게 추가
  };
});
