<script setup>
import { useScheduleStore } from "../../stores/useScheduleStore";
import { formatToKoreanDate } from "../../utils/dateFormat";

const props = defineProps({
  onClose: Function,
});

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="detail_wrapper">
    <img src="/src/assets/icons/cancel.png" alt="x" @click="onClose" class="close_btn" />

    <div class="detail_body">
      <router-view></router-view>
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

.detail_body {
  padding: 24px;
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
