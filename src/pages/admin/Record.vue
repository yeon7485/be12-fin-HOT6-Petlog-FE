<template>
  <div class="record-manager">
    
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <div class="header">
        <h1>기록 카테고리</h1>
        <button class="create-button" @click="showCreateModal = true">
          <span class="plus-icon">+</span>
          만들기
        </button>
      </div>
      
      <!-- 카테고리 목록 -->
      <div class="category-list">
        <div v-for="(category, index) in categories" :key="index" class="category-item">
          <div class="category-dot" :style="{ backgroundColor: category.color }"></div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-actions">
            <button class="action-button" @click="editCategory(index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="edit-icon">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="action-button" @click="deleteCategory(index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="trash-icon">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
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
          <input type="text" id="categoryName" v-model="newCategory.name" placeholder="카테고리 이름을 입력하세요">
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
          <button class="save-button" @click="createCategory">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recordCategoryManager',
  data() {
    return {
      categories: [
  { name: '체중', color: '#4caf50' },       // 건강 느낌의 초록
  { name: '이상현상', color: '#f44336' },   // 경고 느낌의 빨강
  { name: '배변상태', color: '#795548' },   // 자연/토양 느낌의 브라운
  { name: '수면시간', color: '#3f51b5' },   // 안정감 있는 블루
  { name: '체온', color: '#ff9800' },       // 따뜻한 오렌지
  { name: '오늘의사진', color: '#9c27b0' }, // 이미지/감성적인 보라
  { name: '기타', color: '#9e9e9e' }        // 중립적인 회색
],
      showCreateModal: false,
      newCategory: {
        name: '',
        color: '#00bcd4'
      },
      colors: ['#00bcd4', '#e91e63', '#4caf50', '#9e9e9e', '#ff9800', '#673ab7', '#3f51b5', '#795548']
    }
  },
  methods: {
    createCategory() {
      if (this.newCategory.name.trim()) {
        this.categories.push({
          name: this.newCategory.name,
          color: this.newCategory.color
        });
        this.showCreateModal = false;
        this.newCategory = {
          name: '',
          color: '#00bcd4'
        };
      }
    },
    editCategory(index) {
  const category = this.categories[index];
  this.$router.push({
    path: "/admin/category/record/fix",
    query: {
      name: category.name,
      color: category.color
    }
  });
},
    deleteCategory(index) {
      if (confirm(`${this.categories[index].name} 카테고리를 삭제하시겠습니까?`)) {
        this.categories.splice(index, 1);
      }
    }
  }
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