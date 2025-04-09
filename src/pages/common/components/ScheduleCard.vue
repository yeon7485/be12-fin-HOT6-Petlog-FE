<template>
  <div class="schedule-card">
    <div class="card-header">
      <span class="dot" />
      <span class="type">병원</span>
    </div>
    <div class="time">11:00</div>
    <div class="desc">병원 검진 예약</div>
  </div>
</template>

<script setup>
// props 없이 고정형 카드
</script>

<style scoped>
.schedule-card {
  width: 190px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  
  gap: 4px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #444;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #00c4c4;
  border-radius: 50%;
}

.time {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-top: 4px;
}

.desc {
  font-size: 14px;
  color: #333;
}
</style>
