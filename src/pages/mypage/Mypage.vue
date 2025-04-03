<script setup>
</script>

<template>
  <div class="mypage-container">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><router-link to="/mypage/profile" active-class="active">내 정보</router-link></li>
          <li><router-link to="/mypage/cards" active-class="active">카드 목록</router-link></li>
          <li><router-link to="/mypage/questions" active-class="active">나의 질문</router-link></li>
          <li><router-link to="/mypage/answers" active-class="active">나의 답변</router-link></li>
          <li><router-link to="/mypage/posts" active-class="active">내가 쓴 글</router-link></li>
          <li><router-link to="/mypage/comments" active-class="active">내가 쓴 댓글</router-link></li>
        </ul>
      </nav>
    </aside>
    
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  height: 450px;
  background: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 35px;
}

.sidebar li {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar a {
  text-decoration: none;
  color: var(--gray900, #212121);
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.2px;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

/* ✅ 활성화된 링크 스타일 */
.sidebar a.active {
  color: var(--main_color_01, #6A0104);
  font-weight: 700;
}
</style>
