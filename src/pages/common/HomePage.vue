<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ChatCard from "/src/pages/chat/components/ChatCard.vue";
import LandingPage from "./LandingPage.vue";
import { useUserStore } from "../../stores/useUserStore";
import { useScheduleStore } from "/src/stores/useScheduleStore.js";
import { useChatStore } from "/src/stores/useChatStore.js";
import HomeScheduleCard from "./components/HomeScheduleCard.vue";

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
    <div class="logo_area">
      <img src="/src/assets/images/logo.png" alt="펫로그 로고" class="logo_img" />
      <div class="subtitle_wrapper">
        <p class="subtitle">일정 관리부터 커뮤니티까지,<br />반려생활을 더 편리하게!</p>
      </div>
    </div>

    <!-- 오늘의 일정 -->
    <div class="body">
      <section class="today_schedule">
        <div class="section_header">
          <img src="/src/assets/icons/calendar.png" alt="일정 아이콘" class="section_icon" />
          <h2 class="section_title">오늘의 일정</h2>
        </div>
        <div v-if="schedules.length" class="card_wrapper">
          <HomeScheduleCard
            v-for="schedule in schedules"
            :key="schedule.idx"
            :item="schedule"
            @click="handleScheduleClick(schedule.idx)"
          />
        </div>
        <div v-else class="no_schedule">일정이 없습니다.</div>
      </section>

      <!-- 참여 중인 채팅방 -->
      <section class="chat_room">
        <div class="section_header">
          <img src="/src/assets/icons/chat.png" alt="채팅 아이콘" class="section_icon" />
          <h2 class="section_title">참여 중인 채팅방</h2>
        </div>
        <div v-if="rooms.length" class="chat_card_list">
          <ChatCard v-for="room in rooms" :key="room.idx" :room="room" />
        </div>
        <div v-else class="no_chat">현재 참여 중인 채팅방이 없습니다.</div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home {
  font-family: "Noto Sans KR", sans-serif;
}

.logo_area {
  background-color: #fefaf6;
  padding: 40px 0;
  text-align: center;
}

.logo_img {
  height: 90px;
  margin-bottom: 20px;
}

.subtitle_wrapper {
  background-color: #fefaf6;
}

.subtitle {
  font-family: Cafe24Ssurround;
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}

.body {
  margin: 68px 20%;
}

.section_header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section_icon {
  width: 25px;
  height: 25px;
}

.section_title {
  font-size: 18px;
  color: #111;
  text-align: left;
  margin: 0;
  padding: 0;
  border: none;
}

.card_wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  flex-wrap: wrap;
  margin: 15px 0 70px;
}

.chat_card_list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 15px;
}

.no_schedule,
.no_chat {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 50px 0;
}
</style>
