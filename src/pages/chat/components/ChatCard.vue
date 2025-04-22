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
  <div class="chat-card-wrapper" @click="handleChatRoomClick(room)">
    <div class="chat-card">
      <div class="chat-title">
        {{ room.title }}
        <span v-if="room.isParticipating" class="participating-badge"
          >참여중</span
        >
      </div>
      <div class="chat-tags">
        <span v-for="tag in room.hashtags" :key="tag">#{{ tag }}</span>
      </div>
      <div class="chat-participants">
        <img src="../../../assets/images/fluent_people-28-filled.png" />
        {{ room.participants }}명 참여 중
      </div>
    </div>
  </div>

  <ChatRoomInfoModal
    v-if="showRoomModal"
    :room="selectedRoom"
    @close="showRoomModal = false"
  />
</template>

<style scoped>
.chat-card {
  width: 806px;
  padding: 33px 36px;
  border-radius: 20px;
  border: 1px solid #6a0104;
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

.chat-title {
  font-family: Inter;
  font-size: 20px;
  color: #000;

  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.participating-badge {
  margin-left: 8px;
  padding: 2px 6px;
  background-color: #e0f2f1;
  color: #00796b;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid #00796b22;
}
.chat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  /* margin-bottom: 8px; */
}

.chat-tags span {
  color: #6a0104;
  font-size: 14px;
}

.chat-participants {
  display: flex;
  align-items: center;
  position: absolute;
  right: 24px;
  /* bottom: 16px; */
  font-size: 13px;
  color: #555;
  gap: 4px;
}
</style>
