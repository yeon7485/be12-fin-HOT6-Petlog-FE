<script setup>
import { ref, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  locale: koLocale,
  dayCellContent: function (info) {
    var number = document.createElement("a");
    number.classList.add("fc-daygrid-day-number");
    number.innerHTML = info.dayNumberText.replace("일", "");
    if (info.view.type === "dayGridMonth") {
      return {
        html: number.outerHTML,
      };
    }
    return {
      domNodes: [],
    };
  },
});

const isModalOpen = ref(false);
const isDropdownOpen = ref(false);
const isCateDropdownOpen = ref(false);
const pets = ref([
  { imageUrl: "/src/assets/images/dog1.png", name: "봄" },
  { imageUrl: "/src/assets/images/dog2.jpeg", name: "구름" },
  { imageUrl: "/src/assets/images/cat1.jpg", name: "솜" },
  { imageUrl: "/src/assets/images/cat2.jpg", name: "빙봉" },
]);

const planCategories = ref([
  { color: "#00C9CD", name: "병원" },
  { color: "#E6B0BD", name: "미용실" },
  { color: "#65924D", name: "산책" },
  { color: "#BDBDBD", name: "기타" },
]);

const recordCategories = ref([
  { color: "#00C9CD", name: "체중" },
  { color: "#E6B0BD", name: "이상현상" },
  { color: "#65924D", name: "배변상태" },
  { color: "#b29d90", name: "수면시간" },
  { color: "#f30F12", name: "체온" },
  { color: "#df32f3", name: "오늘의 사진" },
  { color: "#BDBDBD", name: "기타" },
]);

const selectedPet = ref(pets.value[0]);
const selectedCate = ref({});
const selectedType = ref("PLAN");

const startTime = ref("");
const endTime = ref("");

const isRepeat = ref(false);
const repeatCycle = ref("일");

// 모달 열기
const openModal = () => {
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  selectedPet.value = pets.value[0];
  selectedType.value = "PLAN";
  selectedCate.value = {};
  isRepeat.value = false;
  repeatCycle.value = "일";
  startTime.value = "";
  endTime.value = "";
};

// 드롭다운 토글 함수
const togglePet = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleCategory = () => {
  isCateDropdownOpen.value = !isCateDropdownOpen.value;
};

const handleModalContentClick = () => {
  if (isDropdownOpen.value) isDropdownOpen.value = false;
};

// 옵션 선택 함수
const selectPet = (option) => {
  selectedPet.value = option; // 선택된 옵션 업데이트
  isDropdownOpen.value = false; // 드롭다운 닫기
};

const selectType = (type) => {
  selectedType.value = type;
  isCateDropdownOpen.value = false;
  selectedCate.value = {};
};

const selectCate = (category) => {
  selectedCate.value = category;
  isCateDropdownOpen.value = false;
};

// 종료 시간이 시작 시간보다 빠를 수 없도록 감시
watch([startTime, endTime], ([start, end]) => {
  if (start && end && new Date(end) < new Date(start)) {
    endTime.value = start; // 종료 시간을 시작 시간에 맞춤
  }
});
</script>

