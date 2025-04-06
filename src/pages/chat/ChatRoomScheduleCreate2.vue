<template>
  <div class="schedule-create-container">
    <div class="schedule-create-card">
      <!-- 상단 -->
      <div class="header">
        <button class="back-button">
          <img src="../../assets/images/arrow.svg" alt="뒤로가기" />
        </button>
        <div class="tag-wrapper">
          <span class="tag tag-blue">병원</span>
          <span class="tag tag-pink">미용실</span>
        </div>
        <span class="complete-button">완료</span>
      </div>

      <!-- 입력 폼 -->
      <div class="form-section">
        <input
          type="text"
          class="input-title"
          placeholder="제목을 입력해주세요."
        />

        <label class="input-label">시작 시간</label>
        <input type="datetime-local" class="input-box" />

        <label class="input-label">종료 시간</label>
        <input type="datetime-local" class="input-box" />

        <label class="input-label">방문 목적</label>
        <input type="text" class="input-box" />

        <label class="input-label">병원명</label>
        <input type="text" class="input-box" />

        <label class="input-label">메모</label>
        <textarea class="memo-box" rows="5"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.schedule-create-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  background-color: #f9f9f9;
}

.schedule-create-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
  all: unset;
  cursor: pointer;
}

.tag-wrapper {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.tag-blue {
  background-color: #d1f2f9;
  color: #007b9e;
}

.tag-pink {
  background-color: #fce3e3;
  color: #c24c4c;
}

.complete-button {
  font-size: 14px;
  color: #999;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-title {
  font-size: 16px;
  padding: 10px 12px;
  border: none;
  border-bottom: 1px solid #ccc;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.input-box {
  width: 200px; /* ✅ 이미지 기준 너비 */
  height: 44px; /* ✅ 높이 맞춤 */
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.memo-box {
  padding: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  resize: none;
}
</style>
