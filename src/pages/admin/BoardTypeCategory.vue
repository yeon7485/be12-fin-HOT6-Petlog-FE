<template>
  <div class="record-manager">
    <div class="main-content">
      <div class="header">
        <h1>게시판 타입</h1>
        <button class="create-button" @click="showCreateModal = true">
          <span class="plus-icon">+</span>
          만들기
        </button>
      </div>

      <div class="category-list">
        <CategoryItem
          v-for="(type, index) in boardTypes"
          :key="index"
          :category="type"
          :index="index"
          @edit="editType"
          @delete="deleteType"
        />
      </div>
    </div>

    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h2>새 게시판 타입 만들기</h2>
        <div class="form-group">
          <label for="typeName">타입 이름</label>
          <input
            type="text"
            id="typeName"
            v-model="newType.name"
            placeholder="게시판 타입 이름 입력"
          />
        </div>

        <div class="modal-actions">
          <button class="cancel-button" @click="showCreateModal = false">취소</button>
          <button class="save-button" @click="createType">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from '../../stores/useCategoryStore.js'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import CategoryItem from './components/CategoryItem.vue'

export default {
  name: 'BoardTypeManager',
  components: {
    CategoryItem,
  },
  setup() {
    const store = useCategoryStore()
    const router = useRouter()

    const showCreateModal = ref(false)
    const newType = ref({
      name: '',
    })

    const boardTypes = computed(() => store.boardTypes)

    const createType = async () => {
      if (newType.value.name.trim()) {
        await store.addCategory('BOARD_TYPE', { ...newType.value })
        showCreateModal.value = false
        newType.value = { name: '' }
      }
    }

    const editType = (index) => {
      const type = store.boardTypes[index]
      router.push({
        path: '/admin/category/type/fix',
        query: {
          name: type.name,
        },
      })
    }

    const deleteType = async (index) => {
      const type = store.boardTypes[index]
      if (confirm(`${type.name} 타입을 삭제하시겠습니까?`)) {
        await store.deleteCategory('BOARD_TYPE', type)
      }
    }

    return {
      boardTypes,
      showCreateModal,
      newType,
      createType,
      editType,
      deleteType,
    }
  },
}
</script>
<style scoped>
.record-manager {
  display: flex;
  min-height: 100vh;
  font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
}

.sidebar {
  width: 180px;
  background-color: white;
  border-right: 1px solid #eaeaea;
  padding: 20px 0;
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
}

.menu-item.active {
  color: #e53935;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 700px; 
  margin-left: 100px;
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
  transition: background-color 0.2s;
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
  padding: 4px;
}

.action-button:hover {
  color: #212121;
}

/* 모달 스타일 */
.modal-overlay {
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

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
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
  transition: transform 0.2s;
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
  margin-top: 24px;
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