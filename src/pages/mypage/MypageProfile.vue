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
.mypage-profile{
}

.title{
  font-size: 32px;
  font-weight: bold;
  margin-left: 20px;
}
/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 0;
  width: 100%;
  max-width: 800px; 
  background-color: #fff; 
  border-radius: 12px; 
}

/* 프로필 이미지 스타일 */
.profile {
  position: relative;
  margin-bottom: 20px;
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
  display: block;
}

.camera-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #ffffff;
  padding: 5px;
  border-radius: 50%;
  font-size: 18px;
}

/* 이름 스타일 */
.name-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.name-text {
  font-size: 20px;
  font-weight: bold;
}

.name-input {
  font-size: 20px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: gray;
}

/* 입력 필드 스타일 */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 18px;
  color: #666;
  margin-bottom: 5px;
}

.email-input {
  font-size: 20px;
  padding: 8px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  cursor: not-allowed;
}

/* 버튼 스타일 */
.password-btn {
  background: #ddd;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.password-btn:hover {
  background: #ccc;
}

/* 회원 탈퇴 링크 */
.delete-link {
  color: red;
  text-decoration: none;
  font-size: 16px;
}

.delete-link:hover {
  text-decoration: underline;
}
</style>