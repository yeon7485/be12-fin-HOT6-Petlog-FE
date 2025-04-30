<script setup>
import { reactive, ref, watch, computed, onMounted } from "vue";
import { useScheduleStore } from "../../../stores/useScheduleStore";
import { useCategoryStore } from "../../../stores/useCategoryStore";
import { usePetStore } from "../../../stores/usePetStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";
import LoadingSpinner from "../../common/components/LoadingSpinner.vue";

const props = defineProps({
  onClose: Function,
  selectedPet: Object, // 👉 추가: 부모에서 넘긴 selectedPet 받기
});
const emit = defineEmits(["schedule-created"]);

const scheduleStore = useScheduleStore();
const categoryStore = useCategoryStore();
const petStore = usePetStore();
const loadingStore = useLoadingStore();

const pets = ref([]);
const selectedPet = ref(null);
const selectedCate = ref({});

// ✅ 카테고리 연동
const planCategories = computed(() => categoryStore.scheduleCategories);
const recordCategories = computed(() => categoryStore.recordCategories);

onMounted(async () => {
  // 내 반려동물 불러오기
  try {
    loadingStore.value = true;
    const result = await petStore.fetchPetList();

    pets.value = result;

    if (pets.value.length > 0) {
      selectedPet.value = props.selectedPet ?? pets.value[0];
    } else {
      alert("반려동물을 먼저 추가해주세요");

      props.onClose();
    }
  } catch (e) {
    console.error("반려동물 목록 불러오기 실패", e);

    props.onClose();
  } finally {
    loadingStore.value = false;
  }

  await categoryStore.fetchCategories("SCHEDULE");
  await categoryStore.fetchCategories("DAILY_RECORD");
});

// ✅ props.selectedPet이 나중에 들어오는 경우 반영
watch(
  () => props.selectedPet,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      selectedPet.value = newVal;
    }
  },
  { immediate: true }
);

const isDropdownOpen = ref(false);
const isCateDropdownOpen = ref(false);

const planData = reactive({
  title: "",
  placeId: "",
  memo: "",
  categoryIdx: 0,
  startAt: "",
  endAt: "",
  recurring: false,
  repeatCycle: "일",
  repeatCount: 1,
  repeatEndAt: "",
});

const recordData = reactive({
  categoryIdx: 0,
  title: "",
  date: "",
  memo: "",
  imageUrl: "",
});

const recordPreviewUrl = ref("");

const closeModal = () => {
  selectedPet.value = pets.value[0];
  scheduleStore.type = "SCHEDULE";
  selectedCate.value = {};
  props.onClose();
};

const togglePet = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleCategory = () => {
  isCateDropdownOpen.value = !isCateDropdownOpen.value;
};

const handleModalContentClick = () => {
  if (isDropdownOpen.value) isDropdownOpen.value = false;
};

const selectPet = (option) => {
  selectedPet.value = option;
  isDropdownOpen.value = false;
};

const selectType = (type) => {
  scheduleStore.type = type;
  isCateDropdownOpen.value = false;
  selectedCate.value = {};
  if (type === "SCHEDULE") {
    Object.assign(planData, {
      title: "",
      placeId: "",
      memo: "",
      categoryIdx: 0,
      startAt: "",
      endAt: "",
      recurring: false,
      repeatCycle: "일",
      repeatCount: 1,
      repeatEndAt: "",
    });
  } else if (type === "DAILY_RECORD") {
    Object.assign(recordData, {
      categoryIdx: 0,
      title: "",
      date: "",
      memo: "",
      imageUrl: "",
    });
  }
};

const selectCate = (category) => {
  selectedCate.value = category;
  if (scheduleStore.type === "SCHEDULE") {
    planData.categoryIdx = selectedCate.value.idx;
  } else if (scheduleStore.type === "DAILY_RECORD") {
    recordData.categoryIdx = selectedCate.value.idx;
  }
  isCateDropdownOpen.value = false;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    recordData.image = file;

    // 👉 선택적으로 미리보기 URL 만들기
    const previewUrl = URL.createObjectURL(file);
    recordPreviewUrl.value = previewUrl;
  }
};

const checkForm = (type) => {
  if (type === "SCHEDULE") {
    if (planData.categoryIdx === 0) {
      alert("카테고리를 선택해주세요.");
    } else if (planData.title === "") {
      alert("제목을 입력해주세요.");
    } else if (planData.startAt === "") {
      alert("시작 날짜와 시간을 선택해주세요.");
    } else if (planData.endAt && new Date(planData.startAt) > new Date(planData.endAt)) {
      alert("시작 시간은 종료 시간보다 앞서야 합니다.");
    } else {
      return true;
    }
    return false;
  } else {
    if (recordData.categoryIdx === 0) {
      alert("카테고리를 선택해주세요.");
    } else if (recordData.title === "") {
      alert("제목을 입력해주세요.");
    } else if (recordData.date === "") {
      alert("날짜와 시간을 선택해주세요.");
    } else {
      return true;
    }
    return false;
  }
};

// 일정/기록 생성
const handleCreateSchedule = async () => {
  loadingStore.isLoading = true;
  if (checkForm(scheduleStore.type)) {
    // 일정 생성
    if (scheduleStore.type === "SCHEDULE") {
      const result = await scheduleStore.createSchedule(selectedPet.value.idx, planData);
      console.log(result.isSuccess);

      if (result.isSuccess) {
        loadingStore.isLoading = false;
        alert("일정이 등록되었습니다.");
        emit("schedule-created");
        closeModal();
      }
    }
    // 기록 생성
    else if (scheduleStore.type === "DAILY_RECORD") {
      const result = await scheduleStore.createRecord(selectedPet.value.idx, recordData);
      console.log(result.isSuccess);

      if (result.isSuccess) {
        loadingStore.isLoading = false;
        alert("기록이 등록되었습니다.");
        //emit("record-created");

        closeModal();
      }
    }
  }
};

