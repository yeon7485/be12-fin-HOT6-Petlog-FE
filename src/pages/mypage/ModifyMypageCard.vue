<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 세션에서 user 객체를 가져오고, 그 안에서 idx 값을 추출하는 함수
function getSessionUserIdx() {
  const user = sessionStorage.getItem('user'); // 세션 스토리지에서 user 값을 가져옴
  console.log('세션에 저장된 user:', user); // user 값 출력
  if (user) {
    const parsedUser = JSON.parse(user);
    console.log('Parsed User:', parsedUser); // user 객체 출력
    return parsedUser.idx; // user가 존재하면 그 안에서 idx 값을 반환
  }
  return null; // user가 없다면 null 반환
}

const router = useRouter(); // 라우터 인스턴스

const petId = ref("");  // petId 값
const card = ref({
  id: "",  // ID 값을 빈 문자열로 초기화
  name: '',
  breed: '',
  gender: '',
  birthdate: '',
  isNeutered: false,
  notes: '',
  status: '',
  userId: ""  // 사용자 ID를 추가
});

// 상태값 설정
const statuses = ['정상', '실종', '파양', '사망'];

// URL 경로에서 petId를 가져오기
onMounted(async () => {
  // 사용자 정보에서 userId를 가져옴
  const userId = getSessionUserIdx();

  if (!userId) {
    console.error("세션에 유저 정보가 없습니다.");
    alert("로그인 정보가 없습니다.");
    router.push("/user/login");
    return;
  }

  try {
    // URL에서 petId 추출
    const petId = router.currentRoute.value.params.petId;

    // 반려동물 정보를 가져오는 API 호출
    const response = await axios.get(`/api/pet/${petId}`);

    // 받아온 데이터로 card 값 업데이트
    card.value = {
      id: response.data.id,
      name: response.data.name,
      gender: response.data.gender,
      isNeutering: response.data.isNeutering,  
      birthdate: response.data.birthDate,
      breed: response.data.breed,
      specificInformation: response.data.specificInformation, 
      status: response.data.status,
      userId: userId  // 유저 ID를 추가
    };
  } catch (error) {
    console.error('카드 정보를 가져오는 중 오류 발생:', error);
  }
});

const saveCard = async () => {
  try {
    const formData = new FormData();

    const petData = {
      id: card.value.id,
      name: card.value.name,
      gender: card.value.gender,
      isNeutering: card.value.isNeutering,  
      birthDate: card.value.birthDate,  
      breed: card.value.breed,
      specificInformation: card.value.specificInformation,  
      status: card.value.status,
      userId: card.value.userId  // userId 포함
    };

    // petData를 FormData에 추가
    formData.append("pet", new Blob([JSON.stringify(petData)], { type: "application/json" }));

    // 서버로 FormData 전송 (multipart/form-data)
    const response = await axios.put(`/api/pet/${card.value.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("카드가 성공적으로 수정되었습니다!");
    router.push("/mypage/cardlist"); // ✅ 저장 후 이동
  } catch (err) {
    console.error("카드 수정 실패:", err);
    alert("수정 중 오류가 발생했습니다.");
  }
};

// 취소 버튼 클릭 시 이동
const goToCardList = () => {
  router.push("/mypage/cardlist");  // 반려동물 카드 목록으로 이동
};
</script>

<template>
  <h1 class="title">반려동물 정보 수정</h1>
  <div class="form-container">

    <!-- 프로필 사진 (나중에 처리) -->
    <div class="profile-section">
      <img src="/src/assets/images/cat1.jpg" class="profile-img" />
    </div>

    <!-- 이름 -->
    <input v-model="card.name" placeholder="이름" class="input" />

    <!-- 성별 -->
    <div class="gender-section">
      <label><input type="radio" value="♂️" v-model="card.gender" /> ♂️</label>
      <label><input type="radio" value="♀️" v-model="card.gender" /> ♀️</label>
      <label><input type="checkbox" v-model="card.isNeutering" /> 중성화 유무</label>
    </div>

    <!-- 생일 -->
    <div class="birthdate-section">
      <input type="date" v-model="card.birthDate" />
    </div>

    <!-- 품종 -->
    <input v-model="card.breed" placeholder="품종" class="input" />

    <!-- 특이사항 -->
    <textarea v-model="card.specificInformation" placeholder="특이사항" class="textarea" />

    <!-- 상태 -->
    <div class="status-section">
      <label v-for="s in statuses" :key="s" class="status-option">
        <input type="radio" :value="s" v-model="card.status" />
        {{ s }}
      </label>
    </div>

    <!-- 버튼 그룹 -->
    <div class="button-group">
      <button @click="goToCardList" class="cancel-btn">취소</button>  <!-- 취소 버튼 -->
      <button @click="saveCard" class="save-btn">저장</button>  <!-- 저장 버튼 -->
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: 60%;
  width: fit-content;
}

.form-container {
  background: #fdf6e3;
  width: 400px;
  margin: 30px auto;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 20px;
  
}

.input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 8px 0;
  resize: none;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

.gender-section,
.status-section,
.birthdate-section {
  margin: 10px 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
}

.status-option {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 4px 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn {
  background: #eee;
}

.save-btn {
  background: #800000;
  color: #fff;
}
.birthdate-section{
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

</style>
