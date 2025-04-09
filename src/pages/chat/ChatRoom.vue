<template>
  <div class="chatroom-container">
    <div class="chatroom-back">
      <img src="../../assets/images/Group.svg" />
      <span>목록으로</span>
    </div>

    <div class="chatroom">
      <!-- 채팅방 헤더 -->
      <div class="chatroom-header">
        <span> 서울숲에서 같이 멍멍이 산책시킬 사람 !! </span>
        <router-link to="/chatroom/1/chatroom-info">
          <button class="chatroom-menu">
            <img src="../../assets/images/material-symbols_menu-rounded.svg" />
          </button>
        </router-link>
      </div>

      <!-- ✅ 스크롤 대상 메시지 영역 -->
      <div class="chatroom-messages">
        <div class="chat-message my-message">
          <span class="chat-time">10:46</span>
          <!-- 시간 왼쪽 -->
          <div class="chat-bubble">다들 시간은</div>
        </div>
        <div class="chat-message my-message">
          <span class="chat-time">10:46</span>
          <!-- 시간 왼쪽 -->
          <div class="chat-bubble">
            언제가 괜찮으세요? 언제가 괜찮으세요? 언제가 괜찮으세요? 언제가
            괜찮으세요? 언제가 괜찮으세요? 언제가 괜찮으세요? 언제가 괜찮으세요?
          </div>
        </div>

        <!-- 반려동물 카드 메시지 -->
        <div class="chat-message pet-message my-message">
          <div class="pet-chat-card">
            <img
              src="../../assets/images/Ellipse 12.png"
              class="pet-chat-img"
            />
            <div class="pet-chat-info">
              <div class="pet-chat-name">봄 <span class="gender">♀</span></div>
              <div class="pet-chat-detail">시바견 / 3살</div>
            </div>
          </div>
          <span class="chat-time">10:50</span>
        </div>

        <div class="chat-message other-message">
          <div class="user-info">
            <img src="../../assets/images/Ellipse 12.png" class="profile-img" />
            <div class="username">짱봄</div>
          </div>
          <div class="chat-message other-message">
            <div class="chat-bubble">저는 언제든 괜찮습니다!</div>
            <span class="chat-time">10:46</span>
            <!-- 시간 왼쪽 -->
          </div>
          <div class="chat-message other-message">
            <div class="chat-bubble">ㅎㅎ</div>
            <span class="chat-time">10:46</span>
            <!-- 시간 왼쪽 -->
          </div>
        </div>

        <!-- 반려동물 카드 메시지 -->
        <div class="chat-message pet-message other-message">
          <div class="pet-chat-card">
            <img
              src="../../assets/images/Ellipse 12.png"
              class="pet-chat-img"
            />
            <div class="pet-chat-info">
              <div class="pet-chat-name">봄 <span class="gender">♀</span></div>
              <div class="pet-chat-detail">시바견 3살</div>
            </div>
          </div>
          <span class="chat-time">10:50</span>
        </div>
      </div>

      <!-- 하단 입력창 -->
      <div class="chatroom-input">
        <!-- ✅ 펫 아이콘 버튼 -->
        <button class="chatroom-pet-icon" @click="isModalOpen = true">
          <img src="../../assets/images/mdi_pets.svg" alt="펫 버튼" />
        </button>
        <input type="text" placeholder="메시지 입력" />
        <button class="chatroom-send">
          <img src="../../assets/images/lucide_send.png" alt="보내기" />
        </button>
      </div>
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
</template>
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isModalOpen = ref(false);
</script>
<style>
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
  background-color: var(--main_color_03, #f4eee7);
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

/* ✅ 메시지 영역: 스크롤만 여기! */
.chatroom-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-message {
  margin-bottom: 12px;
  max-width: 100%;
}

.my-message {
  display: flex;
  justify-content: flex-end;
}

.my-message .chat-bubble {
  background-color: #6a0104;
  color: #fff;
  line-height: 160%;
  border-radius: 12px;
  padding: 8px 12px;
  max-width: 60%; /* ✅ 최대 너비 제한 (줄바꿈 유도) */
  word-wrap: break-word; /* ✅ 단어 너무 길면 줄바꿈 */
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block; /* ✅ 내용 기반 width */
}

/* 상대방 말풍선 */
.user-info {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 이미지와 닉네임 사이 여백 */
  margin-bottom: 4px; /* 아래 말풍선과의 간격 */
}
.username {
  align-self: flex-end;
  margin-top: 2px;
}
/* 상대 메시지는 왼쪽 */
.other-message {
  justify-content: flex-start;
  align-items: flex-start;
}

.other-message .chat-bubble {
  background-color: #fff;
  color: #000;
  line-height: 160%;
  border-radius: 12px;
  padding: 8px 12px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.chat-time {
  font-size: 12px;
  color: #666;
  margin: 0 4px;
  align-self: flex-end;
}

.username {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.other-message .profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
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
  width: 30%; /* ✅ 전체 너비 차지 */
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
</style>
