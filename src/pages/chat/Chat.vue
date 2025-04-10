<template>
  <div class="chat-page">
    <div class="chat-content-wrapper">
      <div class="chat">채팅</div>
      <div class="chat-toolbar">
        <!-- 검색창 -->
        <div class="search-input-wrapper">
          <img src="../../assets/images/material-symbols_search.png" />
          <input class="search-box" placeholder="제목, 태그 검색 ..." />
        </div>
        <!-- 상단 버튼들 -->
        <div class="chat-header-actions">
          <button class="chat-button chat-button--group">그룹 채팅방</button>
          <button class="chat-button chat-button--personal">내 채팅방</button>
          <button class="chat-button chat-button--create" @click="openModal">
            <img
              src="../../assets/images/iconoir_chat-plus-in.png"
              alt="채팅방 생성"
            />
          </button>
        </div>
      </div>
      <!-- 채팅 목록 -->
      <div class="chat-list">
        <ChatCard
          v-for="room in chatStore.chatRooms"
          :key="room.idx"
          :room="room"
        />
      </div>
    </div>
  </div>

  <!-- 채팅방 생성 모달 -->
  <div v-if="showModal" class="modal-overlay">
    <div class="create-chat-modal">
      <div class="modal-header">
        <h2>새 그룹 채팅방 만들기</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>

      <div class="modal-content">
        <label class="modal-label">채팅방 이름</label>
        <input
          type="text"
          class="modal-input"
          placeholder="채팅방 이름을 입력해주세요."
        />

        <label class="modal-label">해시태그</label>
        <textarea
          class="modal-textarea"
          placeholder="앞에 #를 붙여 해시태그를 입력해주세요.&#10;ex) #산책 #강아지 #소통"
        ></textarea>
      </div>

      <div class="modal-actions">
        <button class="cancel-button" @click="closeModal">취소</button>
        <button class="confirm-button">완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useChatStore } from "../../stores/useChatStroe";
import ChatCard from "./components/ChatCard.vue";
const chatStore = useChatStore();
const showModal = ref(false); // true일 경우 모달이 보임

const closeModal = () => {
  showModal.value = false;
};

const openModal = () => {
  showModal.value = true;
};

onMounted(() => {
  chatStore.loadRooms(); // 테스트 데이터 로딩
});
</script>

<style>
.chat-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.chat {
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 44.8px */
}
.chat-page {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.chat-content-wrapper {
  width: 806px; /* ✅ chat-card와 동일한 기준 */
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chat-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #6a0104;
  font-size: 14px;
  cursor: pointer;
  background: white;
}

.chat-button--group {
  background-color: #6a0104;
  color: white;
}

.chat-button--create {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
}

.search-box {
  width: 303px;
  height: 39px;
  border-radius: 30px;
  background: #e9e9e9;
  border: none;
  padding: 0 16px;
  font-size: 14px;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 박스 */
.create-chat-modal {
  width: 500px;
  background: white;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.close-button {
  all: unset;
  font-size: 20px;
  cursor: pointer;
}

/* 입력영역 */
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-label {
  margin-bottom: 8px; /* label과 input 사이 */
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.modal-input,
.modal-textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.modal-textarea {
  height: 80px;
  resize: none;
}

/* 하단 버튼 */
.modal-actions {
  display: flex;
  justify-content: center;

  gap: 12px;
}

.cancel-button,
.confirm-button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
}

.cancel-button {
  background: #f5f5f5;
  color: #555;
}

.confirm-button {
  background: #6a0104;
  color: white;
}
</style>
