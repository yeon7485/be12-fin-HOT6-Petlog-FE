<script setup>
import { ref } from "vue";

const name = ref("구름봄 님");
const editingName = ref(false);
const email = ref("test@example.com");
const profileImage = ref(null);
const profileImageUrl = ref("/src/assets/images/dog1.png"); // 기본 이미지 URL

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    profileImage.value = file;
  }
};

const toggleEditName = () => {
  editingName.value = !editingName.value;
};

const saveName = () => {
  editingName.value = false;
};
</script>

<template>
  <div class="mypage-profile">
    <h2 class="title">내 정보</h2>
  </div>
  <div class="container">
    <!-- 프로필 이미지 -->
    <div class="profile">
      <label class="image-upload">
        <input type="file" accept="image/*" @change="onFileChange" />
        <img :src="profileImageUrl" alt="프로필 이미지" class="profile-img" />
        <div class="camera-icon">📷</div>
      </label>
    </div>

    <!-- 이름 -->
    <div class="name-section">
      <span v-if="!editingName" class="name-text">{{ name }}</span>
      <input
        v-else
        v-model="name"
        @keyup.enter="saveName"
        @blur="saveName"
        class="name-input"
      />
      <button @click="toggleEditName" class="edit-btn">✏️</button>
    </div>

    <!-- 이메일 -->
    <div class="input-group">
      <label>이메일</label>
      <input v-model="email" readonly class="email-input" />
    </div>

    <!-- 비밀번호 설정 -->
    <button class="password-btn">비밀번호 설정</button>

    <!-- 회원 탈퇴 -->
    <router-link to="/delete-account" class="delete-link">회원탈퇴</router-link>
  </div>
</template>

<style scoped>
/* 제목 */
.title {
  font-size: 32px;
  font-weight: bold;
  margin: 20px;
  position: absolute;
  left: 500px; 
  margin-top: 0px;
}

.mypage-profile {
  width: 100%;  
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

/* 프로필 이미지 */
.profile {
  position: relative;
  margin-bottom: 30px;
}

.image-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.image-upload input {
  display: none;
}

.profile-img {
  width: 150px; /* 크기 증가 */
  height: 150px;
  border-radius: 50%;
  border: 3px solid #ddd;
  object-fit: cover;
  display: block;
}

.camera-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #ffffff;
  padding: 6px;
  border-radius: 50%;
  font-size: 16px;
}

/* 이름 */
.name-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.name-text {
  font-size: 24px; /* 글씨 키움 */
  font-weight: bold;
}

.name-input {
  font-size: 20px;
  padding: 8px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 6px;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: gray;
}

/* 입력 필드 */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-group label {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.email-input {
  font-size: 18px;
  padding: 12px;
  width: 300px; /* 너비 증가 */
  border: 2px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
  cursor: not-allowed;
}

/* 버튼 */
.password-btn {
  background: #ddd;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.password-btn:hover {
  background: #bbb;
}

/* 회원 탈퇴 */
.delete-link {
  margin-top: 20px;
  color: red;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}

.delete-link:hover {
  text-decoration: underline;
}
</style>
