<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore.js';  
import { useLoadingStore } from '../../stores/useLoadingStore.js';

const adminStore = useAdminStore();  
const loadingStore = useLoadingStore();

onMounted(async () => {
  loadingStore.isLoading = true; // 로딩 시작
  await adminStore.fetchDeletedUsers();
  console.log('adminStore deleteUser', adminStore.deletedUsers);
  loadingStore.isLoading = false; // 로딩 종료
});


const restoreUser = (userId) => {
  adminStore.restoreUser(userId);
};
</script>

<template>
  <div class="container">
    <h2 class="title">관리자 페이지</h2>

    <div v-if="loadingStore.isLoading" class="loading">로딩 중...</div>

    <!-- 삭제된 사용자 목록 -->
    <div v-if="Array.isArray(adminStore.deletedUsers) && adminStore.deletedUsers.length > 0">
      <h3>탈퇴한 사용자 목록</h3>
      <ul>
        <li v-for="user in adminStore.deletedUsers" :key="user.idx">
          <strong>{{ user.nickname }}</strong> ({{ user.email }}) - <span class="user-idx">ID: {{ user.idx }}</span>
          <button @click="restoreUser(user.idx)" class="btn">복구</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>삭제된 사용자가 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  border-radius: 12px;
  position: relative;
  margin-left: 10%;
}

.btn {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

.loading {
  font-size: 18px;
  color: #777;
}
</style>