<template>
  <div class="container">
    <h2 class="title">나의 질문</h2>
    <div class="question-card">
      <div class="profile">
        <img src="/src/assets/images/dog1.png" alt="profile" class="profile-img" />
        <div class="user-info">
          <span class="username">구름님</span>
          <span class="date">24.8.10</span>
        </div>
      </div>
      <div class="question-content">
        <span class="badge">해결됨</span>
        <strong class="question-title">강아지 중성화 수술 고민입니다.</strong>
        <p class="question-text">
          저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야 한다고 하는데 꼭 시켜야 하는 건가요? 
          찾아보니 각자도 입장이 달라 엄청 이기적하다고 하더라고요 ㅠㅠㅠ
        </p>
      </div>
      <div class="footer">
        <span class="tag"># 강아지 # 중성화</span>
        <span class="comment-count">💬 2</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%;
  max-width: 800px; /* 카드 크기 조정 */
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: flex-start; 
}


.question-card {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
}

.date {
  font-size: 12px;
  color: #888;
}

.question-content {
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  background: #4caf50;
  color: #fff;
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.question-title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 8px;
}

.question-text {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.comment-count {
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>
