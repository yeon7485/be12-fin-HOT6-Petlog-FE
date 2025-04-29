<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/useUserStore";
import { useNotificationStore } from "../../../stores/useNoticeStore";
import NoticeDropdown from "./NoticeDropdown.vue";
import { watch } from 'vue';


const router = useRouter();
const userStore = useUserStore();
const store = useNotificationStore();

// 알림 배지 상태 (읽지 않은 알림 수)
const unreadNotifications = ref(0);
const nickname = computed(() => userStore.nickname);

const toHome = () => router.push("/");
const dropdownOpen = ref(false);
const alertOpen = ref(false);

// 알림 아이콘 클릭 시 드롭다운 토글
const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value);
const toggleAlert = () => (alertOpen.value = !alertOpen.value);

const goToMyPage = () => {
  if (userStore.type === "ADMIN") {
    router.push("/admin");
  } else {
    router.push("/mypage");
  }
};

const logout = async () => {
  const result = await userStore.logout();
  if (result.isSuccess) {
    alert("로그아웃 되었습니다.");
    if (router.currentRoute.value.path === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  } else {
    alert("로그아웃 실패");
  }
};

const isLoggedIn = computed(() => userStore.isLogin);
const isLoading = ref(true);

// WebSocket 연결 및 알림 수 동기화
onMounted(async () => {
  await userStore.loginCheck();
  isLoading.value = false;
  store.connectWebSocket();
  store.fetchNotificationsFromServer(); // 서버에서 알림 목록 로딩
});

const handleClick = async (n) => {
  n.read = true; // 로컬 상태에서 읽음 처리
  unreadNotifications.value = store.notifications.filter((n) => !n.read).length; // 배지 갱신

  try {
    // 서버에 읽음 상태 반영
    await store.markAsRead(n.idx);

    alert(`${n.title}\n\n${n.content}`);
  } catch (err) {
    console.error("❌ 알림 읽음 처리 실패:", err);
  }
};

// 알림 삭제
const deleteNotification = async (idx, index) => {
  console.log("🧪 삭제 요청: ", idx); // 여기서 undefined 뜨면 문제 발생 위치 확정
  try {
    await axios.delete(`/api/notification/${idx}`);
    store.removeNotification(index);
  } catch (err) {
    console.error("❌ 알림 삭제 실패:", err);
  }
};

// 읽지 않은 알림 수 계산
store.$subscribe(() => {
  unreadNotifications.value = store.notifications.filter((n) => !n.read).length;
})

watch(
  () => userStore.nickname,
  (newNickname, oldNickname) => {
    console.log('닉네임 변경 감지:', oldNickname, '->', newNickname);
  
  }
);
</script>

<template>
  <header v-if="!isLoading" class="header">
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
            <!-- 알림 아이콘 클릭 시 드롭다운 토글 -->
            <div class="alert-wrapper" @click="toggleAlert">
              <div class="alart-icon-container">
                <img src="/src/assets/icons/alart.png" alt="alart" class="alart_icon" />
                <!-- 미확인 알림 배지 -->
                <span v-if="unreadNotifications > 0" class="badge">{{ unreadNotifications }}</span>
              </div>
              <NoticeDropdown v-if="alertOpen" class="notice_dropdown" />
            </div>

            <div class="nickname_wrapper" @click="toggleDropdown">
              <span :class="['nickname', { active: dropdownOpen }]"
                >  {{ nickname }} 님</span
              >
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
  top: -7px; /* 배지 위치를 좀 더 위로 올려서 아이콘과 겹치지 않게 설정 */
  right: -7px; /* 배지 위치를 오른쪽으로 살짝 이동 */
  background-color: red;
  color: white;
  border-radius: 50%; /* 원형으로 만들기 */
  padding: 2px 5px; /* 크기를 더 줄이기 위해 패딩을 최소화 */
  font-size: 11px; /* 글자 크기 더 줄임 */
  min-width: 14px; /* 배지의 최소 너비 */
  height: 14px; /* 배지 높이 조정 */
  text-align: center; /* 텍스트 가운데 정렬 */
  line-height: 14px; /* 텍스트 세로 정렬 */
}
</style>
