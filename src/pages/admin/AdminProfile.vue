<script setup>
import { ref } from 'vue';

// 사용자 정보 (예제)
const user = ref({
  name: '관리자01',
  email: 'test@example.com'
});

// 비밀번호 변경 함수 (예제)
const changePassword = () => {
  alert('비밀번호 변경 페이지로 이동');
};

// 회원 탈퇴 함수 (예제)
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
        <strong>{{ user.name }}</strong> 님
        <span class="edit-icon">✏️</span>
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
</template>

<style scoped>
/* 전체 레이아웃 */
.title {
  font-size: 32px;
  font-weight: bold;
  top: 20px;
  left: 20px;
  margin-right: 500px;
}

/* 전체 컨테이너 */
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

/* 사용자 프로필 */
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

.edit-icon {
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
}

/* 입력 폼 스타일 */
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

/* 버튼 스타일 */
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

/* 회원 탈퇴 버튼 */
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
