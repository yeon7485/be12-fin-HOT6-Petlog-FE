<template>
  <router-link
    :to="`/chatroom/${chatroomIdx}/chatroom-schedule/${schedule.idx}`"
    class="schedule-card-link"
  >
    <div class="schedule-card">
      <div class="schedule-time">
        <strong>{{ schedule.time }}</strong>
      </div>
      <div class="schedule-desc">{{ schedule.place }}</div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  chatroomIdx: {
    type: [String, Number],
    required: true,
  },
  schedule: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.schedule-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.schedule-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.08);
  padding: 16px 20px; /* ✅ 안쪽 여백 좌우 충분히 */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* ✅ 좌측 정렬 */
  gap: 6px; /* 시간과 내용 사이 간격 */
  width: 100%;
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
</style>
