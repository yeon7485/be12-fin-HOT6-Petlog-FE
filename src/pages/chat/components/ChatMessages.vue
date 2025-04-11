<template>
  <div class="scrollable chatroom-messages">
    <ChatMessage
      v-for="(msg, idx) in messages"
      :key="idx"
      :message="msg"
      :isMine="msg.senderId === currentUserId"
      @show-pet="(pet) => $emit('show-pet', pet)"
    />
  </div>
</template>

<script setup>
import ChatMessage from "./ChatMessage.vue";

defineProps({
  messages: {
    type: Array,
    required: true,
  },
  currentUserId: {
    type: Number,
    required: true,
  },
});

defineEmits(["show-pet"]);
</script>

<style scoped>
/* ✅ 메시지 영역: 스크롤만 여기! */
.chatroom-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
