<script setup>
import { ref } from "vue";

// 프로필 이미지 상태 (기본 이미지 설정)
const profileImage = ref("/src/assets/images/cat2.jpg");

// 카드 정보
const card = ref({
  name: "빙봉",
  gender: "female",
  neutered: true,
  birthDate: "2017-04-01", // 기본 날짜 설정
  breed: "코리안숏헤어",
  notes: "성격 다정함\n꼬리가 짧아요",
});

// 파일 입력 요소 참조
const fileInput = ref(null);

// 저장 버튼 클릭 시 실행될 함수
const saveCard = () => {
  console.log("카드 저장됨:", card.value);
};

// 취소 버튼 클릭 시 실행될 함수
const cancel = () => {
  console.log("취소됨");
};

// 파일 선택 창 열기
const triggerFileInput = () => {
  fileInput.value.click(); // input 요소 클릭
};

// 파일 업로드 함수
const uploadImage = (event) => {
  const file = event.target.files[0]; // 사용자가 선택한 파일
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // 이미지 미리보기 적용
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="card-form">
    <h2 class="title">새 카드 생성</h2>
    <div class="form-container">
      <!-- 프로필 사진 -->
      <div class="profile-section">
        <img :src="profileImage" alt="프로필 이미지" class="profile-img" />
        <input type="file" ref="fileInput" accept="image/*" @change="uploadImage" hidden />
        <button class="upload-btn" @click="triggerFileInput">📷</button>
      </div>

      <!-- 이름 -->
      <label>이름</label>
      <input type="text" v-model="card.name" placeholder="이름 입력" />

      <!-- 성별 + 중성화 여부 (한 줄 배치) -->
      <div class="gender-neuter-group">
        <!-- 성별 -->
        <div class="gender-section">
          <label>성별</label>
          <div class="gender-buttons">
            <label>
              <input type="radio" v-model="card.gender" value="male" />
              <span>♂️</span>
            </label>
            <label>
              <input type="radio" v-model="card.gender" value="female" />
              <span>♀️</span>
            </label>
          </div>
        </div>

        <!-- 중성화 여부 -->
        <div class="neuter-section">
          <label>중성화 여부</label>
          <label class="neutered">
            <input type="checkbox" v-model="card.neutered" />
            <span></span>
          </label>
        </div>
      </div>

      <!-- 생일 (달력 입력) -->
      <label>생일</label>
      <input type="date" v-model="card.birthDate" class="birth-input" />

      <!-- 품종 -->
      <label>품종</label>
      <input type="text" v-model="card.breed" placeholder="예: 코리안숏헤어" />

      <!-- 특이사항 -->
      <label>특이사항</label>
      <textarea v-model="card.notes" placeholder="특이사항 입력"></textarea>

      <!-- 버튼 그룹 -->
      <div class="button-group">
        <button class="cancel-btn" @click="cancel">취소</button>
        <button class="save-btn" @click="saveCard">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  padding: 10px;
  text-align: left;
  width: 130px;
  margin-right: 400px;
}

/* 전체 컨테이너 */
.card-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* 폼 컨테이너 */
.form-container {
  background: #f8f1ea;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* 프로필 사진 */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.upload-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 25px;
  margin-top: 5px;
}

/* 입력 필드 스타일 */
label {
  display: block;
  font-weight: bold;
  font-size: 14px;
  margin-top: 12px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 성별 + 중성화 여부 한 줄 정렬 */
.gender-neuter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 70px;
}

/* 성별 */
.gender-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.gender-buttons {
  display: flex;
  gap: 10px;
}
.gender-buttons span {
  font-size: 30px; /* 성별 아이콘 크기 증가 */
}

.gender-buttons label {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 중성화 여부 */
.neuter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.neutered {
  display: flex;
  align-items: center;
}


/* 생일 입력 */
.birth-input {
  padding: 8px;
  width: 100%;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.cancel-btn {
  background: none;
  border: 1px solid #b33a3a;
  color: #b33a3a;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background: #b33a3a;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
