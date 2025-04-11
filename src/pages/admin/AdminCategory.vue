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
  <h2 class="title">카테고리 목록</h2>
  <div class="container">
    
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
  width: 400px;
  margin: 0px auto;
  font-family: 'Arial', sans-serif;
  position: relative;
}
.title {
  font-size: 32px;
  font-weight: bold;
  top: 20px;
  left: 20px;
  margin-bottom: 30px;
  margin-left: 50px;
}
.category-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}
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
.icon {
  font-size: 22px;
  margin-right: 15px;
}
.text {
  font-size: 18px;
  font-weight: 600;
}
</style>
