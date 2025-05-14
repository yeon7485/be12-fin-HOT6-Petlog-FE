<!-- admin.vue -->
<script setup></script>

<template>
  <div class="admin-container">
    <!-- 사이드바 -->
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <router-link to="/admin/profile" active-class="active">
              내 정보
            </router-link>
          </li>
          <li>
            <router-link to="/admin/category" active-class="active">
              카테고리 관리
            </router-link>
          </li>
          <li>
            <router-link to="/admin/event" active-class="active">
              이벤트 채팅방 관리
            </router-link>
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
.admin-container {
  display: flex;
  min-height: 100px;
  justify-content: space-between;
  padding: 70px 15%;
  gap: 60px;
}

.sidebar {
  width: 170px;
  height: 300px;
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

.content {
  flex: 1; /* 남은 영역만 차지하게 */
  padding: 20px;
  box-sizing: border-box;
  max-width: calc(100% - 320px); /* 사이드바+마진 고려 */
  overflow-x: hidden; /* 혹시 모를 확장 방지 */
}

.sidebar a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap; /* ← 줄바꿈 방지 */
  box-sizing: border-box;
  text-decoration: none;
  color: var(--gray900, #212121);
  border-radius: 8px;
  transition: font-weight 0.2s;
}

.sidebar a.active {
  color: var(--main-color-brown);
  font-weight: 700;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
}

.sidebar li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}


</style>
