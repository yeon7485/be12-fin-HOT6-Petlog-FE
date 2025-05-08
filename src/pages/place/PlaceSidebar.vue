<script setup></script>

<template>
  <div class="board_layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li>
            <router-link to="/place/hospital" active-class="active">주변 병원 찾기</router-link>
          </li>
          <li>
            <router-link to="/place/beauty" active-class="active">주변 미용실 찾기</router-link>
          </li>
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
  padding: 70px 15%; /* ✅ 패딩 줄이고 왼쪽 여백 확보 */
  gap: 60px;
}

.sidebar {
  width: 170px;
  height: 170px;
  background: #ffffff;
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
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar a {
  text-decoration: none;
  color: #212121;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.sidebar a.active {
  color: #6a0104;
  font-weight: 700;
}

.board_content {
  flex: 1;
}
</style>
