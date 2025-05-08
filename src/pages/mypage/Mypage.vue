<!-- MyPage.vue -->
<script setup></script>

<template>
  <div class="mypage-container">
    <!-- 사이드바 -->
    <aside class="sidebar">
      <nav>
        <ul>
          <li><router-link to="/mypage/profile" active-class="active">내 정보</router-link></li>
          <li><router-link to="/mypage/cardlist" active-class="active">카드 목록</router-link></li>
          <li><router-link to="/mypage/question" active-class="active">나의 질문</router-link></li>
          <li><router-link to="/mypage/answer" active-class="active">나의 답변</router-link></li>
          <li><router-link to="/mypage/post" active-class="active">내가 쓴 글</router-link></li>
          <li>
            <router-link to="/mypage/comment" active-class="active">내가 쓴 댓글</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 여기에서 각 서브페이지가 바뀌어 보여짐 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  display: flex;
  min-height: 100px;
  justify-content: space-between;
  padding: 70px 15%;
  gap: 60px;
}

.sidebar {
  width: 170px;
  height: 400px;
  min-width: 170px;
  background: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 25px;
}

.sidebar li {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar a {
  text-decoration: none;
  color: var(--gray900, #212121);
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.sidebar a.active {
  color: var(--main-color-brown);
  font-weight: 700;
}

.content {
  flex-grow: 1;
}
</style>
