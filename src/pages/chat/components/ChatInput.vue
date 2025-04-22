<template>
  <div class="chatroom-input">
    <button class="chatroom-pet-icon" @click="$emit('open-pet-modal')">
      <img src="../../../assets/icons/sendpetcard.svg" alt="펫 버튼" />
    </button>
    <input
      v-model="message"
      @keyup.enter="send"
      type="text"
      placeholder="메시지 입력"
    />
    <button class="chatroom-send" @click="send">
      <img src="../../../assets/icons/sendmessage.svg" alt="보내기" />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useChatStore } from "../../../stores/useChatStroe";
import { useRoute } from "vue-router";

const route = useRoute();
const chatroomIdx = route.params.chatroomIdx;

const chatStore = useChatStore();
const message = ref("");

const send = () => {
  if (message.value.trim()) {
    console.log(message.value);
    const textContent = {
      message: message.value,
    };
    chatStore.sendMessage(textContent, chatroomIdx, "text"); // currentUserId를 store에 저장한 경우
    message.value = "";
  }

  console.log(chatStore.messages);
};
</script>

<style scoped>
/* 입력창 */
.chatroom-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-top: 1px solid #ddd;
  background: #fff;
}

.chatroom-input input {
  flex: 1;
  border: none;
  background: #f0f0f0;
  border-radius: 30px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
}

.chatroom-send {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* ✅ 펫 아이콘 버튼 */
.chatroom-pet-icon {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.chatroom-pet-icon img {
  width: 24px;
  height: 24px;
}
</style>
