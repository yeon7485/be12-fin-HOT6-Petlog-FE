<script setup>
import { ref } from 'vue';

// 카테고리 목록 데이터
const categories = ref([
  { id: 1, name: '일정 카테고리', icon: '📅' },
  { id: 2, name: '기록 카테고리', icon: '📄' },
  { id: 3, name: '게시판 카테고리', icon: '📋' }
]);
</script>

<template>
  <div class="container">
    <h2 class="title">카테고리 목록</h2>
    
    <div class="category-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <span class="icon">{{ category.icon }}</span>
        <span class="text">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 레이아웃 */
.container {
  width: 400px;
  margin: 0px auto;
  font-family: 'Arial', sans-serif;
  position: relative;
}

/* 제목 스타일 (왼쪽 위로 이동) */
.title {
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  top: -40px;
  margin-bottom: 30px;
}

/* 카테고리 리스트 */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

/* 개별 카테고리 항목 */
.category-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.category-item:hover {
  background: #f8f8f8;
}

/* 아이콘 스타일 */
.icon {
  font-size: 22px;
  margin-right: 15px;
}

/* 카테고리명 스타일 */
.text {
  font-size: 18px;
  font-weight: 600;
}
</style>
