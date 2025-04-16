<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/useUserStore";
import NoticeDropdown from "./NoticeDropdown.vue";

const router = useRouter();
const userStore = useUserStore();

const toHome = () => router.push("/");
const dropdownOpen = ref(false);
const alertOpen = ref(false);

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
    window.location.reload();
    router.push("/");
  } else {
    alert("로그아웃 실패");
  }
};

const isLoggedIn = computed(() => userStore.isLogin);

onMounted(() => {
  userStore.loginCheck();
});
</script>

<template>
  <header class="header">
    <div class="header_container">
      <div class="header_box">
        <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

        <div class="menu_box">
          <router-link to="/schedule" class="menu">일정</router-link>
          <router-link to="/place" class="menu">지도</router-link>
          <router-link to="/board" class="menu">게시판</router-link>
          <router-link to="/chat" class="menu">채팅</router-link>
        </div>

        <div class="user_box">
          <template v-if="!isLoggedIn">
            <router-link to="/user/signup" class="signup">회원가입</router-link>
            <div class="line"></div>
            <router-link to="/user/login" class="login">로그인</router-link>
          </template>

          <template v-else>
            <!-- ✅ 알림 아이콘 클릭 시 드롭다운 토글 -->
            <div class="alert-wrapper" @click="toggleAlert">
              <img src="/src/assets/icons/alart.png" alt="alart" class="alart_icon" />
              <NoticeDropdown v-if="alertOpen" class="notice_dropdown" />
            </div>

            <div class="nickname_wrapper" @click="toggleDropdown">
              <span :class="['nickname', { active: dropdownOpen }]"
                >{{ userStore.getNickname() }} 님</span
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
</style>
