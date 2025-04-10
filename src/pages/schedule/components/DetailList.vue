<script setup>
import { useScheduleStore } from "../../../stores/useScheduleStore";
import ScheduleCard from "./ScheduleCard.vue";

const scheduleStore = useScheduleStore();

const selectType = (type) => {
  scheduleStore.type = type;
};
</script>

<template>
  <div class="type_box">
    <div class="type_btn" :class="{ active: scheduleStore.type === 'PLAN' }" @click="selectType('PLAN')">일정</div>
    <div class="type_btn" :class="{ active: scheduleStore.type === 'RECORD' }" @click="selectType('RECORD')">기록</div>
  </div>

  <div class="schedule_list">
    <ScheduleCard
      v-for="(event, index) in scheduleStore.type === 'PLAN' ? scheduleStore.plans : scheduleStore.records"
      :key="index"
      :item="event"
    />
  </div>
</template>

<style scoped>
.type_box {
  display: flex;
  gap: 10px;
  align-self: start;
}

.type_btn {
  border-radius: 20px;
  border: 1px solid var(--gray400);
  font-weight: bold;
  color: var(--gray600);
  padding: 10px 14px;
  cursor: pointer;
  background-color: #fff;
}

.type_btn.active {
  border-color: var(--main-color-brown);
  color: var(--main-color-brown);
}

.schedule_list {
  display: flex;
  flex-direction: column;
  gap: 39px;
  margin: 29px 0;
}
</style>
