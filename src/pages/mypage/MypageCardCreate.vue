<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePetStore } from '../../stores/usePetStore'
import defaultImage from '../../assets/images/image_not_found.png';

const store = usePetStore();
const router = useRouter();

const profileImage = ref('');
const selectedFile = ref(null);
const isUploading = ref(false);
const fileInput = ref(null);

const card = ref({
  name: '',
  gender: '',
  isNeutering: false,
  birthDate: '',
  breed: '',
  specificInformation: '',
  userId: null,
});

function getSessionUserIdx() {
  const user = sessionStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.idx;
  }
  return null;
}

const triggerFileInput = () => {
  fileInput.value.click();
};

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

const saveCard = async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert('로그인 정보가 없습니다.');
    router.push('/user/login');
    return;
  }

  const petData = {
    name: card.value.name,
    gender: card.value.gender,
    isNeutering: card.value.isNeutering,
    birthDate: card.value.birthDate,
    breed: card.value.breed,
    specificInformation: card.value.specificInformation,
    userId: userId,
  };

  isUploading.value = true;
  try {
    await store.createPet(petData, selectedFile.value); // ✅ store에서 처리
    alert('카드가 성공적으로 생성되었습니다!');
    router.push('/mypage/cardlist');
  } catch (err) {
    alert('등록 중 오류가 발생했습니다.');
  } finally {
    isUploading.value = false;
  }
};

const cancel = () => {
  router.push('/mypage/cardlist');
};
</script>

<template>
  <div class="card-form">
    <h2 class="title">새 카드 생성</h2>
    <div class="form-container">
      <!-- 프로필 사진 -->
      <div class="profile-section">
        <img :src="profileImage || defaultImage" alt="프로필 이미지" class="profile-img" />

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
