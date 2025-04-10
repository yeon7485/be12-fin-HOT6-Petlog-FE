<template>
  <div class="info-header">
    <div class="back-wrapper">
      <img
        class="back-icon"
        src="../../assets/images/arrow.svg"
        @click="goBack"
      />
    </div>
    <span class="room-title">{{ title }}</span>

    <!-- 조건부 메뉴 버튼 표시 -->
    <router-link v-if="showMenu" :to="`/chatroom/${roomIdx}/chatroom-info`">
      <button class="chatroom-menu">
        <img src="../../assets/images/material-symbols_menu-rounded.svg" />
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  roomIdx: Number,
  showMenu: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const goBack = () => router.back();
</script>

<style scoped>
/* 헤더: 가운데 정렬 */
.info-header {
  position: relative;
  display: flex;
  justify-content: center; /* ✅ 타이틀 가운데 정렬 */
  align-items: center;
  height: 40px; /* 필요시 명시 */
}

/* 뒤로 가기 */

.back-wrapper {
  position: absolute;
  left: 28px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.chatroom-menu {
  all: unset;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
