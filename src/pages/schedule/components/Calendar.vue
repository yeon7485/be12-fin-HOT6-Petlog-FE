<script setup>
import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import { hexToRgba } from "../../../utils/color";

const props = defineProps({
  onOpenModal: Function,
  onDetail: Function,
});

const scheduleStore = useScheduleStore();
const router = useRouter();

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonth = ref(currentDate.getMonth());

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
  const dateStr = format(date, "yyyy-MM-dd");

  return scheduleStore.plans.filter((event) => {
    // const start = parseISO(event.startAt || event.date);
    // const end = event.endAt ? parseISO(event.endAt) : null;

    // if (end) {
    //   return (
    //     date >= new Date(format(start, "yyyy-MM-dd")) &&
    //     date <= new Date(format(end, "yyyy-MM-dd"))
    //   );
    // } else {
    //   const startStr = format(start, "yyyy-MM-dd");
    //   return dateStr === startStr;
    // }

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

const handleCreateClick = () => {
  props.onOpenModal();
};

const handleDateClick = (date) => {
  const clickedMonth = date.getMonth();
  const clickedYear = date.getFullYear();

  // 현재 선택된 달이랑 다르면 변경
  if (clickedMonth !== currentMonth.value || clickedYear !== currentYear.value) {
    currentMonth.value = clickedMonth;
    currentYear.value = clickedYear;
  }
  scheduleStore.setCurrentDate(date);
  router.push("/schedule/detail");
};

const handleEventClick = (event) => {
  scheduleStore.setCurrentDate(event.date);
  //props.onDetail();
  router.push(`/schedule/detail/${event.idx}`);
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
      <button class="create_btn" @click="handleCreateClick">
        <img src="/src/assets/icons/plus.png" alt="+" />
        만들기
      </button>
    </div>

    <div class="calendar_grid">
      <div
        class="day_label"
        v-for="(day, index) in days"
        :key="index"
        :class="{ sunday: index === 0, saturday: index === 6 }"
      >
        {{ day }}
      </div>

      <div
        class="calendar_cell"
        v-for="(item, index) in calendarDates"
        :key="item.date.toISOString()"
        :class="{
          not_this_month: !item.isCurrentMonth,
          today_cell: format(item.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
        }"
      >
        <div
          class="date_number"
          :class="{
            red: isSunday(index),
            blue: isSaturday(index),
            today_date: format(item.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
          }"
          @click="handleDateClick(item.date)"
        >
          {{ item.date.getDate() }}
        </div>
        <div class="event_wrapper">
          <div
            class="event"
            v-for="event in getEventsForDate(item.date)"
            :key="event.idx"
            :style="{ backgroundColor: hexToRgba(event.color, 0.25) }"
            :title="event.title"
            @click="handleEventClick(event)"
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
  min-width: 486px;
  margin-bottom: 50px;
}
.calendar_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
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
  min-height: 110px;
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

.today_cell {
  background-color: var(--gray200);
}

.today_date {
  font-weight: bold;
  font-size: 16px;
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
  padding: 5px 6px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.not_this_month {
  opacity: 0.3;
}
</style>
