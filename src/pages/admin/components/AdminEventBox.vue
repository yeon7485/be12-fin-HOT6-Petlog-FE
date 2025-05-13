<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../../stores/useAdminStore.js'; // Pinia store

const store = useAdminStore(); // Pinia store 사용

// 채팅방 목록을 그대로 가져옴
const rooms = computed(() => store.adminChatRooms);

const currentTime = new Date();

// 상태 계산 (오픈 전, 진행 중)
const eventStatus = (startDateTime, currentPeople, maxParticipants) => {
  const startDate = new Date(startDateTime);
  if (currentTime < startDate) {
    return '오픈 전';
  } else if (currentTime >= startDate && currentPeople < maxParticipants) {
    return '진행 중';
  }
};

// 날짜 포맷: 월/일 시:분 형식으로 표시 (초는 제외)
const formattedDate = (startDateTime) => {
  const startDate = new Date(startDateTime);
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();
  return `${month}/${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};
</script>

<template>
  <div class="chatroom-list">
    <!-- 채팅방이 없으면 "채팅방이 없습니다." 메시지 표시 -->
    <div v-if="rooms.length === 0" class="no-room">채팅방이 없습니다.</div>

    <!-- 반복문을 사용하여 채팅방 목록 표시 -->
    <div v-for="room in rooms" :key="room.idx" class="event-card">
      <div class="left">
        <div class="meta">
          <!-- 날짜 및 시간 간결하게 표시 -->
          <span class="time">{{ formattedDate(room.startDateTime) }}</span>
          <span class="status">{{ eventStatus(room.startDateTime, room.participants, room.maxParticipants) }}</span>
        </div>
        <div class="title">{{ room.title }}</div>
      </div>
      <div class="right">
        <img src="/src/assets/icons/people.svg" class="icon" alt="people" />
        <span>{{ room.participants }} / {{ room.maxParticipants }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border: 1px solid #5b0000;
  border-radius: 16px;
  background-color: white;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.event-card.active {
  border-color: #388e3c;
}

.event-card.inactive {
  border-color: #5b0000;
}

.left {
  display: flex;
  flex-direction: column;
}

.meta {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 6px;
  font-size: 14px;
  color: #444;
}

.status {
  font-size: 12px;
  background-color: #ddd;
  padding: 2px 6px;
  border-radius: 10px;
  color: #333;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.right {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  gap: 6px;
  margin-top: 4px;
}

.icon {
  width: 18px;
  height: 18px;
}
</style>
