<script setup>
import { useScheduleStore } from "../../../stores/useScheduleStore";
import { formatTimeFromDate } from "../../../utils/dateFormat";

const props = defineProps({
  item: Object,
});

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="schedule_card">
    <div class="card_header">
      <div class="category_box">
        <div class="color_circle" :style="{ backgroundColor: item.color }"></div>
        {{ item.categoryName }}
      </div>
      {{ Object.keys(scheduleStore.currentPet).length === 0 ? item.petName : "" }}
    </div>
    <div class="schedule_item">
      <div class="schedule_time">
        <p>
          {{
            scheduleStore.type === "SCHEDULE"
              ? formatTimeFromDate(item.startAt)
              : formatTimeFromDate(item.date)
          }}
        </p>
        <img v-if="item.fromChat" src="/src/assets/icons/chat.png" alt="chat" class="chat_icon" />
      </div>
      <p>{{ item.title }}</p>
      <img v-if="item.imageUrl" src="/src/assets/images/cat2.jpg" alt="image" class="record_img" />
      <p v-if="scheduleStore.type === 'DAILY_RECORD'" class="record_memo">{{ item.memo }}</p>
    </div>
  </div>
</template>

<style scoped>
.schedule_card {
  padding: 0 3px;
  box-sizing: border-box;
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
}

.color_circle {
  width: 9px;
  height: 9px;
  border-radius: 99px;
}

.schedule_item {
  width: 100%;
  background-color: #fff;
  padding: 22px;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  transition: all 0.3s;
  cursor: pointer;
}

.schedule_item:hover {
  background-color: var(--gray100);
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
