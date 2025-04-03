<template>
  <div class="chat-header-actions">
    <button class="chat-button chat-button--personal">내 채팅방</button>
    <button class="chat-button chat-button--group">그룹 채팅방</button>
    <button class="chat-button chat-button--create">
      <img
        src="../../assets/images/iconoir_chat-plus-in.png"
        alt="채팅방 생성"
      />
    </button>
  </div>
  <div class="chat-container">
    <div class="search-container">
      <div>
        <div class="search-box">검색</div>
      </div>
      <div class="chat-list">
        <div class="chat-card">산책</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.chat-container {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  margin-top: 100px; /* 위에서부터 간격 */
}

.search-container {
  display: flex;
  flex-direction: column; /* 🔥 이 줄 추가 */
  align-items: center; /* 가로 정렬 중앙 */
  margin-top: 100px; /* 위에서부터 간격 */
}

.search-box {
  width: 580px;
  height: 44px;
  background: white;
  border-radius: 20px;
  border: 2px solid #ccc;
}

.chat-card {
  width: 806px;
  height: 131px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #ccc;
}

.chat-header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px; /* 버튼 간 간격 */
  margin-bottom: 24px;
}
</style>
