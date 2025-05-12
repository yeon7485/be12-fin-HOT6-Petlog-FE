<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/useUserStore.js";
import { useNotificationStore } from "../../../stores/useNoticeStore.js";
import NoticeDropdown from "./NoticeDropdown.vue";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();
const store = useNotificationStore();

const dropdownOpen = ref(false);
const alertOpen = ref(false);
const isLoading = ref(true);
const dropdownRef = ref(null);

// 로그인 상태, 닉네임
const isLoggedIn = computed(() => userStore.isLogin);
const nickname = computed(() => userStore.nickname);

// ✅ 서버에서 가져온 읽지 않은 알림 개수 사용
const unreadNotifications = computed(() => store.unreadNotifications);

// 홈으로 이동
const toHome = () => router.push("/");

// 외부 클릭 시 드롭다운 닫기
const handleOutsideClick = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
    alertOpen.value = false;
  }
};

// 드롭다운 토글
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// 알림 아이콘 클릭 시 열기 및 읽음 처리
const handleAlertClick = async () => {
  alertOpen.value = !alertOpen.value;

  if (alertOpen.value) {
    try {
      const unread = store.notifications.filter((n) => !n.read);
      for (const n of unread) {
        await store.markAsRead(n.idx); // 서버에 읽음 처리
      }

      await store.fetchNotificationsFromServer();       // 알림 목록 동기화
      await store.fetchUnreadCountFromServer();         // ✅ 알림 수 동기화
    } catch (err) {
      console.error("❌ 알림 읽음 처리 실패:", err);
    }
  }
};

// 마이페이지 이동
const goToMyPage = () => {
  router.push(userStore.type === "ADMIN" ? "/admin" : "/mypage");
};

// 로그아웃 처리
const logout = async () => {
  const result = await userStore.logout();
  if (result.isSuccess) {
    alert("로그아웃 되었습니다.");
    router.push("/");
    if (router.currentRoute.value.path === "/") window.location.reload();
  } else {
    alert("로그아웃 실패");
  }
};

// 알림 항목 클릭
const handleClick = async (n) => {
  if (!n.read) {
    try {
      await store.markAsRead(n.idx); // 서버에 읽음 처리
      alert(`${n.title}\n\n${n.content}`);
      await store.fetchNotificationsFromServer(); // 다시 fetch
      await store.fetchUnreadCountFromServer();   // ✅ 수량도 동기화
    } catch (err) {
      console.error("❌ 알림 읽음 처리 실패:", err);
    }
  } else {
    alert(`${n.title}\n\n${n.content}`);
  }
};

// 알림 삭제
const deleteNotification = async (idx, index) => {
  try {
    await axios.delete(`/api/notification/${idx}`);
    store.removeNotification(index);
    await store.fetchUnreadCountFromServer(); // 삭제 후 수량 갱신
  } catch (err) {
    console.error("❌ 알림 삭제 실패:", err);
  }
};

onMounted(async () => {
  await userStore.loginCheck();
  isLoading.value = false;

  store.connectWebSocket?.(); // 소켓 연결
  await store.fetchNotificationsFromServer();      // 전체 알림
  await store.fetchUnreadCountFromServer();        // ✅ 서버 기준 안읽은 개수
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <header v-if="!isLoading" class="header" ref="dropdownRef">
    <div class="header_container">
      <div class="header_box">
        <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />
        <div class="menu_box">
          <a href="/schedule" class="menu">일정</a>
          <a href="/place" class="menu">지도</a>
          <a href="/board" class="menu">게시판</a>
          <a href="/chat" class="menu">채팅</a>
        </div>
        <div class="user_box">
          <template v-if="!isLoggedIn">
            <router-link to="/user/signup" class="signup">회원가입</router-link>
            <div class="line"></div>
            <router-link to="/user/login" class="login">로그인</router-link>
          </template>

          <template v-else>
            <div class="alert-wrapper" @click="handleAlertClick">
              <div class="alart-icon-container">
                <img src="/src/assets/icons/alart.png" alt="alart" class="alart_icon" />
                <span v-if="unreadNotifications > 0" class="badge">{{ unreadNotifications }}</span>
              </div>
              <NoticeDropdown v-if="alertOpen" class="notice_dropdown" />
            </div>

            <div class="nickname_wrapper" @click="toggleDropdown">
              <span :class="['nickname', { active: dropdownOpen }]">{{ nickname }} 님</span>
              <div v-if="dropdownOpen" class="dropdown">
                <div class="dropdown_item" @click="goToMyPage">마이페이지</div>
                <div class="dropdown_item" @click="logout">로그아웃</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  z-index: 10;
}

.header_container {
  height: 100%;
  margin: 0 10%;
}

.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 700px;
  font-weight: 500;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo_img {
  height: 43px;
  margin-bottom: 6px;
  cursor: pointer;
}

.menu_box {
  display: flex;
  gap: 72px;
  flex-grow: 1;
  margin-left: 40px;
  flex-shrink: 0;
}

.menu {
  text-decoration: none;
  color: inherit;
}

.menu:hover {
  color: var(--main-color-mid);
}

.user_box {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
}

.alert-wrapper {
  position: relative;
}

.alart_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.notice_dropdown {
  position: absolute;
  top: 28px;
  right: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 360px;
  padding: 12px 0;
}

.nickname_wrapper {
  position: relative;
  cursor: pointer;
}

.nickname {
  color: black;
  transition: color 0.3s;
}

.nickname:hover {
  color: #8b4513;
}

.nickname.active {
  color: #8b4513;
}

.dropdown {
  position: absolute;
  top: 28px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 8px 0;
  z-index: 100;
  min-width: 120px;
}

.dropdown_item {
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown_item:hover {
  background-color: #f5f5f5;
}

.line {
  width: 1px;
  height: 16px;
  background-color: var(--gray500);
}

.signup {
  text-decoration: none;
  color: var(--main-color-brown);
}

.login {
  text-decoration: none;
  color: inherit;
}

.badge {
  position: absolute;
  top: -7px;
  right: -7px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  text-align: center;
  line-height: 14px;
}
</style>