watch([planData.startAt, planData.endAt], ([start, end]) => {
  if (start && end && new Date(end) < new Date(start)) {
    planData.endAt = start;
  }
});
</script>

<template>
  <LoadingSpinner :isLoading="loadingStore.isLoading" />
  <div class="modal_overlay">
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
                <img
                  :src="selectedPet?.profileImageUrl || '/src/assets/images/image_not_found.png'"
                  alt="Profile"
                  class="profile_img"
                />
                <span>{{ selectedPet?.name || "" }}</span>
              </div>
              <img src="/src/assets/icons/arrow_down.png" alt="Arrow" class="arrow_icon" />
            </div>

            <!-- 드롭다운 메뉴 (옵션들) -->
            <div v-if="isDropdownOpen" class="pet_dropdown_menu" @click.stop>
              <ul>
                <li v-for="option in pets" :key="option.name" @click="selectPet(option)">
                  <div class="profile_box">
                    <img :src="option.profileImageUrl" alt="option.name" class="profile_img" />
                    <span>{{ option.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 일정/기록, 카테고리 선택 -->
          <div class="content_header">
            <div class="type_box">
              <div
                class="type_btn"
                :class="{ active: scheduleStore.type === 'SCHEDULE' }"
                @click="selectType('SCHEDULE')"
              >
                일정
              </div>
              <div
                class="type_btn"
                :class="{ active: scheduleStore.type === 'DAILY_RECORD' }"
                @click="selectType('DAILY_RECORD')"
              >
                기록
              </div>
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
                    v-for="option in scheduleStore.type === 'SCHEDULE'
                      ? planCategories
                      : recordCategories"
                    :key="option.idx"
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
            <template v-if="scheduleStore.type === 'SCHEDULE'">
              <!-- 제목 입력 -->
              <input
                v-model="planData.title"
                type="text"
                placeholder="제목을 입력해주세요."
                class="input_title"
              />

              <!-- 시간 입력 -->
              <div class="time_box">
                <div>
                  <label>시작 시간</label>
                  <input v-model="planData.startAt" type="datetime-local" class="input_time" />
                </div>
                <div>
                  <label>종료 시간</label>
                  <input
                    v-model="planData.endAt"
                    :min="planData.startAt"
                    type="datetime-local"
                    class="input_time"
                  />
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
                <textarea
                  v-model="planData.memo"
                  placeholder="메모를 입력해주세요."
                  class="textarea_memo"
                />
              </div>

              <!-- 반복 설정 -->
              <div>
                <label>반복 설정</label>
                <v-switch v-model="planData.recurring" color="#60BE2F"></v-switch>

                <div v-if="planData.recurring">
                  <div>
                    <label>반복 종료 날짜</label>
                    <input v-model="planData.repeatEndAt" type="date" class="input_time" />
                  </div>

                  <v-radio-group
                    hide-details
                    inline
                    v-model="planData.repeatCycle"
                    class="radio_btn"
                  >
                    <v-radio label="일" value="일" color="#757575" class="radio_item"></v-radio>
                    <v-radio label="주" value="주" color="#757575" class="radio_item"></v-radio>
                    <v-radio label="월" value="월" color="#757575" class="radio_item"></v-radio>
                  </v-radio-group>

                  <input
                    type="number"
                    v-model="planData.repeatCount"
                    class="input_repeat_num"
                    min="0"
                    max="31"
                  />
                  <span>{{ planData.repeatCycle }}</span>
                </div>
              </div>
            </template>

            <!-- 기록 입력박스 -->
            <template v-else>
              <!-- 제목 입력 -->
              <input
                v-model="recordData.title"
                type="text"
                placeholder="제목을 입력해주세요."
                maxlength="30"
                class="input_title"
              />

              <!-- 시간 입력 -->
              <div class="time_box">
                <div>
                  <label>시간</label>
                  <input v-model="recordData.date" type="datetime-local" class="input_time" />
                </div>
              </div>
              <div v-if="selectedCate.idx === 6">
                <label>사진</label>
                <div>
                  <div v-if="recordPreviewUrl">
                    <img :src="recordPreviewUrl" alt="preview" class="preview_img" />
                  </div>
                  <label class="custom_file_btn">
                    이미지 선택
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleFileChange"
                      class="hidden_file_input"
                    />
                  </label>
                </div>
              </div>

              <!-- 메모 입력 -->
              <div>
                <label>메모</label>
                <textarea
                  v-model="recordData.memo"
                  placeholder="메모를 입력해주세요."
                  class="textarea_memo"
                />
              </div>
            </template>
          </div>

          <div class="btn_box">
            <button @click="closeModal" class="cancel_btn">취소</button>
            <button @click="handleCreateSchedule" class="save_btn">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.modal_content {
  background-color: var(--background-color);
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
  border-color: var(--main-color-brown);
  color: var(--main-color-brown);
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

.preview_img {
  width: 300px;
  margin-bottom: 10px;
}

.custom_file_btn {
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px !important;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100px;
  text-align: center;
  border: 1px solid var(--gray300);
}

.custom_file_btn:hover {
  background-color: var(--gray300);
}

.hidden_file_input {
  display: none;
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
  background-color: var(--main-color-brown);
  border: 1px solid var(--main-color-brown);
  color: #fff;
}

.save_btn:hover {
  background-color: var(--main-color-hover);
  border-color: var(--main-color-hover);
}
</style>
