<template>
  <div class="chatroom-container">
    <!-- 채팅방 헤더 -->
    <div class="chatroom-header">
      <button class="chatroom-back">← 목록으로</button>
      <div class="chatroom-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</div>
      <button class="chatroom-menu">☰</button>
    </div>

    <!-- 채팅 메시지 목록 -->
    <div class="chatroom-messages">
      <!-- 내가 보낸 메시지 -->
      <div class="chat-message my-message">
        <div class="chat-bubble">다들 시간은</div>
        <div class="chat-bubble">언제가 괜찮으세요?</div>
      </div>

      <!-- 상대방 메시지 -->
      <div class="chat-message other-message">
        <img
          src="../../assets/images/Ellipse 12.png"
          alt="프로필"
          class="profile-img"
        />
        <div class="message-content">
          <div class="username">짱봄</div>
          <div class="chat-bubble">저는 언제든 괜찮습니다!</div>
          <div class="chat-bubble">ㅎㅎ</div>
        </div>
      </div>
    </div>

    <!-- 입력창 -->
    <div class="chatroom-input">
      <button class="chatroom-attach">
        <img src="../../assets/images/ic_round-plus.png" alt="채팅방 생성" />
      </button>
      <input type="text" placeholder="메시지 입력" />
      <button class="chatroom-send">
        <img src="../../assets/images/lucide_send.png" alt="채팅방 생성" />
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
