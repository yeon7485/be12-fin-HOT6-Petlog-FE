<template>
  <div
    ref="scrollContainer"
    class="scrollable chatroom-messages"
    @scroll="handleScroll"
  >
    <ChatMessage
      v-for="msg in messages"
      :key="msg.idx"
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

    <button
      v-if="showScrollToBottomButton"
      class="scroll-to-bottom-fixed"
      @click="scrollToBottom"
    >
      🔽 새 메시지
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from "vue";
import ChatMessage from "./ChatMessage.vue";
import ChatPetCardModal from "./ChatPetCardModal.vue";

const selectedPet = ref(null); // 🐾 클릭된 반려동물 저장
const showPetModal = ref(false); // 모달 on/off
const openPetModal = (pet) => {
  selectedPet.value = pet;
  showPetModal.value = true;
};

const { messages, currentUserId } = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  currentUserId: {
    type: Number,
    required: true,
  },
});

let isInitialLoad = true; // 추가
const scrollContainer = ref(null);
const scrollThreshold = 50; // px 기준 (스크롤 맨 위에서 얼마 이하일 때 트리거)

const isAtBottom = ref(true);

const handleScroll = () => {
  const el = scrollContainer.value;
  if (!el) return;

  const buffer = 100; // 여유 범위 (px)
  const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= buffer;

  isAtBottom.value = atBottom;

  if (el.scrollTop <= scrollThreshold) {
    emit("load-previous");
  }
};

onMounted(() => {
  nextTick(() => {
    const el = scrollContainer.value;
    if (el) {
      el.scrollTop = el.scrollHeight;
      isInitialLoad = false; // ✅ 이 시점 이후부터 scroll 이벤트 감지
    }
  });
});
const showScrollToBottomButton = ref(false);
watch(
  () => messages,
  async () => {
    await nextTick();
    const el = scrollContainer.value;
    if (!el || messages.length === 0) return;

    const latestMessage = messages[messages.length - 1];
    const isMine = latestMessage.senderIdx === currentUserId;

    // ✅ 조건: 내가 보낸 메시지거나 사용자가 맨 아래에 있을 때
    if (isMine || isAtBottom.value) {
      el.scrollTop = el.scrollHeight;
      showScrollToBottomButton.value = false;
    } else {
      showScrollToBottomButton.value = true;
    }
  },
  { deep: true }
);

const scrollToBottom = () => {
  const el = scrollContainer.value;
  if (el) {
    el.scrollTop = el.scrollHeight;
    showScrollToBottomButton.value = false;
  }
};
const emit = defineEmits(["load-previous", "show-pet"]);
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

.scroll-to-bottom-fixed {
  position: absolute; /* 또는 fixed (더 강력) */
  bottom: 80px; /* 채팅창 하단에서 띄우기 */
  right: 20px;
  z-index: 100;
  padding: 8px 12px;
  border-radius: 20px;
  background: #007bff;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
