import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useUserStore } from "../stores/useUserStore"; // 사용자 스토어
import axios from "axios";

export const useNotificationStore = defineStore("notification", () => {
  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isLogin); // 로그인 여부 감지
  const notifications = ref([]); // 알림 리스트
  const currentUserId = ref(null); // 로그인된 유저 ID
  const unreadNotifications = ref(0); // 읽지 않은 알림 수

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
    if (!currentUserId.value) return;  // 로그인하지 않으면 요청하지 않음
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
    if (!currentUserId.value) return;  // 로그인하지 않으면 요청하지 않음
    try {
      const res = await axios.get(`/api/notification/user/unread-count`);
      unreadNotifications.value = res.data;
      localStorage.setItem("unreadNotifications", unreadNotifications.value);
    } catch (err) {
      console.error("❌ 읽지 않은 알림 수 불러오기 실패:", err);
    }
  };

  // 로그인 상태 변화에 따라 알림 처리
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      currentUserId.value = userStore.idx;  // 로그인한 유저의 ID
      fetchNotificationsFromServer();  // 알림 불러오기
      fetchUnreadCountFromServer();    // 읽지 않은 알림 수 가져오기
    } else {
      currentUserId.value = null;  // 로그아웃 시 ID 초기화
      notifications.value = [];  // 알림 리스트 초기화
      unreadNotifications.value = 0; // 읽지 않은 알림 수 초기화
    }
  });

  return {
    notifications,
    fetchNotificationsFromServer,
    fetchUnreadCountFromServer,
    unreadNotifications,
  };
});
