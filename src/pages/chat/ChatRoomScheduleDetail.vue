<template>
  <div class="chatroom-info-container">
    <div class="info-header">
      <div class="back-wrapper">
        <img
          class="back-icon"
          src="../../assets/images/arrow.svg"
          @click="goBack"
        />
        <!-- <button class="back-button" >뒤로</button> -->
      </div>

      <span class="room-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</span>
    </div>
    <div class="schedule-detail-container">
      <!-- 왼쪽 화살표 -->
      <div class="schedule-back">
        <img src="../../assets/images/arrow.svg" alt="뒤로가기" />
      </div>

      <!-- 컨텐츠 카드 (참여자 정보 포함) -->
      <div class="schedule-content-card">
        <!-- 일정 정보 -->
        <div class="schedule-info">
          <h2 class="schedule-title">병원 검진 예약</h2>
          <div class="schedule-row">
            <span class="label">시간</span>
            <span class="value">11:00 ~ 12:00</span>
          </div>
          <div class="schedule-row">
            <span class="label">장소</span>
            <span class="value">서울숲</span>
          </div>
          <div class="schedule-row">
            <span class="label">메모</span>
            <div class="memo-box">
              진료 결과 다른 곳은 양호한데 과체중 진단을 받아서 다이어트가
              필요하다고 하셨다.
            </div>
          </div>
        </div>

        <!-- 참여자 정보 (읽기용) -->
        <div class="participant-section">
          <div class="participant-title">참여자</div>
          <div class="participant-box">
            <div class="participant-name">동휘</div>
            <div class="participant-name">파워규호</div>
          </div>
        </div>
      </div>
      <div class="participant-title">참여 동물 선택</div>

      <!-- ✅ 참여 동물 선택 박스 (카드 밖 별도) -->
      <div class="animal-select-card">
        <label
          class="participant-item"
          v-for="pet in ['봄', '구름', '솜', '빙봉']"
          :key="pet"
        >
          <input type="checkbox" :value="pet" v-model="selectedAnimals" />
          <span class="checkmark"></span>
          <span class="participant-name">{{ pet }}</span>
        </label>
      </div>

      <!-- 액션 버튼 -->
      <div class="modal-actions">
        <button class="cancel-button" @click="goBack">취소</button>
        <button class="confirm-button" @click="goComplete">참여</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// 뒤로 가기
const goBack = () => {
  router.go(-1); // 또는 window.history.back()
};

const goComplete = () => {
  router.push(`/chatroom/${chatroomIdx}/chatroom-schedule`); // 이동할 경로로 바꿔주세요
};
</script>

<style scoped>
.schedule-detail-container {
  width: 100%;
  max-width: 720px;
  margin: 40px auto;
  display: flex;
  gap: 24px;
  flex-direction: column;
}

.schedule-back {
  position: absolute;
  left: -40px;
  top: 8px;
}

.schedule-content-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 24px; /* 각 row 사이 간격 */
  padding: 0; /* 상하 여백 필요시 조절 가능 */
}

.schedule-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
}

.schedule-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  font-size: 13px;
  font-weight: 400;
  color: #888; /* 연한 회색 텍스트 */
}

.value {
  color: var(--gray900, #080606);
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.46px;
}

.memo-box {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  border: 1px solid #e0e0e0;
}

.participant-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.participant-title {
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.participant-box {
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
}

.participant-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.submit-button {
  align-self: center;
  padding: 8px 16px;
  background-color: #aaa;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

/* ✅ 기본 체크박스 숨기기 */
.participant-item input[type="checkbox"] {
  display: none;
}

/* ✅ 커스텀 체크박스 박스 */
.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #6a0104;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
}

/* ✅ 체크되었을 때 */
.participant-item input[type="checkbox"]:checked + .checkmark {
  background-image: url("../../assets/images/material-symbols_check-rounded.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 12px 12px;
  border-color: #6a0104;
}

/* ✅ 텍스트 */
.participant-name {
  font-size: 14px;
  color: #333;
}

.animal-select-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  margin-top: 16px;
  display: flex; /* ✅ 추가 */
  flex-direction: column; /* ✅ 세로 나열 */
  gap: 30px;
  width: 100%;
  max-width: 500px; /* 가로 더 넓게 */
  min-height: 150px; /* 세로 최소 높이 설정 */
  margin-left: auto;
  margin-right: auto;
}
</style>