<template>
  <div class="container">
    <div class="title_box">
      <div class="profile_img"></div>
      <p class="title">내 일정</p>
      <img class="arrow_down" src="/src/assets/icons/arrow_down.png" alt="아래쪽" />
    </div>
    <div class="top_box">
      <button class="create_btn" @click="openModal">
        <img class="plus_icon" src="/src/assets/icons/plus.png" alt="+" />
        <span>만들기</span>
      </button>
    </div>
    <div class="calendar">
      <FullCalendar :options="calendarOptions"></FullCalendar>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal_overlay">
      <div class="modal_content" @click.stop="handleModalContentClick">
        <div class="modal_title">
          <h2>새 일정/기록 만들기</h2>
          <img class="close_btn" src="/src/assets/icons/cancel.png" alt="close" @click="closeModal" />
        </div>

        <v-divider class="line"></v-divider>

        <div class="modal_body">
          <div class="content_box">
            <!-- 펫 선택 -->
            <div class="pet_dropdown">
              <!-- 드롭다운 버튼 (선택된 옵션 표시) -->
              <div class="pet_dropdown_btn" @click.stop="togglePet">
                <div class="profile_box">
                  <img :src="selectedPet.imageUrl" alt="Profile" class="profile_img" />
                  <span>{{ selectedPet.name }}</span>
                </div>
                <img src="/src/assets/icons/arrow_down.png" alt="Arrow" class="arrow_icon" />
              </div>

              <!-- 드롭다운 메뉴 (옵션들) -->
              <div v-if="isDropdownOpen" class="pet_dropdown_menu" @click.stop>
                <ul>
                  <li v-for="option in pets" :key="option.name" @click="selectPet(option)">
                    <div class="profile_box">
                      <img :src="option.imageUrl" alt="option.name" class="profile_img" />
                      <span>{{ option.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 일정/기록, 카테고리 선택 -->
            <div class="content_header">
              <div class="type_box">
                <div class="type_btn" :class="{ active: selectedType === 'PLAN' }" @click="selectType('PLAN')">일정</div>
                <div class="type_btn" :class="{ active: selectedType === 'RECORD' }" @click="selectType('RECORD')">기록</div>
              </div>
              <!-- 카테고리 선택 드롭다운 -->
              <div class="category_box">
                <div class="cate_dropdown_btn" @click.stop="toggleCategory">
                  <div class="selected_cate">
                    <div v-if="selectedCate.name" class="cate_item">
                      <div class="color_box" :style="{ backgroundColor: selectedCate.color }"></div>
                      <span>{{ selectedCate.name }}</span>
                    </div>
                    <div v-else class="placeholder">카테고리 선택</div>
                  </div>
                  <img src="/src/assets/icons/dropdown.png" alt="down" class="dropdown_icon" />
                </div>

                <!-- 카테고리 드롭다운 메뉴 (옵션들) -->
                <div v-if="isCateDropdownOpen" class="cate_dropdown_menu" @click.stop>
                  <ul>
                    <li
                      v-for="option in selectedType === 'PLAN' ? planCategories : recordCategories"
                      :key="option.name"
                      @click="selectCate(option)"
                    >
                      <div class="cate_item">
                        <div class="color_box" :style="{ backgroundColor: option.color }"></div>
                        <span>{{ option.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="input_box">
              <!-- 제목 입력 -->
              <input v-model="title" type="text" placeholder="제목을 입력해주세요." class="input_title" />

              <!-- 시간 입력 -->
              <div class="time_box">
                <div>
                  <label>시작 시간</label>
                  <input v-model="startTime" type="datetime-local" class="input_time" />
                </div>
                <div>
                  <label>종료 시간</label>
                  <input v-model="endTime" :min="startTime" type="datetime-local" class="input_time" />
                </div>
              </div>

              <!-- 장소 입력 -->
              <div>
                <label>장소</label>
                <button type="button" class="place_btn">장소 선택</button>
              </div>

              <!-- 메모 입력 -->
              <div>
                <label>메모</label>
                <textarea v-model="memo" placeholder="메모를 입력해주세요." class="textarea_memo" />
              </div>

              <!-- 반복 설정 -->
              <div>
                <label>반복 설정</label>
                <v-switch v-model="isRepeat" color="#60BE2F"></v-switch>

                <div v-if="isRepeat">
                  <div>
                    <label>반복 종료 날짜</label>
                    <input v-model="repeat_end_date" type="date" class="input_time" />
                  </div>

                  <v-radio-group hide-details inline v-model="repeatCycle" class="radio_btn">
                    <v-radio label="일" value="일" color="#757575" class="radio_item"></v-radio>
                    <v-radio label="주" value="주" color="#757575" class="radio_item"></v-radio>
                    <v-radio label="월" value="월" color="#757575" class="radio_item"></v-radio>
                  </v-radio-group>

                  <input type="number" class="input_repeat_num" max="31" />
                  <span>{{ repeatCycle }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="btn_box">
            <button @click="closeModal" class="cancel_btn">취소</button>
            <button @click="" class="save_btn">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 36px 20%;
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
}

/* 모달 오버레이 */
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 내용 */
.modal_content {
  background-color: var(--bgcolor);
  padding: 28px 31px;
  width: 660px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.modal_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.modal_title > h2 {
  font-size: 23px;
  font-family: Cafe24Ssurround;
}

.close_btn {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.line {
  margin: 4px 0;
}

.modal_body {
  width: 100%;
  height: 450px;
  overflow-y: auto;
}

.content_box {
  display: flex;
  flex-direction: column;
  margin: 0 40px;
}

/* 드롭다운 버튼 스타일 */
.pet_dropdown {
  width: 100%;
}

.pet_dropdown_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: var(--gray200);
  border-radius: 16px;
  cursor: pointer;
}

.profile_box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile_box > span {
  font-size: 18px;
  font-family: Cafe24Ssurround;
  line-height: normal;
}

.arrow_icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

/* 드롭다운 메뉴 스타일 */
.pet_dropdown_menu {
  position: absolute;
  background-color: var(--gray200);
  border-radius: 8px;
  width: 508px;
  max-height: 280px;
  overflow-y: auto;
  padding: 20px 30px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.pet_dropdown_menu li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 16px;
}

.pet_dropdown_menu li:hover {
  background-color: var(--gray300);
}

.content_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 34px 0 20px;
  box-sizing: border-box;
}

.type_box {
  display: flex;
  gap: 10px;
  align-self: start;
}

.type_btn {
  border-radius: 20px;
  border: 1px solid var(--gray400);
  font-weight: bold;
  color: var(--gray600);
  padding: 10px 14px;
  cursor: pointer;
}

.type_btn.active {
  border-color: var(--maincolor01);
  color: var(--maincolor01);
}

/* 카테고리 선택 드롭다운 */
.category_box {
  width: 120px;
}

.cate_dropdown_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 13px;
  border: 1px solid var(--gray300);
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  height: 30px;
  box-sizing: border-box;
}

.cate_dropdown_btn > span {
  flex-shrink: 0;
}

.dropdown_icon {
  width: 12px;
  height: 12px;
}

.cate_item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
}

.color_box {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.placeholder {
  color: var(--gray500);
  font-size: 13px;
}

.cate_dropdown_menu {
  position: absolute;
  width: 120px;
  max-height: 280px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #fff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
}

.cate_dropdown_menu li {
  display: flex;
  align-items: center;
  padding: 7px;
  cursor: pointer;
  border-radius: 4px;
}
.cate_dropdown_menu li:hover {
  background-color: var(--gray200);
}

/* 입력 박스 */
.input_box {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 0 10px;
}

.input_box label {
  font-size: 12px;
  color: var(--gray600);
  display: block;
  margin-bottom: 7px;
}

.input_box input:focus {
  outline: none;
}

/* 제목 입력 */
.input_title {
  font-size: 18px;
  font-weight: bold;
  background: none;
  border: none;
  font-family: Pretendard;
}

.time_box {
  display: flex;
  justify-content: space-between;
}

.input_time {
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid var(--gray300);
  color: var(--gray800);
  background-color: #fff;
  font-size: 14px;
}

.place_btn {
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid var(--gray300);
  background-color: #fff;
  color: var(--gray600);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.place_btn:hover {
  background-color: var(--gray200);
}

.textarea_memo {
  margin: 0 10px;
  width: 100%;
  height: 100px;
  padding: 20px;
  resize: none;
  border-radius: 8px;
  background: var(--gray200);
  border: none;
  box-sizing: border-box;
  line-height: 150%;
  font-size: 14px;
}

.textarea_memo:focus {
  outline-color: var(--gray600);
}

.input_box .v-input--density-default {
  --v-input-control-height: 0;
}

.radio_btn {
  margin: 20px 0 10px;
  font-size: 14px;
}

.radio_item {
  margin-right: 15px;
}

.input_repeat_num {
  width: 60px;
  border-radius: 4px;
  border: 1px solid var(--gray400);
  background: #fff;
  padding: 8px 10px;
  margin-right: 7px;
  font-size: 14px;
  text-align: center;
}

.btn_box {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px 0;
}

.btn_box > button {
  border-radius: 8px;
  padding: 10px 15px;
  text-align: center;
  font-size: 14px;
  transition: all 0.3s;
}

.cancel_btn {
  background-color: #fff;
  border: 1px solid var(--gray600);
  color: var(--gray600);
}

.cancel_btn:hover {
  background-color: var(--gray300);
}

.save_btn {
  background-color: var(--maincolor01);
  border: 1px solid var(--maincolor01);
  color: #fff;
}

.save_btn:hover {
  background-color: var(--maincolor_hover);
  border-color: var(--maincolor_hover);
}
</style>
