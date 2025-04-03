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
          <button class="chat-button chat-button--create">
            <img
              src="../../assets/images/iconoir_chat-plus-in.png"
              alt="채팅방 생성"
            />
          </button>
        </div>
      </div>
      <!-- 채팅 목록 -->
      <div class="chat-list">
        <router-link to="/chatroom/1">
          <div class="chat-card">
            <div class="chat-title">
              서울숲에서 같이 멍멍이 산책시킬 사람 !!
            </div>
            <div class="chat-tags">
              <span>#산책</span>
              <span>#멍멍</span>
              <span>#서울숲</span>
            </div>
            <div class="chat-participants">
              <img src="../../assets/images/fluent_people-28-filled.png" />
              6명 참여 중
            </div>
          </div>
        </router-link>
        <div class="chat-card">
          <div class="chat-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</div>
          <div class="chat-tags">
            <span>#산책</span>
            <span>#멍멍</span>
            <span>#서울숲</span>
          </div>
          <div class="chat-participants">
            <img src="../../assets/images/fluent_people-28-filled.png" />
            6명 참여 중
          </div>
        </div>
        <div class="chat-card">
          <div class="chat-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</div>
          <div class="chat-tags">
            <span>#산책</span>
            <span>#멍멍</span>
            <span>#서울숲</span>
          </div>
          <div class="chat-participants">
            <img src="../../assets/images/fluent_people-28-filled.png" />
            6명 참여 중
          </div>
        </div>
        <div class="chat-card">
          <div class="chat-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</div>
          <div class="chat-tags">
            <span>#산책</span>
            <span>#멍멍</span>
            <span>#서울숲</span>
          </div>
          <div class="chat-participants">
            <img src="../../assets/images/fluent_people-28-filled.png" />
            6명 참여 중
          </div>
        </div>
        <!-- 반복될 chat-card들 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
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
