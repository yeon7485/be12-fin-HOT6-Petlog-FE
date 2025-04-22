<template>
  <div class="scrollable chatroom-messages">
    <ChatMessage
      v-for="(msg, idx) in messages"
      :key="idx"
      :message="msg"
      :isMine="msg.senderIdx === currentUserId"
      @show-pet="openPetModal"
    />

    <!-- 반려동물 모달 -->
    <ChatPetCardModal
      v-if="showPetModal"
      :pet="selectedPet"
      @close="showPetModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatMessage from "./ChatMessage.vue";
import ChatPetCardModal from "./ChatPetCardModal.vue";

const selectedPet = ref(null); // 🐾 클릭된 반려동물 저장
const showPetModal = ref(false); // 모달 on/off
const openPetModal = (pet) => {
  selectedPet.value = pet;
  showPetModal.value = true;
};
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
