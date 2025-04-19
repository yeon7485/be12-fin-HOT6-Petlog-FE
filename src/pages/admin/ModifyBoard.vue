<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '../../stores/useCategoryStore.js'

const route = useRoute()
const router = useRouter()
const store = useCategoryStore()

const category = ref({
  idx: Number(route.query.idx) || null,
  name: route.query.name || ''
})

const save = async () => {
  if (!category.value.name.trim()) {
    alert('카테고리 이름을 입력해주세요.')
    return
  }

  const payload = {
    idx: category.value.idx,
    name: category.value.name,
    description: '' // 필요 시 확장 가능
  }

  try {
    await store.updateCategory('BOARD_CATEGORY', payload)
    alert('카테고리가 수정되었습니다.')
    router.push('/admin/category/board')
  } catch (error) {
    alert('수정 중 오류가 발생했습니다.')
    console.error(error)
  }
}

const cancel = () => {
  router.push('/admin/category/board')
}
</script>

<template>
  <div class="category-fix-page">
    <div class="fix-container">
      <h1>게시판 카테고리 수정</h1>

      <div class="form-group">
        <label for="categoryName">카테고리 이름</label>
        <input
          type="text"
          id="categoryName"
          v-model="category.name"
          placeholder="카테고리 이름을 입력하세요"
        />
      </div>

      <div class="form-actions">
        <button class="cancel-button" @click="cancel">취소</button>
        <button class="save-button" @click="save">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-fix-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
}
.fix-container {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 30px;
  width: 400px;
}
h1 {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
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
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.cancel-button {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  cursor: pointer;
}
.save-button {
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-button:hover {
  background-color: #1976d2;
}
</style>