<script setup>
import { ref } from 'vue';
import AdminPassword from "./AdminPasswordModal.vue";

// 사용자 정보
const user = ref({
  name: '관리자01',
  email: 'test@example.com'
});

// 이름 수정 상태
const editingName = ref(false);

// 이름 수정 토글
const toggleEditName = () => {
  editingName.value = true;
};

// 이름 저장 (Enter 또는 blur)
const saveName = () => {
  editingName.value = false;
};

// 모달 상태 관리
const isPasswordModalOpen = ref(false);
const changePassword = () => {
  isPasswordModalOpen.value = true;
};
const closePasswordModal = () => {
  isPasswordModalOpen.value = false;
};

// 회원 탈퇴
const deleteAccount = () => {
  if (confirm('정말 회원 탈퇴를 하시겠습니까?')) {
    alert('회원 탈퇴가 완료되었습니다.');
  }
};
</script>

<template>
  <div class="container">
    <h2 class="title">내 정보</h2>

    <div class="profile">
      <h3 class="username">
        <!-- 이름 수정 중일 때 input 필드 -->
        <template v-if="editingName">
          <input
            v-model="user.name"
            class="name-input"
            @keyup.enter="saveName"
            @blur="saveName"
          />
        </template>
        <!-- 수정 중이 아닐 때 텍스트와 연필 아이콘 -->
        <template v-else>
          <strong>{{ user.name }}</strong> 님
          <span class="edit-icon" @click="toggleEditName">✏️</span>
        </template>
      </h3>
    </div>

    <div class="info">
      <label class="label">이메일</label>
      <input type="text" class="input" v-model="user.email" disabled />

      <label class="label">비밀번호</label>
      <button class="btn" @click="changePassword">비밀번호 설정</button>
    </div>

    <p class="delete" @click="deleteAccount">회원탈퇴</p>
  </div>

  <!-- 비밀번호 변경 모달 -->
  <AdminPassword v-if="isPasswordModalOpen" @close="closePasswordModal" />
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: bold;
  top: 20px;
  left: 20px;
  margin-right: 500px;
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
}
.profile {
  margin-top: 40px;
  text-align: center;
}
.username {
  font-size: 22px;
  font-weight: bold;
  border-bottom: 2px solid black;
  display: inline-block;
  padding-bottom: 8px;
}
.name-input {
  font-size: 22px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.edit-icon {
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
}
.info {
  margin-top: 10px;
  width: 50%;
}
.label {
  display: block;
  font-size: 18px;
  margin-top: 15px;
}
.input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
.btn {
  margin-top: 15px;
  padding: 12px 16px;
  border: 2px solid #000;
  background: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}
.btn:hover {
  background: #f0f0f0;
}
.delete {
  margin-top: 30px;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  text-decoration: underline;
}
.delete:hover {
  color: red;
}
</style>
