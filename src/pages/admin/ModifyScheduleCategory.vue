<template>
  <div class="category-manager">
    
    
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <div class="form-container">
        <h1>일정 카테고리</h1>
        
        <div class="form-group">
          <label for="categoryName">카테고리 이름</label>
          <input 
            type="text" 
            id="categoryName" 
            v-model="category.name" 
            placeholder="일정 목적을 입력해주세요. (예: 체중, 체온)"
          >
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

<script>
export default {
  name: 'CategoryForm',
  data() {
    return {
      category: {
        name: '',
        color: '#00BCD4' // 기본 색상 (이미지에 보이는 청록색)
      },
      availableColors: [
        '#00BCD4', // 청록색 (기본)
        '#F44336', // 빨간색
        '#E91E63', // 핑크
        '#9C27B0', // 보라색
        '#673AB7', // 진보라색
        '#3F51B5', // 남색
        '#2196F3', // 파란색
        '#03A9F4', // 하늘색
        '#4CAF50', // 녹색
        '#8BC34A', // 연두색
        '#CDDC39', // 라임
        '#FFEB3B', // 노란색
        '#FFC107', // 황색
        '#FF9800', // 주황색
        '#FF5722', // 주홍색
        '#795548', // 갈색
        '#9E9E9E', // 회색
        '#607D8B'  // 청회색
      ]
    }
  },
  methods: {
    selectColor(color) {
      this.category.color = color;
    },
    save() {
      if (!this.category.name.trim()) {
        alert('카테고리 이름을 입력해주세요.');
        return;
      }
      
      // 여기서 저장 로직 구현 (예: API 호출 또는 부모 컴포넌트에 이벤트 발생)
      this.$emit('save', { ...this.category });
      console.log('저장된 카테고리:', this.category);
      
      // 실제 애플리케이션에서는 저장 후 리디렉션 또는 폼 초기화
      this.resetForm();
    },
    cancel() {
      // 취소 로직 (예: 이전 페이지로 이동 또는 폼 초기화)
      this.resetForm();
      this.$emit('cancel');
    },
    resetForm() {
      this.category = {
        name: '',
        color: '#00BCD4'
      };
    }
  }
}
</script>

<style scoped>
.category-manager {
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

.form-container {
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 30px 0;
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

input::placeholder {
  color: #aaa;
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