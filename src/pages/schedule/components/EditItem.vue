<script setup>
const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="detail_box">
    <div class="detail_header">
      <div class="category_box">
        <div class="color_circle" :style="{ backgroundColor: item.color }"></div>
        {{ item.category }}
      </div>
      <span>완료</span>
    </div>
    <h2 class="title">{{ item.title }}</h2>
    <div class="content_box">
      <p>시간</p>
      <div>{{ timeText }}</div>
    </div>
    <div class="content_box">
      <p>장소</p>
      <div class="place_box">
        <img src="/src/assets/icons/green_place.svg" alt="place" />
        {{ item.placeName }}
      </div>
    </div>
    <div class="content_box">
      <p>메모</p>
      <div class="memo_box">{{ item.memo }}</div>
    </div>
    <div class="content_box">
      <p>반복 여부</p>
      <span>{{ item.repeatCount + item.repeatCycle }}마다 반복</span>
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
}
</style>
