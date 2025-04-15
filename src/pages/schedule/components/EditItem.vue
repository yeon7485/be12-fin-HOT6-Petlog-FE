<script setup>
import { reactive, ref } from "vue";
import { useCategoryStore } from "../../../stores/useCategoryStore";
import { useScheduleStore } from "../../../stores/useScheduleStore";

const props = defineProps({
  item: Object,
  onClose: Function,
});

const updateItem = reactive({});
Object.assign(updateItem, props.item);

const categories = ref([]);
const isCateDropdownOpen = ref(false);
const selectedCate = ref({ idx: 1, color: updateItem.color, name: updateItem.category });

const scheduleStore = useScheduleStore();
const categoryStore = useCategoryStore();
categories.value = categoryStore.getCategoryList("SCHEDULE");

const toggleCategory = () => {
  isCateDropdownOpen.value = !isCateDropdownOpen.value;
};

const selectCate = (option) => {
  selectedCate.value = option;
  updateItem.color = option.color;
  updateItem.category = option.name;
  isCateDropdownOpen.value = false;
};

const handleEditClick = () => {
  // 아이템 변경 요청
  scheduleStore.setItemDetail(updateItem);
  props.onClose();
};
</script>

<template>
  <div class="detail_box">
    <div class="detail_header">
      <!-- 카테고리 선택 드롭다운 -->
      <div class="category_box">
        <div class="cate_dropdown_btn" @click="toggleCategory">
          <div class="selected_cate">
            <div class="cate_item">
              <div class="color_box" :style="{ backgroundColor: selectedCate.color }"></div>
              <span>{{ selectedCate.name }}</span>
            </div>
          </div>
          <img src="/src/assets/icons/dropdown.png" alt="down" class="dropdown_icon" />
        </div>

        <!-- 카테고리 드롭다운 메뉴 (옵션들) -->
        <div v-if="isCateDropdownOpen" class="cate_dropdown_menu" @click.stop>
          <ul>
            <li v-for="option in categories" :key="option.name" @click="selectCate(option)">
              <div class="cate_item">
                <div class="color_box" :style="{ backgroundColor: option.color }"></div>
                <span>{{ option.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <span @click="handleEditClick">완료</span>
    </div>
    <input
      type="text"
      name="title"
      id="title"
      :value="updateItem.title"
      class="input_title"
      placeholder="제목을 입력해주세요."
    />
    <div class="content_box">
      <p>시작 시간</p>
      <input v-model="updateItem.startAt" type="datetime-local" class="input_time" />
    </div>
    <div class="content_box">
      <p>종료 시간</p>
      <input v-model="updateItem.endAt" type="datetime-local" class="input_time" />
    </div>
    <div class="content_box">
      <p>장소</p>
      <div class="place_box">
        <img src="/src/assets/icons/green_place.svg" alt="place" />
        {{ updateItem.placeName }}
      </div>
      <button type="button" class="place_btn">장소 선택</button>
    </div>
    <div class="content_box">
      <p>메모</p>
      <textarea
        v-model="updateItem.memo"
        placeholder="메모를 입력해주세요."
        class="textarea_memo"
      />
    </div>
    <div class="content_box">
      <p>반복 여부</p>
      <v-switch v-model="updateItem.recurring" color="#60BE2F"></v-switch>
      <div v-if="updateItem.recurring">
        <div class="content_box">
          <p>반복 종료 날짜</p>
          <input v-model="updateItem.repeatEndAt" type="date" class="input_time" />
        </div>
        <v-radio-group hide-details inline v-model="updateItem.repeatCycle" class="radio_btn">
          <v-radio label="일" value="일" color="#757575" class="radio_item"></v-radio>
          <v-radio label="주" value="주" color="#757575" class="radio_item"></v-radio>
          <v-radio label="월" value="월" color="#757575" class="radio_item"></v-radio>
        </v-radio-group>
        <input
          type="number"
          v-model="updateItem.repeatCount"
          class="input_repeat_num"
          min="0"
          max="31"
        />
        <span>{{ updateItem.repeatCycle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail_header {
  display: flex;
  justify-content: space-between;
}

.detail_header > span {
  font-size: 14px;
  color: var(--gray600);
  cursor: pointer;
}

/* 카테고리 선택 */
.category_box {
  width: 110px;
}

.cate_dropdown_btn {
  position: relative;
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

/* content box */
.content_box > p {
  font-size: 12px;
  color: var(--gray600);
  margin-bottom: 7px;
}

.input_title {
  font-size: 18px;
  font-weight: bold;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.input_time {
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid var(--gray300);
  color: var(--gray800);
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
}

.place_box {
  display: flex;
  align-items: center;
  gap: 3px;
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
  margin-top: 10px;
}

.place_btn:hover {
  background-color: var(--gray200);
}

.textarea_memo {
  width: 100%;
  height: 100px;
  padding: 15px;
  resize: none;
  border-radius: 8px;
  background: var(--gray100);
  border: none;
  box-sizing: border-box;
  line-height: 150%;
  font-size: 14px;
}

.textarea_memo:focus {
  outline-color: var(--gray400);
}

.content_box .v-input--density-default {
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
</style>
