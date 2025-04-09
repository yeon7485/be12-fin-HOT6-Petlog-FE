<script setup>
</script>

<template>
  <div class="board_layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><router-link to="/place/hospital" active-class="active">주변 병원 찾기</router-link></li>
          <li><router-link to="/place/beauty" active-class="active">주변 미용실 찾기</router-link></li>
        </ul>
      </nav>
    </aside>

    <main class="board_content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.board_layout {
  display: flex;
  padding: 40px 40px 40px 240px; /* ✅ 패딩 줄이고 왼쪽 여백 확보 */
  gap: 60px;
}

.sidebar {
  position: fixed; /* ✅ 고정 */
  top: 130px;
  left: 130px;
  width: 160px;
  height: 200px;
  background: #ffffff;
  padding: 30px 0;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
  gap: 25px;
  display: flex;
  flex-direction: column;
}

.sidebar li {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar a {
  text-decoration: none;
  color: #212121;
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

}


.sidebar a.active {
  color: #6A0104;
  font-weight: 700;
}

.board_content {
  flex: 1;
}
</style>
