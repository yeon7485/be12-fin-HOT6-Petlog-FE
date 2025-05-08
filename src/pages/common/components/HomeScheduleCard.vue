<script setup>
import { format, isSameDay } from "date-fns";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import { formatTimeFromDate } from "../../../utils/dateFormat";

const props = defineProps({
  item: Object,
});

const scheduleStore = useScheduleStore();

const formatScheduleTime = (item) => {
  if (scheduleStore.type !== "SCHEDULE") {
    return formatTimeFromDate(item.date);
  }

  const start = new Date(item.startAt);
  const end = item.endAt ? new Date(item.endAt) : null;

  if (!end) {
    return formatTimeFromDate(item.startAt);
  }

  const sameDay = isSameDay(start, end);

  if (sameDay) {
    return `${format(start, "HH:mm")} ~ ${format(end, "HH:mm")}`;
  } else {
    return `${format(start, "M월 d일 HH:mm")} ~ ${format(end, "M월 d일 HH:mm")}`;
  }
};
</script>

<template>
  <div class="schedule_item">
    <div class="category_box">
      <div class="color_circle" :style="{ backgroundColor: item.color }"></div>
      {{ item.categoryName }}
    </div>
    <div class="schedule_time">
      <p>
        {{ formatScheduleTime(item) }}
      </p>
      <img v-if="item.fromChat" src="/src/assets/icons/chat.png" alt="chat" class="chat_icon" />
    </div>
    <p>{{ "[" + item.petName + "] " + item.title }}</p>
    <img v-if="item.imageUrl" src="/src/assets/images/cat2.jpg" alt="image" class="record_img" />
    <p v-if="scheduleStore.type === 'DAILY_RECORD'" class="record_memo">{{ item.memo }}</p>
  </div>
</template>

<style scoped>
.schedule_item {
  width: 100%;
  background-color: #fff;
  padding: 25px;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid var(--gray300);
}

.card_header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 0 0 8px 5px;
}

.category_box {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  margin-bottom: 17px;
}

.color_circle {
  width: 9px;
  height: 9px;
  border-radius: 99px;
}

.schedule_item:hover {
  scale: 1.05;
  border-color: var(--gray500);
}

.schedule_time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}

.chat_icon {
  width: 18px;
  height: 18px;
}

.record_memo {
  font-size: 14px;
  margin-top: 15px;
  color: var(--gray600);
  line-height: 140%;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 3줄까지 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 48px;
}

.record_img {
  width: 70%;
  margin-top: 10px;
}
</style>
