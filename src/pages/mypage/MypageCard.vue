<script setup>
import { ref } from "vue";

// 입력 데이터
const name = ref("");
const age = ref("");
const birthDate = ref("");
const breed = ref("");
const notes = ref("");

// 성별 선택 (남: male, 여: female)
const gender = ref(null);
const setGender = (value) => {
  gender.value = value;
};

// 중성화 여부 선택 (O: neutered, X: notNeutered)
const neutering = ref(null);
const setNeutering = (value) => {
  neutering.value = value;
};

// 프로필 이미지 등록
const profileImageUrl = ref("/default-profile.png");
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 카드 등록 함수
const registerCard = () => {
  console.log({
    name: name.value,
    gender: gender.value,
    neutering: neutering.value,
    age: age.value,
    birthDate: birthDate.value,
    breed: breed.value,
    notes: notes.value,
    profileImageUrl: profileImageUrl.value,
  });

  alert("카드가 등록되었습니다!");
};
</script>

<template>
  <div class="profile-container">
    <h1>MyPage</h1>
    <h3>카드 생성</h3>

    <div class="form-container">
      <div class="form-left">
        <!-- 이름 -->
        <label>이름</label>
        <input type="text" v-model="name" />

        <!-- 성별 & 중성화 여부 (한 줄 배치) -->
        <div class="row">
          <!-- 성별 -->
          <div class="section">
            <label>성별</label>
            <div class="button-group">
              <button @click="setGender('male')" :class="{ active: gender === 'male' }">♂️</button>
              <button @click="setGender('female')" :class="{ active: gender === 'female' }">♀️</button>
            </div>
          </div>

          <!-- 중성화 여부 -->
          <div class="section">
            <label>중성화 유무</label>
            <div class="button-group">
              <button @click="setNeutering('neutered')" :class="{ active: neutering === 'neutered' }">✅</button>
              <button @click="setNeutering('notNeutered')" :class="{ active: neutering === 'notNeutered' }">❌</button>
            </div>
          </div>
        </div>

        <!-- 나이 & 생일 -->
        <div class="input-group">
          <div>
            <label>나이</label>
            <input type="number" v-model="age" />
          </div>
          <div>
            <label>생일</label>
            <input type="date" v-model="birthDate" />
          </div>
        </div>

        <!-- 품종 -->
        <label>품종</label>
        <input type="text" v-model="breed" />

        <!-- 특이사항 -->
        <label>특이사항</label>
        <input type="text" v-model="notes" />

        <!-- 카드 등록 버튼 -->
        <button class="register-btn" @click="registerCard">카드 등록</button>
      </div>

      <!-- 프로필 사진 -->
      <div class="form-right">
        <label>카드 사진</label>
        <div class="profile-image">
          <img :src="profileImageUrl" alt="프로필 사진" />
        </div>
        <label class="upload-btn">
          이미지 등록
          <input type="file" accept="image/*" @change="onFileChange" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 레이아웃 */
.profile-container {
  width: 500px;
  margin: auto;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 5px;
  padding: 20px ;
}

h3 {
  font-size: 16px;
  color: gray;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  background: #ddd;
  padding: 20px;
  border-radius: 8px;
}

/* 왼쪽 입력 폼 */
.form-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 14px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 한 줄 정렬 */
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 버튼 스타일 */
.button-group {
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  gap: 10px;
}

.button-group button {
  width: 50px;
  height: 50px;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

.button-group button.active {
  background: lightblue;
  border-color: blue;
}

/* 나이 & 생일 입력 그룹 */
.input-group {
  display: flex;
  gap: 30px;
}

.input-group div {
  flex: 1;
}

/* 등록 버튼 */
.register-btn {
  background: brown;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 오른쪽 프로필 사진 */
.form-right {
  text-align: center;
  margin-left: 20px;
}

.profile-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
}

/* 이미지 등록 버튼 */
.upload-btn {
  display: block;
  background: brown;
  color: white;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-btn input {
  display: none;
}
</style>
