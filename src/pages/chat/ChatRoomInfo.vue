<template>
  <div class="chatroom-info-container">
    <!-- 헤더 -->
    <div class="info-header">
      <div class="back-wrapper">
        <img src="../../assets/images/arrow.svg" />
        <button class="back-button"></button>
      </div>

      <span class="room-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</span>
    </div>

    <div class="schedule-wrapper">
      <button class="schedule-button">
        <img src="../../assets/images/calendar-icon.svg" />
        채팅방 일정 조회
      </button>
    </div>

    <!-- 채팅방 정보 -->
    <div class="room-info-section">
      <h3 class="section-title">채팅방 정보</h3>

      <label class="input-label">채팅방 이름</label>
      <input
        type="text"
        class="room-input"
        value="서울숲에서 같이 멍멍이 산책시킬 사람 !!"
      />

      <label class="input-label">해시태그</label>
      <textarea class="room-textarea">#산책 #멍멍 #서울숲</textarea>

      <button class="update-button">채팅방 수정</button>
    </div>

    <!-- 대화상대 -->
    <div class="members-section">
      <h3 class="section-title">대화상대 6</h3>
      <div class="member-list">
        <div class="member">
          <img src="../../assets/images/dog1.jpeg" class="profile-img" />
          <span>짱봄</span>
        </div>
        <div class="member">
          <img src="../../assets/images/dog2.jpeg" class="profile-img" />
          <span>짱구름</span>
        </div>
        <div class="member">
          <img src="../../assets/images/dog2.jpeg" class="profile-img" />
          <span>짱구름</span>
        </div>
        <div class="member">
          <img src="../../assets/images/dog2.jpeg" class="profile-img" />
          <span>짱구름</span>
        </div>
        <div class="member">
          <img src="../../assets/images/dog2.jpeg" class="profile-img" />
          <span>짱구름</span>
        </div>
        <div class="member">
          <img src="../../assets/images/dog2.jpeg" class="profile-img" />
          <span>짱구름</span>
        </div>
        <!-- ... 나머지 멤버들 ... -->
      </div>
    </div>

    <!-- 나가기 버튼 -->
    <div class="chatroom-leave-wrapper">
      <img src="../../assets/images/mdi_logout.svg" />
      <button class="leave-button">나가기</button>
    </div>
  </div>
</template>

<script setup></script>

<style>
/* 전체 컨테이너 */
.chatroom-info-container {
  width: 100%;
  max-width: 720px;
  margin: 40px auto;
  background-color: #f4eee7;
  border-radius: 20px;
  padding: 32px 0; /* ✅ 상하만 여백 */
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc; /* ✅ 얇은 회색 선 */
  margin-bottom: 12px; /* ✅ 아래 요소와 간격 */
}
.room-title {
  color: #000;

  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
/* 헤더: 가운데 정렬 */
.info-header {
  position: relative;
  display: flex;
  justify-content: center; /* ✅ 타이틀 가운데 정렬 */
  align-items: center;
  height: 40px; /* 필요시 명시 */
}

.back-wrapper {
  position: absolute;
  left: 28px; /* ✅ 왼쪽에서 28px 떨어지도록 */
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 일정 버튼: 입력영역과 오른쪽 정렬 맞춤 */
.schedule-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}

/* 일정 버튼 스타일 */
.schedule-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #6a0104;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
}

/* 채팅방 정보 섹션 */
.room-info-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}
.room-info-section .input-label {
  color: var(--gray700, #616161);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.room-input,
.room-textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
}

.room-textarea {
  resize: none;
  height: 80px;
}

.update-button {
  align-self: center; /* ✅ 가운데 정렬 */
  background: white;
  border: 1px solid #aaa;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

/* 멤버 섹션 */
.members-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}

.member-list {
  border: 1px solid #ccc;
  border-radius: 12px;
  background: white;
  padding: 12px;
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 160px; /* ✅ 높이 제한 */
  overflow-y: auto; /* ✅ 세로 스크롤 자동 */
}

.member {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.profile-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.chatroom-leave-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
}

.leave-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}
</style>
