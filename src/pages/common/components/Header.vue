<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toHome = () => {
  router.push('/')
}

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const goToMyPage = () => {
  router.push('/mypage')
}

const logout = () => {
  alert('로그아웃 되었습니다.')
  router.push('/user/login')
}
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

        <div class="user_box">
          <img src="/src/assets/icons/alart.png" alt="alart" class="alart_icon" />
          <div class="nickname_wrapper" @click="toggleDropdown">
            <span :class="['nickname', { active: dropdownOpen }]">구름봄 님</span>
            <div v-if="dropdownOpen" class="dropdown">
              <div class="dropdown_item" @click="goToMyPage">마이페이지</div>
              <div class="dropdown_item" @click="logout">로그아웃</div>
            </div>
          </div>
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
  position: relative;
}

.alart_icon {
  width: 16px;
  height: 16px;
}

.nickname_wrapper {
  position: relative;
  cursor: pointer;
}

.nickname {
  color: black;
  transition: color 0.3s;
}

.nickname.active {
  color: #8B4513; /* 갈색 */
  font-weight: bold;
}

.dropdown {
  position: absolute;
  top: 28px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
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
</style>
