<template>
  <div class="chatroom-info-container">
    <!-- 뒤로가기 -->
    <ChatHeader :title="roomTitle" :roomIdx="chatroomIdx" />

    <div class="schedule-inner">
      <!-- 일정 목록 -->
      <div class="schedule-section">
        <div class="schedule-section-header">
          <h3 class="schedule-title">일정 목록</h3>
          <router-link
            :to="`/chatroom/${chatroomIdx}/chatroom-schedule/create`"
            class="edit-button"
          >
            <img
              src="../../assets/images/jam_write.svg"
              alt="편집"
              class="edit-icon"
            />
          </router-link>
        </div>

        <div class="scrollable schedule-list">
          <ScheduleCard
            v-for="schedule in chatStore.chatRoomScheduleList"
            :key="schedule.idx"
            :chatroomIdx="chatroomIdx"
            :schedule="schedule"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "../../stores/useChatStroe";
import { onMounted, computed } from "vue";

import { useRoute } from "vue-router";
import ChatHeader from "./ChatHeader.vue";
import ScheduleCard from "./components/ScheduleCard.vue";
const route = useRoute();
const chatroomIdx = route.params.chatroomIdx;
const chatStore = useChatStore();
const roomTitle = computed(() => chatStore.chatRoomInfo?.title || "채팅방");
onMounted(() => {
  chatStore.getChatRoomScheduleList(chatroomIdx);
  chatStore.getRoomInfo(chatroomIdx);
});
</script>

<style scoped>
@import "./chat-base.css";

/* 💡 내부 공통 여백용 래퍼 (좌우 여백 130px) */
.schedule-inner {
  padding: 0 130px;
  width: 100%;
  box-sizing: border-box;
}

.chatroom-title {
  font-size: 18px;
  font-weight: bold;
}

/* 일정 목록 섹션 */
.schedule-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 일정 목록 타이틀 + 연필 */
.schedule-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  padding-bottom: 8px;
}

.schedule-title {
  font-size: 16px;
  font-weight: bold;
}

.edit-icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 일정 카드 리스트 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* 스크롤 동작을 위해 높이 추가 */
  max-height: 720px; /* ✅ 필요에 따라 조정 */
  overflow-y: auto;

  /* 부드러운 스크롤 (선택) */
  scroll-behavior: smooth;

  background-color: #f4eee7; /* ✅ 주변 배경과 맞춤 */
  padding: 12px;
  border-radius: 12px;
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* ✅ 기존보다 더 어둡게 */
  border: 1px solid #ccc; /* ✅ 테두리로 레이어 강조 */
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  box-sizing: border-box;
}
.schedule-modal {
  width: 360px; /* ✅ 더 넓게 */
  background-color: #fff;
  border-radius: 16px;
  padding: 32px 36px; /* ✅ 전체적으로 넉넉한 내부 여백 */
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  max-height: calc(100% - 280px); /* ✅ 위아래 더 여유 */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 24px; /* ✅ 요소 간 간격도 넉넉하게 */
}
</style>
