<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
</template>

<style scoped>
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
  color: #8B4513;
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
