<script setup>
import { ref, computed } from "vue";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonth = ref(currentDate.getMonth());

const events = ref([
  { date: "2025-03-22", title: "산책 가기", color: "#d9e8d4" },
  { date: "2025-03-27", title: "병원 검진 예약", color: "#cce7ee" },
  { date: "2025-03-27", title: "미용 예약", color: "#f6d6dd" },
]);

const calendarDates = computed(() => {
  const start = new Date(currentYear.value, currentMonth.value, 1);
  const end = new Date(currentYear.value, currentMonth.value + 1, 0);

  const startDay = start.getDay();
  const totalDays = end.getDate();

  const calendar = [];

  // 빈 셀 추가 (이전 달)
  for (let i = 0; i < startDay; i++) {
    calendar.push(new Date(NaN));
  }

  // 현재 달 날짜
  for (let i = 1; i <= totalDays; i++) {
    calendar.push(new Date(currentYear.value, currentMonth.value, i));
  }

  return calendar;
});

const getEventsForDate = (date) => {
  if (isNaN(date)) return [];
  const dateStr = date.toISOString().split("T")[0];
  return events.value.filter((event) => event.date === dateStr);
};

const isSunday = (index) => index % 7 === 0;
const isSaturday = (index) => index % 7 === 6;

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <span class="month-year">{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
      <div class="nav-buttons">
        <button @click="prevMonth">&#60;</button>
        <button @click="nextMonth">&#62;</button>
      </div>
    </div>

    <div class="calendar-grid">
      <div class="day-label" v-for="(day, index) in days" :key="index" :class="{ sunday: index === 0, saturday: index === 6 }">
        {{ day }}
      </div>

      <div class="calendar-cell" v-for="(date, index) in calendarDates" :key="index">
        <div class="date-number" :class="{ red: isSunday(index), purple: isSaturday(index) }">
          {{ date.getDate() }}
        </div>

        <div class="event" v-for="event in getEventsForDate(date)" :key="event.title" :style="{ backgroundColor: event.color }">
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  width: 700px;
  margin: 0 auto;
  font-family: "Pretendard";
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.nav-buttons button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-label {
  text-align: center;
  font-weight: 500;
  padding: 8px 0;
  color: #aaa;
}

.calendar-cell {
  min-height: 90px;
  border-radius: 10px;
  background-color: #fff;
  padding: 4px 6px;
  position: relative;
  font-size: 14px;
}

.date-number {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
}

.red {
  color: #f44336;
}
.purple {
  color: #7e57c2;
}

.event {
  margin-top: 3px;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
