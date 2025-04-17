<script setup>
import { onMounted, ref } from "vue";
import ScheduleCard from "../schedule/components/ScheduleCard.vue";
import { useUserStore } from "../../stores/useUserStore";
import LandingPage from "./LandingPage.vue";

const userStore = useUserStore();
const isLoading = ref(true);

onMounted(async () => {
  await userStore.loginCheck();
  isLoading.value = false;
});
</script>

<template>
  <template v-if="isLoading">
    <!-- 로딩 중일 때는 아무것도 보여주지 않음 -->
  </template>
  <template v-else-if="!userStore.isLogin">
    <LandingPage />
  </template>
  <template v-else>
    <div class="home">
      <!-- 배경색 적용 영역: 로고 + 텍스트까지만 -->
      <div class="logo-area">
        <img src="/src/assets/images/logo.png" alt="펫로그 로고" class="logo-img" />
        <div class="subtitle-wrapper">
          <p class="subtitle">일정 관리부터 커뮤니티까지,<br />반려생활을 더 편리하게!</p>
        </div>
      </div>

      <!-- 오늘의 일정 -->
      <section class="today-schedule">
        <div class="section-header">
          <img src="/src/assets/icons/calendar.png" alt="일정 아이콘" class="section-icon" />
          <h2 class="section-title">오늘의 일정</h2>
        </div>
        <div class="card-wrapper">
          <ScheduleCard v-for="n in 3" :key="n" />
        </div>
      </section>

      <!-- 참여 중인 채팅방 -->
      <section class="chat-room">
        <div class="section-header">
          <img src="/src/assets/icons/chat.png" alt="채팅 아이콘" class="section-icon" />
          <h2 class="section-title">참여 중인 채팅방</h2>
        </div>
        <div class="chat-card">
          <div class="chat-card-content">
            <div class="chat-info">
              <div class="chat-texts">
                <p class="message">
                  <strong>서울숲에서 같이 멍멍이 산책시킬 사람 !!</strong>
                </p>
                <p class="hashtags">#산책 #멍멍 #서울숲</p>
              </div>
              <p class="participants">👥 6명 참여 중</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
</template>

<style scoped>
.home {
  font-family: "Noto Sans KR", sans-serif;
}

/* 로고와 텍스트 부분만 배경색 적용 */
.logo-area {
  background-color: #fefaf6;
  padding: 10px 5px 6px;
  text-align: center;
}

.logo-img {
  height: 90px;
  margin-bottom: 10px;
}

.subtitle-wrapper {
  background-color: #fefaf6;
}

.subtitle {
  font-weight: 600;
  font-size: 20px;
  color: #333;
  line-height: 1.5;
}

.today-schedule,
.chat-room {
  margin-top: 40px;
  padding: 0 20px;
}

/* 공통: 섹션 헤더 (아이콘 + 타이틀 수평정렬) */
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  margin-left: 400px;
}

.section-icon {
  width: 40px;
  height: 40px;
}

.section-title {
  font-size: 18px;
  color: #111;
  text-align: left;
  margin: 0;
  padding: 0;
  border: none;
}

/* 오늘의 일정 카드들 */
.card-wrapper {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* 채팅 카드 */
.chat-card {
  border: 2px solid #d9534f;
  border-radius: 10px;
  padding: 16px;
  background: white;
  margin: 10px auto 0;
  max-width: 700px;
  text-align: left;
}

.chat-card-content {
  display: flex;
}

.chat-info {
  flex: 1;
}

.message {
  font-size: 16px;
  margin-bottom: 8px;
}

.hashtags {
  color: #8b4513;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 30px;
}

.participants {
  font-size: 14px;
  color: #555;
  text-align: right;
  margin-top: 4px;
}
</style>
