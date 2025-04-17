<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 라우터 인스턴스
const router = useRouter();

// 프로필 이미지 미리보기
const profileImage = ref('');

// 선택된 파일
const selectedFile = ref(null);

// 반려동물 카드 데이터
const card = ref({
  name: '',
  gender: '',
  isNeutering: false,  // 중성화 여부
  birthDate: '',
  breed: '',
  specificInformation: '',
  userId: null,  // 나중에 세션에서 추출한 userId 값을 넣을 예정
});

// 파일 입력 요소 참조
const fileInput = ref(null);

// 이미지 업로드 상태
const isUploading = ref(false);

// 세션에서 user 객체를 가져오고, 그 안에서 idx 값을 추출하는 함수
function getSessionUserIdx() {
  const user = sessionStorage.getItem('user'); // 세션 스토리지에서 user 값을 가져옴
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.idx; // user가 존재하면 그 안에서 idx 값을 반환
  }
  return null; // user가 없다면 null 반환
}

// 파일 선택 창 열기
const triggerFileInput = () => {
  fileInput.value.click();
};

// 파일 업로드 함수
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 카드 저장 함수
const saveCard = async () => {
  try {
    const formData = new FormData();

    // 세션에서 가져온 userId 설정
    const userId = getSessionUserIdx();
    if (!userId) {
      alert('로그인 정보가 없습니다.');
      router.push('/user/login');
      return;
    }

    // 반려동물 카드 데이터
    const petData = {
      name: card.value.name,
      gender: card.value.gender,
      isNeutering: card.value.isNeutering,  // 중성화 여부
      birthDate: card.value.birthDate,
      breed: card.value.breed,
      specificInformation: card.value.specificInformation,  // 특이사항
      userId: userId,  // 세션에서 가져온 userId 추가
    };

    // JSON 데이터를 FormData로 추가
    formData.append(
      'pet',
      new Blob([JSON.stringify(petData)], { type: 'application/json' })
    );

    // 이미지 파일이 있을 경우 FormData에 추가
    if (selectedFile.value) {
      formData.append('profileImage', selectedFile.value);
    }

    isUploading.value = true; // 업로드 시작

    // 최종적으로 반려동물 카드 생성 API 요청
    const response = await axios.post('/api/pet/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('카드가 성공적으로 생성되었습니다!');
    router.push('/mypage/cardlist'); // 저장 후 이동
  } catch (err) {
    console.error('카드 등록 실패:', err);
    alert('등록 중 오류가 발생했습니다.');
  } finally {
    isUploading.value = false;
  }
};

// 취소 버튼 클릭 시 실행될 함수
const cancel = () => {
  router.push('/mypage/cardlist'); // 취소 시 이동
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

      <!-- 성별 + 중성화 여부 -->
      <div class="gender-neuter-group">
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

        <div class="neuter-section">
          <label>중성화 여부</label>
          <label class="neutered">
            <input type="checkbox" v-model="card.isNeutering" />
            <span></span>
          </label>
        </div>
      </div>

      <!-- 생일 -->
      <label>생일</label>
      <input type="date" v-model="card.birthDate" class="birth-input" />

      <!-- 품종 -->
      <label>품종</label>
      <input type="text" v-model="card.breed" placeholder="예: 코리안숏헤어" />

      <!-- 특이사항 -->
      <label>특이사항</label>
      <textarea v-model="card.specificInformation" placeholder="특이사항 입력"></textarea>

      <!-- 버튼 그룹 -->
      <div class="button-group">
        <button class="cancel-btn" @click="cancel">취소</button>
        <button class="save-btn" @click="saveCard" :disabled="isUploading">저장</button>
      </div>
    </div>  
  </div>
</template>


<style scoped>
.title {
  padding: 10px;
  text-align: left;
  width: 170px;
  margin-right: 400px;
}

.card-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  background: #f8f1ea;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

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
  background-color: white;
  color: #000;
}

.gender-neuter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 70px;
}

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
  font-size: 30px;
}

.gender-buttons label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.neuter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.neutered {
  display: flex;
  align-items: center;
}

.birth-input {
  padding: 8px;
  width: 100%;
}

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

input[type="radio"] {
  width: 20px;
  height: 15px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
</style>
