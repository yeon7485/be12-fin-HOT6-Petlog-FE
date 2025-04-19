<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '../../stores/useCategoryStore.js'

const router = useRouter()
const store = useCategoryStore()

const showCreateModal = ref(false)
const newCategory = ref({ name: '', color: '#00bcd4' })

// ✅ 카테고리 목록 로드
onMounted(() => {
  store.fetchCategories("SCHEDULE")
})

const categories = computed(() => store.scheduleCategories)

const colors = [
  '#00bcd4', '#e91e63', '#4caf50', '#9e9e9e',
  '#ff9800', '#673ab7', '#3f51b5', '#795548'
]

const saveCategory = async () => {
  if (newCategory.value.name.trim()) {
    await store.addCategory('SCHEDULE', { ...newCategory.value })
    await store.fetchCategories('SCHEDULE') // 목록 갱신
    showCreateModal.value = false
    newCategory.value = { name: '', color: '#00bcd4' }
  }
}

const editCategory = (index) => {
  const category = categories.value[index]
  router.push({
    path: '/admin/category/schedule/fix',
    query: {
      idx: category.idx, 
      name: category.name,
      color: category.color
    }
  })
}

const confirmDelete = async (index) => {
  const category = categories.value[index]
  if (confirm(`${category.name} 카테고리를 삭제하시겠습니까?`)) {
    await store.deleteCategory('SCHEDULE', category)
    await store.fetchCategories('SCHEDULE')
  }
}
</script>

<template>
  <div class="schedule-manager">
    <div class="main-content">
      <div class="header">
        <h1>일정 카테고리</h1>
        <button class="create-button" @click="showCreateModal = true">
          <span class="plus-icon">+</span>
          만들기
        </button>
      </div>

      <!-- 카테고리 목록 -->
      <div class="category-list">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category-item"
        >
          <div class="category-dot" :style="{ backgroundColor: category.color }"></div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-actions">
            <button class="action-button" @click="editCategory(index)">
              ✏️
            </button>
            <button class="action-button" @click="confirmDelete(index)">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 카테고리 생성 모달 -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h2>새 카테고리 만들기</h2>
        <div class="form-group">
          <label for="categoryName">카테고리 이름</label>
          <input
            type="text"
            id="categoryName"
            v-model="newCategory.name"
            placeholder="카테고리 이름을 입력하세요"
          />
        </div>
        <div class="form-group">
          <label>색상</label>
          <div class="color-options">
            <div
              v-for="color in colors"
              :key="color"
              class="color-option"
              :style="{ backgroundColor: color }"
              :class="{ selected: newCategory.color === color }"
              @click="newCategory.color = color"
            ></div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-button" @click="showCreateModal = false">취소</button>
          <button class="save-button" @click="saveCategory">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 스타일 동일 — 생략 없이 유지 */
.schedule-manager {
  display: flex;
  min-height: 100vh;
  font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 700px;
  margin-left: 35%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.create-button {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}
.create-button:hover {
  background-color: #f5f5f5;
}
.plus-icon {
  margin-right: 4px;
  font-size: 16px;
}
.category-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.category-item {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 16px;
}
.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
}
.category-name {
  flex: 1;
}
.category-actions {
  display: flex;
  gap: 8px;
}
.action-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
}
.action-button:hover {
  color: #212121;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
}
h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  font-size: 14px;
}
.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}
.color-option:hover {
  transform: scale(1.1);
}
.color-option.selected {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #212121;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.cancel-button,
.save-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-button {
  background-color: white;
  border: 1px solid #eaeaea;
}
.save-button {
  background-color: #2196f3;
  color: white;
  border: none;
}
.save-button:hover {
  background-color: #1976d2;
}
</style>
