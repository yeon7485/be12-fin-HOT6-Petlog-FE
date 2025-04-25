import { defineStore } from "pinia";
import { ref } from "vue";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]); // 알림 리스트
  const stompClient = ref(null); // WebSocket 클라이언트

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
    return (
      sent.toLocaleDateString() + " " + sent.toLocaleTimeString().slice(0, 5)
    );
  };

  // 서버에서 알림 불러오기
  const fetchNotificationsFromServer = async () => {
    if (!currentUserId.value) return;
    try {
      const res = await axios.get(
        `/api/notification/user/${currentUserId.value}`
      );
      notifications.value = res.data.map((n) => ({
        idx: n.idx,
        title: "[알림]",
        content: `"${n.petName}"의 ${n.message}`,
        time: formatTime(n.sentAt),
        read: false, // 기본적으로 읽지 않은 상태로 설정
      }));
    } catch (err) {
      console.error("❌ 알림 불러오기 실패:", err);
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
            content: `"${n.petName}"의 ${n.message}`,
            time: "방금 전",
            read: false, // 새로운 알림은 기본적으로 읽지 않은 상태
          });
        });
      },
      onStompError: (frame) => {
        console.error("❌ WebSocket 오류:", frame);
      },
    });
    client.activate();
    stompClient.value = client;
  };

  // 알림 삭제 (UI에서)
  const removeNotification = (index) => {
    notifications.value.splice(index, 1);
  };

  const markAsRead = async (notificationId) => {
    try {
      // 서버에 알림 읽음 상태 반영
      await axios.patch(`/api/notification/${notificationId}/read`);

      // 로컬 상태 갱신: 해당 알림을 찾아 읽음 처리
      const notification = notifications.value.find(
        (n) => n.idx === notificationId
      );
      if (notification) {
        notification.read = true; // 읽음 처리
      }

      // 배지 갯수 업데이트: 읽지 않은 알림 수 갱신
      unreadNotifications.value = notifications.value.filter(
        (n) => !n.read
      ).length;
    } catch (err) {
      console.error("❌ 알림 읽음 처리 실패:", err);
    }
  };

  return {
    notifications,
    currentUserId,
    connectWebSocket,
    fetchNotificationsFromServer,
    removeNotification,
    deleteNotification,
    markAsRead, // 읽음 처리 메서드 반환
  };
});
