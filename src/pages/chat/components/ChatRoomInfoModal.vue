<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="modal-close-icon" @click="$emit('close')">✕</button>
      <h2>{{ room.title }}</h2>
      <p>{{ room.hashtags.map((tag) => `#${tag}`).join(", ") }}</p>
      <p>참여 인원: {{ room.participants }}명</p>

      <button class="join-btn" @click="joinRoom">참여하기</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";

const props = defineProps({ room: Object });
const emit = defineEmits(["close"]);
const router = useRouter();

const joinRoom = async () => {
  try {
    await axios.post(`/api/chat/chatroom/${props.room.idx}/join`);
    emit("close");
    router.push(`/chatroom/${props.room.idx}`);
  } catch (err) {
    console.error("참여 실패", err);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px; /* ✅ 여유 padding */
  width: 420px; /* ✅ 너비 키움 */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 보완 */
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.join-btn {
  margin-top: 16px;
  padding: 10px 20px;
  background: #6a0104;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
