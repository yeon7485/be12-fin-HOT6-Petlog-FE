<template>
  <div class="category-fix-page">
    <div class="fix-container">
      <h1>게시판 카테고리 수정</h1>
      <div class="form-group">
        <label for="categoryName">카테고리 이름</label>
        <input
          type="text"
          id="categoryName"
          v-model="categoryName"
          placeholder="카테고리 이름 수정"
        />
      </div>

      <div class="form-actions">
        <button class="cancel-button" @click="goBack">취소</button>
        <button class="save-button" @click="saveCategory">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardCategoryFix",
  data() {
    return {
      categoryName: "",
      originalName: "",
    };
  },
  created() {
    const { name } = this.$route.query;
    this.originalName = name || "";
    this.categoryName = name || "";
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    saveCategory() {
      if (!this.categoryName.trim()) {
        alert("카테고리 이름을 입력하세요.");
        return;
      }

      // 여기에 API 요청 연결 예정
      console.log(`수정된 카테고리 이름: ${this.categoryName}`);

      // 리다이렉트 또는 성공 처리
      alert("카테고리가 수정되었습니다.");
      this.$router.push("/admin/category/board");
    },
  },
};
</script>

<style scoped>
.category-fix-page {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 중앙 -> 상단으로 */
  padding-top: 80px;        /* 여유 있게 위 여백 */
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
