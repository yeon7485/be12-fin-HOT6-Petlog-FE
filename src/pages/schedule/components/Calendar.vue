<script setup>
import { ref, computed } from "vue";
import { startOfMonth, endOfMonth, subMonths, addMonths, getDay, getDate, getDaysInMonth, format, parseISO } from "date-fns";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonth = ref(currentDate.getMonth());

const events = ref([
  { date: "2025-04-05T11:00:00", title: "산책 가기", color: "#d9e8d4" },
  { date: "2025-04-07T11:00:00", title: "병원 검진 예약병원 검진 예약", color: "#cce7ee" },
  { date: "2025-03-27T17:00:00", title: "미용 예약", color: "#f6d6dd" },
]);
const emit = defineEmits(["open-modal"]);

const calendarDates = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);

  const startDay = getDay(start); // 0 (Sunday) ~ 6 (Saturday)
  const totalDays = getDaysInMonth(start);

  const prevMonth = subMonths(start, 1);
  const nextMonth = addMonths(start, 1);
  const prevMonthDays = getDaysInMonth(prevMonth);

  const calendar = [];

  // 이전 달 날짜들
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    calendar.push({
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day),
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜들
  for (let i = 1; i <= totalDays; i++) {
    calendar.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // 다음 달 날짜들 (총 42개 되게)
  while (calendar.length < 42) {
    const nextDay = calendar.length - (startDay + totalDays) + 1;
    calendar.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextDay),
      isCurrentMonth: false,
    });
  }

  return calendar;
});

const getEventsForDate = (date) => {
  if (isNaN(date)) return [];

  const dateStr = format(date, "yyyy-MM-dd");

  return events.value.filter((event) => {
    const eventDateStr = format(parseISO(event.date), "yyyy-MM-dd");
    return eventDateStr === dateStr;
  });
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

const handleRegisterClick = () => {
  emit("open-modal");
};
</script>

<template>
  <div class="calendar_wrapper">
    <div class="calendar_header">
      <div>
        <span class="month_year">{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
        <div class="nav_buttons">
          <div @click="prevMonth" class="prev_btn">
            <img src="/src/assets/icons/arrow_left.svg" alt="prev" />
          </div>
          <div @click="nextMonth" class="next_btn">
            <img src="/src/assets/icons/arrow_right.svg" alt="next" />
          </div>
        </div>
      </div>
      <button class="create_btn" @click="handleRegisterClick">
        <img src="/src/assets/icons/plus.png" alt="+" />
        만들기
      </button>
    </div>

    <div class="calendar_grid">
      <div class="day_label" v-for="(day, index) in days" :key="index" :class="{ sunday: index === 0, saturday: index === 6 }">
        {{ day }}
      </div>

      <div
        class="calendar_cell"
        v-for="(item, index) in calendarDates"
        :key="item.date.toISOString()"
        :class="{ 'not-this-month': !item.isCurrentMonth }"
      >
        <div
          class="date_number"
          :class="{
            red: isSunday(index),
            blue: isSaturday(index),
            today: format(item.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
          }"
        >
          {{ item.date.getDate() }}
        </div>
        <div class="event_wrapper">
          <div
            class="event"
            v-for="event in getEventsForDate(item.date)"
            :key="event.title"
            :style="{ backgroundColor: event.color }"
            :title="event.title"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar_wrapper {
  margin-bottom: 50px;
}
.calendar_header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.calendar_header > div {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.month_year {
  font-family: Cafe24SSurround;
  width: 145px;
}

.nav_buttons {
  display: flex;
}

.nav_buttons img {
  width: 17px;
  height: 17px;
}

.nav_buttons > div {
  border: 1px solid var(--gray300);
  padding: 1px 5px;
  transition: all 0.3s;
}

.nav_buttons > div:hover {
  background-color: var(--gray200);
}

.prev_btn {
  border-radius: 5px 0 0 5px;
}

.next_btn {
  border-radius: 0 5px 5px 0;
}

.create_btn {
  border-radius: 8px;
  border: 1px solid var(--gray400);
  background: #fff;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
}

.create_btn:hover {
  background-color: var(--gray300);
}

.create_btn > img {
  width: 12px;
  height: 12px;
}

.calendar_grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid var(--gray200);
  border-radius: 16px;
}

.day_label {
  text-align: center;
  padding: 12px 0;
  color: var(--gray900);
  font-family: Cafe24Ssurround;
  font-size: 14px;
  background-color: #f7f5f3;
}

.day_label.sunday {
  border-top-left-radius: 16px;
  color: var(--main-color-red);
}

.day_label.saturday {
  border-top-right-radius: 16px;
  color: var(--main-color-blue);
}

.calendar_cell {
  min-height: 90px;
  background-color: #fff;
  position: relative;
  font-size: 14px;
  border: 0.5px solid var(--gray200);

  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.date_number {
  font-size: 14px;
  width: fit-content;
  padding: 5px;
  margin: 3px 5px;
  border-radius: 99px;
  cursor: pointer;
}

.date_number:hover {
  background-color: var(--main-color-light);
}

.red {
  color: var(--main-color-red);
}
.blue {
  color: var(--main-color-blue);
}

.today {
  color: var(--main-col);
}
.event_wrapper {
  flex-grow: 1;
  overflow: hidden;
}

.event {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-top: 1px;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.not-this-month {
  opacity: 0.3;
}
</style>
