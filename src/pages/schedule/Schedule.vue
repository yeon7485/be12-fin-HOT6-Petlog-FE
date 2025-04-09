<script setup>
import { ref, watch } from "vue";
import Calendar from "./components/Calendar.vue";
import NewScheduleModal from "./components/NewScheduleModal.vue";

const isModalOpen = ref(false);

// 모달 열기
const openModal = () => {
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="container">
    <div class="title_box">
      <div class="profile_img"></div>
      <p class="title">내 일정</p>
      <img class="arrow_down" src="/src/assets/icons/arrow_down.png" alt="아래쪽" />
    </div>
    <div class="calendar">
      <Calendar @open-modal="openModal" />
    </div>

    <!-- 모달 -->
    <NewScheduleModal v-if="isModalOpen" :onClose="closeModal" />
  </div>
</template>

<style scoped>
.container {
  margin: 50px 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title_box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile_img {
  background-image: url("/src/assets/images/profile_1.jpg");
  width: 58px;
  height: 58px;
  border-radius: 58px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-repeat: no-repeat;
  background-size: cover;
}

.title {
  font-family: Cafe24Ssurround;
  font-size: 30px;
}

.arrow_down {
  width: 27px;
  height: 27px;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s;
}

.arrow_down:hover {
  background-color: var(--gray300);
}

.top_box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
}

.create_btn:hover {
  background-color: var(--gray300);
}

.plus_icon {
  width: 12px;
  height: 12px;
}

.calendar {
  width: 100%;
  margin-top: 30px;
}
</style>
