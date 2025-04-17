<template>
  <div class="chatroom-container">
    <div class="chatroom">
      <!-- 채팅방 헤더 -->
      <ChatHeader :title="roomTitle" :showMenu="true" :roomIdx="chatroomIdx" />

      <ChatMessages
        :messages="chatStore.messages"
        :currentUserId="currentUserId"
      />

      <!-- 입력 영역 -->
      <ChatInput @open-pet-modal="isModalOpen = true" />
    </div>
  </div>

  <div
    v-if="isModalOpen"
    class="modal-overlay"
    @click.self="isModalOpen = false"
  >
    <div class="modal-content">
      <h3>반려동물 목록</h3>

      <!-- ✅ 스크롤 영역 -->
      <div class="scrollable pet-list-scroll">
        <div v-for="i in 10" :key="i" class="pet-card">
          <img src="../../assets/images/Ellipse 12.png" class="pet-img" />
          <div class="pet-info">
            <div class="pet-name">멍멍이 {{ i }}</div>
            <div class="pet-detail">시바견 / 3살</div>
          </div>
        </div>
      </div>

      <button class="modal-close" @click="isModalOpen = false">닫기</button>
    </div>
  </div>

  <!-- 반려동물 상세 모달 -->
  <div
    v-if="petDetailModalOpen"
    class="modal-overlay"
    @click.self="petDetailModalOpen = false"
  >
    <div class="pet-detail-modal">
      <button class="modal-close-icon" @click="petDetailModalOpen = false">
        ✕
      </button>
      <img :src="selectedPet.image" class="detail-pet-img" />
      <h2>
        {{ selectedPet.name }}
        <span class="gender" v-if="selectedPet.gender === '여'">♀</span>
        <span class="gender" v-else>♂</span>
      </h2>
      <p class="pet-subinfo">{{ selectedPet.age }} {{ selectedPet.breed }}</p>

      <div class="pet-info-box">
        <div class="info-row">
          <span class="label">생일</span>
          <span>{{ selectedPet.birth }}</span>
        </div>
        <div class="info-row">
          <span class="label">중성화 여부</span>
          <span>{{ selectedPet.neutered ? "✅" : "❌" }}</span>
        </div>
        <div class="info-row">
          <span class="label">특이사항</span>
          <span style="white-space: pre-line">{{
            selectedPet.specialNote
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ChatHeader from "./ChatHeader.vue";
import { useChatStore } from "../../stores/useChatStroe";
import ChatMessages from "./components/ChatMessages.vue";
import ChatInput from "./components/ChatInput.vue";
const chatStore = useChatStore();

const route = useRoute();
const chatroomIdx = route.params.chatroomIdx;
const petDetailModalOpen = ref(false);
const selectedPet = ref(null);

const currentUserId = 1; // 실제론 로그인된 유저 ID

onMounted(() => {
  chatStore.getRoomInfo(chatroomIdx);
  chatStore.connectStomp(1, () => {
    console.log("🟢 연결된 후 실행할 추가 작업!");
  });
  chatStore.loadMessages(chatroomIdx);
});

// 더미 테스트용 객체 예시 (실제 데이터와 연결 시 수정 가능)
const examplePet = {
  name: "봄",
  gender: "여",
  birth: "2017.04.01",
  breed: "말티즈",
  age: "8살",
  neutered: false,
  specialNote: "슬개골 수술\n온순하고 착하고 귀여움",
  image: "../../assets/images/Ellipse12.png",
};

const isModalOpen = ref(false);

const roomTitle = computed(() => chatStore.chatRoomInfo?.title || "채팅방");
</script>
<style scoped>
@import "./chat-base.css";
/* 전체 페이지 영역 */
.chatroom-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px;
  background-color: #f9f9f9;
}

/* 채팅방 뒤로가기 */
.chatroom-back {
  width: 100%;
  max-width: 720px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: flex-start;
}

.chatroom-back span {
  font-size: 16px;
  font-family: Inter;
}

/* 채팅 박스 전체 */
.chatroom {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  /* max-width: 100%; */
  height: 100%;
  max-height: 720px;
  border-radius: 20px;
  background-color: var(--bg-chatroom, #f4eee7);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 헤더 */
.chatroom-header {
  position: relative;
  text-align: center;
  padding: 16px;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
}

.chatroom-menu {
  all: unset;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

/* ✅ 채팅방 내 반려동물 카드 메시지 */
.pet-message {
  display: flex;
  gap: 8px;
}
.pet-chat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;

  width: 30%;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
}

/* 이미지 크게 */
.pet-chat-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.pet-chat-info {
  display: flex;
  flex-direction: column;
  gap: 6px; /* ✅ 요소 간 세로 간격 */
}

/* 텍스트 크게 */
.pet-chat-name {
  font-weight: bold;
  font-size: 18px; /* ✅ 이름 크게 */
  margin-bottom: 4px;
}

.pet-chat-detail {
  font-size: 14px;
  color: #555;
}

/* ✅ 일정 카드 메시지 공통 */
.schedule-message {
  display: flex;
  gap: 8px;
}

/* ✅ 카드 스타일 */
.schedule-chat-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  width: 30%; /* ✅ 너비 통일 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: Inter;
}

.schedule-title {
  color: #000;

  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.schedule-datetime {
  color: var(--gray700, #616161);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.schedule-location {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* ✅ 모달 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  width: 360px;
  max-height: 80vh; /* ✅ 최대 높이 제한 */
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ✅ 스크롤 가능한 영역 */
.pet-list-scroll {
  overflow-y: auto;
  max-height: 300px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 16px; /* ✅ 스크롤바와 카드 간 여백 추가 */
}

/* ✅ 펫 카드 */
.pet-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fdfdfd;
}

.pet-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.pet-info {
  text-align: left;
}

.pet-name {
  font-weight: bold;
  font-size: 14px;
}
.pet-detail {
  font-size: 12px;
  color: #666;
}

/* 닫기 버튼 */
.modal-close {
  padding: 10px;
  background: #6a0104;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.pet-card:hover {
  background-color: #f0f0f0; /* 밝은 회색으로 변경 */
  cursor: pointer; /* 마우스 포인터 변경 */
}

.pet-detail-modal {
  background: #fff4ec;
  border-radius: 20px;
  padding: 24px;
  width: 480px;
  height: 480px;
  position: relative;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  /* ✅ 추가 */
  display: flex;
  flex-direction: column;
}

.modal-close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.detail-pet-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.gender {
  color: #d04b4b;
  font-size: 16px;
  margin-left: 4px;
}

.pet-subinfo {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

.pet-info-box {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  color: #333;
  margin-top: auto; /* ✅ 아래로 밀기 */
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  color: #777;
}
</style>
