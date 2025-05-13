<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = ref([
  { id: 1, name: '일정 카테고리', icon: '📅', route: '/admin/category/schedule' },
  { id: 2, name: '기록 카테고리', icon: '📄', route: '/admin/category/record' },
  { id: 3, name: '게시판 카테고리', icon: '📋', route: '/admin/category/board' },
  { id: 4, name: '게시판 종류', icon: '🗂️', route: '/admin/category/boardtype' }
]);

const handleClick = (category) => {
  if (category.route) {
    router.push(category.route);
  }
};
</script>

<template>
  <div class="container">
    <h2 class="title">카테고리 목록</h2>
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-item"
        @click="handleClick(category)"
      >
        <span class="icon">{{ category.icon }}</span>
        <span class="text">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  font-family: 'Arial', sans-serif;
  margin-left: 0;         /* ← margin-left 제거 */
  padding-left: 40px;     /* ← 대신 padding 사용 (사이드바 침범 X) */
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: left;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 항목 간 여백 증가 */
  margin-top: 30px;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.category-item:hover {
  background: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 22px;
  margin-right: 12px; /* 아이콘과 텍스트 사이 여백 */
}

.text {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}
</style>
