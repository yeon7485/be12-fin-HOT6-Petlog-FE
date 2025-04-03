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
        <button class="chatroom-menu">
          <img src="../../assets/images/material-symbols_menu-rounded.svg" />
        </button>
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
      </div>

      <!-- 하단 입력창 -->
      <div class="chatroom-input">
        <input type="text" placeholder="메시지 입력" />
        <button class="chatroom-send">
          <img src="../../assets/images/lucide_send.png" alt="보내기" />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>
