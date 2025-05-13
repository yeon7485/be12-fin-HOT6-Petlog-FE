<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore.js'; // Pinia store
import AdminEventBox from '../admin/components/AdminEventBox.vue'; // AdminEventBox 컴포넌트
import AdminEventModal from '../admin/components/AdminEventModal.vue'; // 채팅방 생성 모달

const showModal = ref(false);  // 모달을 보여줄지 여부
const store = useAdminStore();  // Pinia store 사용

// 채팅방 목록을 가져오는 함수
const fetchRooms = async () => {
  try {
    await store.fetchAdminChatRooms();  
    console.log('Admin Chat Rooms:', store.adminChatRooms);  
  } catch (error) {
    console.error("❌ ADMIN 채팅방 목록 불러오기 실패:", error);
  }
};

const handleSubmit = async (form) => {
  const payload = {
    title: form.title,
    hashtags: ['이벤트'],
    startDateTime: form.dateTime,
    maxPeople: form.maxPeople,
  };

  await store.createEventChatRoom(payload);
  showModal.value = false;
  fetchRooms(); 
};

onMounted(() => {
  fetchRooms();
});
</script>

<template>
  <div class="page-wrapper">
    <div class="main">
      <div class="header">
        <h2>이벤트 채팅방</h2>
        <button class="add-button" @click="showModal = true">+</button>
      </div>

      <!-- AdminEventBox에서 채팅방 목록을 표시 -->
      <AdminEventBox />
    </div>
  </div>

  <!-- 채팅방 생성 모달 -->
  <AdminEventModal v-if="showModal" @close="showModal = false" @submit="handleSubmit" />
</template>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.main {
  width: 600px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  width: 32px;
  height: 32px;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #aaa;
  background: #fff;
  cursor: pointer;
}

.chatroom-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-room {
  color: #888;
  font-size: 16px;
  text-align: center;
  padding: 40px 0;
}
</style>
