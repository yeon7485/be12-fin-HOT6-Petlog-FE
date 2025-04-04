<template>
  <div class="schedule-container">
    <!-- 뒤로가기 -->
    <div class="schedule-header">
      <div class="back-wrapper">
        <img src="../../assets/images/arrow.svg" />
        <button
          class="back-button"
          @click="goBack"
          aria-label="뒤로가기"
        ></button>
      </div>
      <h2 class="chatroom-title">서울숲에서 같이 멍멍이 산책시킬 사람 !!</h2>
    </div>

    <div class="schedule-inner">
      <!-- 일정 목록 -->
      <div class="schedule-section">
        <div class="schedule-section-header">
          <h3 class="schedule-title">일정 목록</h3>
          <router-link
            to="/chatroom/1/chatroom-schedule/create"
            class="edit-button"
          >
            <img
              src="../../assets/images/jam_write.svg"
              alt="편집"
              class="edit-icon"
            />
          </router-link>
        </div>

        <div class="schedule-list">
          <div class="schedule-card" @click="openModal">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card" @click="openModal">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card" @click="openModal">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card" @click="openModal">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
          <div class="schedule-card" @click="openModal">
            <div class="schedule-time"><strong>11:00</strong></div>
            <div class="schedule-desc">병원 검진 예약</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 오버레이 (v-if로 조건부 렌더링) -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="schedule-modal">
      <!-- 모달 내용 -->
      <div class="modal-header">
        <span class="modal-category">🏥 병원</span>
        <div class="modal-actions">
          <img
            src="../../assets/images/fluent_edit-12-regular.svg"
            class="icon"
          />
          <img src="../../assets/images/mi_delete.svg" class="icon" />
        </div>
      </div>

      <h2 class="modal-title">병원 검진 예약</h2>

      <div class="modal-item">
        <strong>시간</strong> <span>11:00 ~ 12:00</span>
      </div>
      <div class="modal-item">
        <strong>장소</strong>
        <span class="location-text">
          <img src="../../assets/images/uil_map-marker.svg" class="icon" />
          서울멍냥병원
        </span>
      </div>

      <div class="modal-memo">
        <strong>방문 목적:</strong> 정기검진
        <p>
          진료 결과 다른 곳은 양호한데 과체중 진단을 받아서 다이어트가
          필요하다고 하셨다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

function goBack() {
  router.back();
}
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style>
.schedule-container {
  width: 100%;
  max-width: 720px;
  margin: 40px auto;
  background-color: #f4eee7;
  border-radius: 20px;
  padding: 32px 0; /* 상하만 적용 */

  display: flex;
  flex-direction: column;
  gap: 24px;
}
/* 💡 내부 공통 여백용 래퍼 (좌우 여백 130px) */
.schedule-inner {
  padding: 0 130px;
  width: 100%;
  box-sizing: border-box;
}
/* 헤더 */
.schedule-header {
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

.back-button {
  all: unset;
  cursor: pointer;
  font-size: 20px;
}

.chatroom-title {
  font-size: 18px;
  font-weight: bold;
}

/* 일정 목록 섹션 */
.schedule-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 일정 목록 타이틀 + 연필 */
.schedule-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  padding-bottom: 8px;
}

.schedule-title {
  font-size: 16px;
  font-weight: bold;
}

.edit-icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 일정 카드 리스트 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* 스크롤 동작을 위해 높이 추가 */
  max-height: 320px; /* ✅ 필요에 따라 조정 */
  overflow-y: auto;

  /* 부드러운 스크롤 (선택) */
  scroll-behavior: smooth;

  background-color: #f4eee7; /* ✅ 주변 배경과 맞춤 */
  padding: 12px;
  border-radius: 12px;
}

/* ✅ WebKit 스크롤바 스타일 */
.schedule-list::-webkit-scrollbar {
  width: 6px;
}

.schedule-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* ✅ 부드러운 회색 */
  border-radius: 3px;
}

.schedule-list::-webkit-scrollbar-track {
  background-color: transparent; /* ✅ 배경색과 어울리도록 */
}

.schedule-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.08);
  padding: 16px;
}

.schedule-time {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.schedule-desc {
  font-size: 14px;
  color: #333;
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* ✅ 기존보다 더 어둡게 */
  border: 1px solid #ccc; /* ✅ 테두리로 레이어 강조 */
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  box-sizing: border-box;
}
.schedule-modal {
  width: 360px; /* ✅ 더 넓게 */
  background-color: #fff;
  border-radius: 16px;
  padding: 32px 36px; /* ✅ 전체적으로 넉넉한 내부 여백 */
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  max-height: calc(100% - 280px); /* ✅ 위아래 더 여유 */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 24px; /* ✅ 요소 간 간격도 넉넉하게 */
}

/* 상단 카테고리 + 아이콘들 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.modal-category {
  font-size: 14px;
  color: #555;
}

.modal-actions .icon {
  width: 20px;
  height: 20px;
  margin-left: 12px;
  cursor: pointer;
}

/* 타이틀 */
.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

/* 항목 (시간, 장소) */
.modal-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #222;
}

/* 아이콘 있는 줄 */
.modal-item span {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 메모 */
.modal-memo {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-text {
  color: var(--gray900, #212121);
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.46px;
}
</style>
