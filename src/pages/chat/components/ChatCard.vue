<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import ChatRoomInfoModal from "./ChatRoomInfoModal.vue";

const router = useRouter();
const selectedRoom = ref(null);
const showRoomModal = ref(false);

const handleChatRoomClick = (room) => {
  if (room.isParticipating) {
    router.push(`/chatroom/${room.idx}`);
  } else {
    selectedRoom.value = room;
    showRoomModal.value = true;
  }
};

const props = defineProps({
  room: Object,
});
</script>

<template>
  <div class="chat-card" @click="handleChatRoomClick(room)">
    <div class="chat-header">
      <div class="chat-title">
        <h2>{{ room.title }}</h2>
        <span v-if="room.isParticipating" class="participating-badge">참여중</span>
      </div>
      <div class="chat-participants">
        <img src="/src/assets/icons/people.svg" alt="people" />
        {{ room.participants }}명 참여 중
      </div>
    </div>
    <div class="chat-tags">
      <span v-for="tag in room.hashtags" :key="tag">#{{ tag }}</span>
    </div>
  </div>

  <ChatRoomInfoModal v-if="showRoomModal" :room="selectedRoom" @close="showRoomModal = false" />
</template>

<style scoped>
.chat-card {
  width: 100%;
  padding: 32px 36px;
  border-radius: 20px;
  border: 1px solid var(--main-color-brown);
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  transition: all 0.3s;
}

.chat-card:hover {
  scale: 1.03;
}

.chat-header {
  display: flex;
  justify-content: space-between;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-title > h2 {
  font-size: 20px;
  font-weight: bold;
}

.participating-badge {
  margin-top: 1px;
  padding: 3px 6px;
  background-color: #e0f2f1;
  color: #00796b;
  border-radius: 12px;
  font-size: 11px;
  border: 1px solid #00796b22;
}
.chat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chat-tags span {
  color: var(--main-color-brown);
  font-size: 14px;
}

.chat-participants {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--gray700);
  gap: 4px;
}
</style>
