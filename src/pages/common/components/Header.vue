<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toHome = () => {
  router.push("/");
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header_box">
        <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

        <div class="menu_box">
          <router-link to="/schedule" class="menu">일정</router-link>
          <router-link to="/place" class="menu">지도</router-link>
          <router-link to="/board" class="menu">게시판</router-link>
          <router-link to="/chat" class="menu">채팅</router-link>
        </div>
        <!-- 
        <div class="user_box">
          <router-link to="/user/signup" class="signup">회원가입</router-link>
          <div class="line"></div>
          <router-link to="/user/login" class="login">로그인</router-link>
        </div> -->
        <div class="user_box">
          <img src="/src/assets/icons/alart.png" alt="alart" class="alart_icon" />
          <span>구름봄 님</span>
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

.container {
  width: 100%;
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
  color: var(--maincolor_light);
}

.user_box {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.line {
  width: 1px;
  height: 16px;
  background-color: var(--gray500);
}

.signup {
  text-decoration: none;
  color: var(--maincolor01);
}

.login {
  text-decoration: none;
  color: inherit;
}

.alart_icon {
  width: 16px;
  height: 16px;
}
</style>
