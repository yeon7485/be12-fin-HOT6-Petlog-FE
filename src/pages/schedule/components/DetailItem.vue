<script setup>
import { useRouter } from "vue-router";
import { useScheduleStore } from "../../../stores/useScheduleStore";

const router = useRouter();
const scheduleStore = useScheduleStore();

const handleBackClick = () => {
  router.push("/schedule/detail");
};
</script>

<template>
  <div>
    <button class="back_btn" @click="handleBackClick">
      <img src="/src/assets/icons/arrow_left.svg" alt="back" class="back_img" />
      <span>목록으로</span>
    </button>

    <div class="detail_box">
      <div class="detail_header"></div>
    </div>
  </div>
</template>

<style scoped>
.back_btn {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-bottom: 15px;
}
.back_img {
  width: 17px;
  height: 17px;
}

.back_btn > span {
  font-size: 14px;
}

.detail_box {
  border-radius: 16px;
  background: #fff;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
}
</style>
