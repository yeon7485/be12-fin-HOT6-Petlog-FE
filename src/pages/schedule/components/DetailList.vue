<script setup>
import { useRouter } from "vue-router";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import ScheduleCard from "./ScheduleCard.vue";
import { onMounted, ref } from "vue";
import { watch } from "vue";

const scheduleStore = useScheduleStore();

const router = useRouter();
const recordList = ref([]);

const selectType = (type) => {
  scheduleStore.type = type;
};

const handleItemClick = (itemIdx) => {
  router.push(`detail/${itemIdx}`);
};

const fetchSchedule = async () => {
  const year = scheduleStore.currentDate.getFullYear();
  const month = scheduleStore.currentDate.getMonth() + 1;
  const day = scheduleStore.currentDate.getDate();

  const result = await scheduleStore.getRecordsByDate(year, month, day);
  if (result.isSuccess) {
    recordList.value = result.result;
  }
};

onMounted(fetchSchedule);

watch(
  () => scheduleStore.currentDate,
  () => {
    fetchSchedule();
  }
);
</script>

<template>
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
      v-for="(event, index) in scheduleStore.type === 'SCHEDULE' ? scheduleStore.plans : recordList"
      :key="index"
      :item="event"
      @click="handleItemClick(event.idx)"
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
  padding: 29px 0;
  overflow-y: auto;
}
</style>
