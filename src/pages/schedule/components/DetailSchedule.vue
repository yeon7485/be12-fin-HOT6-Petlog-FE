<script setup>
import { ref } from "vue";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import { formatToKoreanDate } from "../../../utils/dateFormat";
import ScheduleCard from "./ScheduleCard.vue";

const props = defineProps({
  onClose: Function,
});

const scheduleStore = useScheduleStore();

const selectType = (type) => {
  scheduleStore.type = type;
};
</script>

<template>
  <div class="detail_wrapper">
    <img src="/src/assets/icons/cancel.png" alt="x" @click="onClose" class="close_btn" />

    <div class="detail_body">
      <div class="date_box">
        <div class="date_top_line"></div>
        <div class="date_content">
          <span class="date">{{ formatToKoreanDate(scheduleStore.currentDate) }}</span>
          <img src="/src/assets/images/mdi_pets.svg" alt="paw" class="paw_icon" />
        </div>
      </div>
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
    </div>
  </div>
</template>

<style scoped>
.detail_wrapper {
  min-width: 208px;
  height: 100%;
  margin: 0;
  padding: 23px 18px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.25);
}

.close_btn {
  width: 20px;
  height: 20px;
  align-self: flex-end;
  cursor: pointer;
}

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

.detail_body {
  padding: 24px;
}

.schedule_list {
  display: flex;
  flex-direction: column;
  gap: 39px;
  margin: 29px 0;
}

.date_box {
  position: relative;
  border: 1px solid #cfa8a8;
  border-radius: 12px;
  padding: 10px 30px;
  background-color: #fff;
  justify-self: center;
  margin-bottom: 40px;
}

.date_top_line::before,
.date_top_line::after {
  content: "";
  position: absolute;
  top: -10px;
  width: 1px;
  height: 10px;
  background-color: #cfa8a8;
}

.date_top_line::before {
  left: 20%;
}

.date_top_line::after {
  right: 20%;
}

.date_content {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.date {
  font-size: 20px;
  color: #711010;
  font-family: Cafe24SSurround;
  margin-top: 4px;
}

.paw_icon {
  width: 20px;
  opacity: 0.3;
}
</style>
