<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '../../stores/useCategoryStore.js'

const route = useRoute()
const router = useRouter()
const store = useCategoryStore()

const isEditMode = true

// 쿼리로 받은 값 초기화
const category = ref({
  idx: Number(route.query.idx) || null,
  name: route.query.name || '',
  color: route.query.color || '#00BCD4',
})

const availableColors = [
  '#00BCD4', '#F44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#4CAF50', '#8BC34A',
  '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
  '#795548', '#9E9E9E', '#607D8B'
]

const selectColor = (color) => {
  category.value.color = color
}

const save = async () => {
  if (!category.value.name.trim()) {
    alert('카테고리 이름을 입력해주세요.')
    return
  }

  if (!category.value.color) {
    alert('카테고리 색상을 선택해주세요.')
    return
  }

  const payload = {
    idx: category.value.idx,
    name: category.value.name,
    color: category.value.color,
    description: '', // 필요 시 수정
  }

  console.log('✏️ 수정 요청:', payload)
  console.log('📌 수정 페이지 진입', category.value)

  try {
    await store.updateCategory('SCHEDULE', payload)
    alert('수정이 완료되었습니다.')
    router.push('/admin/category/schedule')
  } catch (err) {
    alert('수정 중 오류 발생')
    console.error(err)
  }
}

const cancel = () => {
  router.push('/admin/category/schedule')
}
</script>

<template>
  <div class="category-manager">
    <div class="main-content">
      <div class="form-container">
        <h1>카테고리 수정</h1>

        <div class="form-group">
          <label for="categoryName">카테고리 이름</label>
          <input
            type="text"
            id="categoryName"
            v-model="category.name"
            placeholder="카테고리 이름을 입력하세요"
          />
        </div>

        <div class="form-group">
          <label>카테고리 색상</label>
          <div class="color-selector">
            <div
              v-for="color in availableColors"
              :key="color"
              class="color-option"
              :class="{ selected: category.color === color }"
              :style="{ backgroundColor: color }"
              @click="selectColor(color)"
            ></div>
          </div>
        </div>

        <div class="form-actions">
          <button class="cancel-button" @click="cancel">취소</button>
          <button class="save-button" @click="save">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-manager {
  display: flex;
  min-height: 100vh;
  font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

.form-container {
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-left: 35%;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  font-size: 14px;
}

.color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid #eaeaea;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #212121;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-button {
  padding: 10px 20px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-button:hover {
  background-color: #d32f2f;
}
</style>
