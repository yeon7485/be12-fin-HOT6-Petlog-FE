<script setup>
import { useRouter } from "vue-router";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import ScheduleCard from "./ScheduleCard.vue";
import { formatToKoreanDate } from "../../../utils/dateFormat";
import { onMounted, ref, watch } from "vue";

const scheduleStore = useScheduleStore();

const router = useRouter();
const scheduleList = ref([]);
const recordList = ref([]);

const selectType = (type) => {
  scheduleStore.type = type;
};

const handleItemClick = (itemIdx) => {
  router.push(`detail/${itemIdx}`);
};

const fetchSchedule = async () => {
  const date = new Date(scheduleStore.currentDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const scheduleResult = await scheduleStore.getSchedulesByDate(year, month, day);
  const recordResult = await scheduleStore.getRecordsByDate(year, month, day);
  if (scheduleResult.isSuccess) {
    scheduleList.value = scheduleResult.result;
  }

  if (recordResult.isSuccess) {
    recordList.value = recordResult.result;
  }
};

onMounted(fetchSchedule);

watch(
  () => [scheduleStore.currentDate, scheduleStore.records, scheduleStore.plans],
  () => {
    fetchSchedule();
  }
);
</script>

<template>
  <div class="date_box">
    <div class="date_top_line"></div>
    <div class="date_content">
      <span class="date">{{ formatToKoreanDate(scheduleStore.currentDate) }}</span>
      <img src="/src/assets/images/mdi_pets.svg" alt="paw" class="paw_icon" />
    </div>
  </div>
  <div class="type_box">
    <div
      class="type_btn"
      :class="{ active: scheduleStore.type === 'SCHEDULE' }"
      @click="selectType('SCHEDULE')"
    >
      일정
    </div>
    <div
      class="type_btn"
      :class="{ active: scheduleStore.type === 'DAILY_RECORD' }"
      @click="selectType('DAILY_RECORD')"
    >
      기록
    </div>
  </div>

  <div class="schedule_list">
    <ScheduleCard
      v-for="(event, index) in scheduleStore.type === 'SCHEDULE' ? scheduleList : recordList"
      :key="index"
      :item="event"
      @click="handleItemClick(event.idx)"
    />
  </div>
</template>

<style scoped>
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
  padding: 29px 0;
  overflow-y: auto;
}
</style>
