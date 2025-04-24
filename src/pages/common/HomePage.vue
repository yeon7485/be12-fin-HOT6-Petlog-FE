<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ScheduleCard from "../schedule/components/ScheduleCard.vue";
import ChatCard from "/src/pages/chat/components/ChatCard.vue";
import LandingPage from "./LandingPage.vue";
import { useUserStore } from "../../stores/useUserStore";
import { useScheduleStore } from "/src/stores/useScheduleStore.js";
import { useChatStore } from "/src/stores/useChatStroe.js";

const userStore = useUserStore();
const isLoading = ref(true);
const chatStore = useChatStore();
const scheduleStore = useScheduleStore();

const schedules = ref([]);
const rooms = ref([]);

const router = useRouter();
const handleScheduleClick = (idx) => {
  router.push(`/schedule/detail/${idx}`);
};

onMounted(async () => {
  await userStore.loginCheck();

  if (userStore.isLogin) {
    try {
      await chatStore.loadMyChatRooms();
      rooms.value = chatStore.chatRooms;

      await scheduleStore.loadTodaySchedules();
      schedules.value = scheduleStore.todaySchedules;
    } catch (e) {
      console.error(e);
    }
  }

  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading"></div>
  <LandingPage v-else-if="!userStore.isLogin" />
  <div v-else class="home">
    <!-- 로고와 텍스트 -->
    <div class="logo-area">
      <img src="/src/assets/images/logo.png" alt="펫로그 로고" class="logo-img" />
      <div class="subtitle-wrapper">
        <p class="subtitle">
          일정 관리부터 커뮤니티까지,<br />반려생활을 더 편리하게!
        </p>
      </div>
    </div>

    <!-- 오늘의 일정 -->
    <section class="today-schedule">
      <div class="section-header">
        <img src="/src/assets/icons/calendar.png" alt="일정 아이콘" class="section-icon" />
        <h2 class="section-title">오늘의 일정</h2>
      </div>
      <div v-if="schedules.length" class="card-wrapper">
        <ScheduleCard
          v-for="schedule in schedules"
          :key="schedule.idx"
          :item="schedule"
          @click="handleScheduleClick(schedule.idx)"
        />
      </div>
      <div v-else class="no-schedule">일정이 없습니다.</div>
    </section>

    <!-- 참여 중인 채팅방 -->
    <section class="chat-room">
      <div class="section-header">
        <img src="/src/assets/icons/chat.png" alt="채팅 아이콘" class="section-icon" />
        <h2 class="section-title">참여 중인 채팅방</h2>
      </div>
      <div v-if="rooms.length" class="chat-card-list">
        <ChatCard
          v-for="room in rooms"
          :key="room.idx"
          :room="room"
        />
      </div>
      <div v-else class="no-chat">현재 참여 중인 채팅방이 없습니다.</div>
    </section>
  </div>
</template>

<style scoped>
.home {
  font-family: "Noto Sans KR", sans-serif;
}

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

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  justify-content: center;
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

.card-wrapper {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.chat-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.no-schedule,
.no-chat {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 12px;
}
</style>
