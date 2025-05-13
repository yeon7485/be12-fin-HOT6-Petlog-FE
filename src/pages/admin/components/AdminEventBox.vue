<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';  // vue-router import
import { useAdminStore } from '../../../stores/useAdminStore.js';  // Pinia store

const store = useAdminStore(); // Pinia store 사용
const router = useRouter(); // useRouter 훅 사용

// 채팅방 목록을 그대로 가져옴
const rooms = computed(() => store.adminChatRooms);

const currentTime = new Date();

const eventStatus = (startDateTime, currentPeople, maxParticipants) => {
  const startDate = new Date(startDateTime);
  if (currentTime < startDate) {
    return '오픈 전';
  } else if (currentTime >= startDate && currentPeople < maxParticipants) {
    return '진행 중';
  }
};

const formattedDate = (startDateTime) => {
  const startDate = new Date(startDateTime);
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();
  return `${month}/${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const handleChatRoomClick = (room) => {
  const startDate = new Date(room.startDateTime);
  if (currentTime < startDate) {
    alert('채팅방은 시작 시간이 되어야 입장 가능합니다.');
    return;
  }
  if (room.isParticipating) {
    router.push(`/chatroom/${room.idx}`);
  } else {
    selectedRoom.value = room;
    showRoomModal.value = true;
  }
};
</script>

<template>
  <div class="chatroom-list">
    <div v-if="rooms.length === 0" class="no-room">채팅방이 없습니다.</div>
    <div 
      v-for="room in rooms" 
      :key="room.idx" 
      class="event-card" 
      @click="handleChatRoomClick(room)"
    >
      <div class="left">
        <div class="meta">
          <span class="time">{{ formattedDate(room.startDateTime) }}</span>
          <!-- status 색상 변경 -->
          <span :class="{'status-active': eventStatus(room.startDateTime, room.participants, room.maxParticipants) === '진행 중'}" class="status">
            {{ eventStatus(room.startDateTime, room.participants, room.maxParticipants) }}
          </span>
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

.status-active {
  background-color: #388e3c; /* '진행 중'일 때는 녹색 배경 */
  color: white;  /* 텍스트 색상 변경 */
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
