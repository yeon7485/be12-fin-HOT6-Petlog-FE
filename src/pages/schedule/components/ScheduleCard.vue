<script setup>
import { useScheduleStore } from "../../../stores/useScheduleStore";

const props = defineProps({
  item: Object,
});

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="schedule_card">
    <div class="category_box">
      <div class="color_circle" :style="{ backgroundColor: item.color }"></div>
      {{ item.category }}
    </div>
    <div class="schedule_item">
      <div class="schedule_time">
        <p>10:00</p>
        <img v-if="item.fromChat" src="/src/assets/icons/chat.png" alt="chat" class="chat_icon" />
      </div>
      <p>{{ item.title }}</p>
      <img v-if="item.image" src="/src/assets/images/cat2.jpg" alt="image" class="record_img" />
      <p v-if="scheduleStore.type === 'RECORD'" class="record_memo">{{ item.memo }}</p>
    </div>
  </div>
</template>

<style scoped>
.schedule_card {
  width: 100%;
}

.category_box {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  gap: 0.3125rem;
  margin: 0 0 0.5rem 0.3125rem;
}

.color_circle {
  width: 0.5625rem;
  height: 0.5625rem;
  border-radius: 6.1875rem;
}

.schedule_item {
  width: 100%;
  background-color: #fff;
  padding: 1.375rem;
  box-shadow: 0.125rem 0.125rem 0.1875rem 0rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  transition: all 0.3s;
  cursor: pointer;
}

.schedule_item:hover {
  background-color: var(--gray100);
}

.schedule_time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.625rem;
  font-weight: bold;
}

.chat_icon {
  width: 1.125rem;
  height: 1.125rem;
}

.record_memo {
  font-size: 0.875rem;
  margin-top: 0.9375rem;
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
  margin-top: 0.625rem;
}
</style>
