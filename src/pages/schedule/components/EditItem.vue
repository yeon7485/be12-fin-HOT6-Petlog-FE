<script setup>
const props = defineProps({
  item: Object,
  onClose: Function,
});

const handleEditClick = () => {
  // 아이템 변경 요청
  props.onClose();
};
</script>

<template>
  <div class="detail_box">
    <div class="detail_header">
      <div class="category_box">
        <div class="color_circle" :style="{ backgroundColor: item.color }"></div>
        {{ item.category }}
      </div>
      <span @click="handleEditClick">완료</span>
    </div>
    <input
      type="text"
      name="title"
      id="title"
      :value="item.title"
      class="input_title"
      placeholder="제목을 입력해주세요."
    />
    <div class="content_box">
      <p>시작 시간</p>
      <input v-model="item.startAt" type="datetime-local" class="input_time" />
    </div>
    <div class="content_box">
      <p>종료 시간</p>
      <input v-model="item.endAt" type="datetime-local" class="input_time" />
    </div>
    <div class="content_box">
      <p>장소</p>
      <div class="place_box">
        <img src="/src/assets/icons/green_place.svg" alt="place" />
        {{ item.placeName }}
      </div>
      <button type="button" class="place_btn">장소 선택</button>
    </div>
    <div class="content_box">
      <p>메모</p>
      <textarea v-model="item.memo" placeholder="메모를 입력해주세요." class="textarea_memo" />
    </div>
    <div class="content_box">
      <p>반복 여부</p>
      <v-switch v-model="item.recurring" color="#60BE2F"></v-switch>
      <div v-if="item.recurring">
        <div class="content_box">
          <p>반복 종료 날짜</p>
          <input v-model="item.repeatEndAt" type="date" class="input_time" />
        </div>
        <v-radio-group hide-details inline v-model="item.repeatCycle" class="radio_btn">
          <v-radio label="일" value="일" color="#757575" class="radio_item"></v-radio>
          <v-radio label="주" value="주" color="#757575" class="radio_item"></v-radio>
          <v-radio label="월" value="월" color="#757575" class="radio_item"></v-radio>
        </v-radio-group>
        <input type="number" v-model="item.repeatCount" class="input_repeat_num" min="0" max="31" />
        <span>{{ item.repeatCycle }}</span>
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

.input_title {
  font-size: 18px;
  font-weight: bold;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.content_box > p {
  font-size: 12px;
  color: var(--gray600);
  margin-bottom: 7px;
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
