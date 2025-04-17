<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import MypageDelete from '../mypage/components/MypageDelete.vue'
import MypagePassword from '../mypage/MypagePasswordModal.vue'

// 세션에서 user 객체를 가져오고, 그 안에서 idx 값을 추출하는 함수
function getSessionUserIdx() {
  const user = sessionStorage.getItem("user"); // 세션 스토리지에서 user 값을 가져옴
  console.log("세션에 저장된 user:", user); // user 값 출력
  if (user) {
    const parsedUser = JSON.parse(user);
    console.log("Parsed User:", parsedUser); // user 객체 출력
    return parsedUser.idx; // user가 존재하면 그 안에서 idx 값을 반환
  }
  return null; // user가 없다면 null 반환
}

const router = useRouter();
const nickname = ref("");  // 닉네임을 빈 문자열로 초기화
const email = ref("이메일 로딩 중");
const profileImageUrl = ref("/src/assets/images/default.png");
const petCards = ref([]);
const isLoading = ref(true); // 로딩 상태 변수
const editingNickname = ref(false); // 닉네임 편집 여부

// 모달 상태 관리
const isPasswordModalOpen = ref(false); // 비밀번호 변경 모달 상태
const isDeleteModalOpen = ref(false); // 회원 탈퇴 모달 상태

// 세션 스토리지에서 닉네임을 가져오기
onMounted(() => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    nickname.value = parsedUser.nickname || "닉네임 로딩 중";  // 세션에서 닉네임을 가져옴
  } else {
    console.error("세션에 유저 정보가 없습니다.");
    alert("세션에 유저 정보가 없습니다.");
    router.push("/user/login");
  }

  const userId = getSessionUserIdx();
  if (!userId) {
    alert("세션에서 유저 정보가 없습니다.");
    router.push("/user/login");
    return;
  }

  // 백엔드 호출로 이메일, 프로필 이미지 등 추가 데이터 가져오기
  axios.get(`/api/user/${userId}/profile`).then((response) => {
    console.log("API 응답 데이터:", response.data); // API 응답 데이터 확인
    const userData = response.data;
    email.value = userData.email || "이메일 없음"; // DB에서 가져온 이메일을 사용
    profileImageUrl.value = userData.profileImageUrl || "/src/assets/images/default.png"; // 프로필 이미지 URL
    petCards.value = userData.petCards || []; // 펫 카드 목록
  }).catch((error) => {
    console.error("유저 정보 불러오기 실패:", error);
    alert("로그인 정보가 없거나 세션이 만료되었습니다.");
    router.push("/user/login");
  }).finally(() => {
    isLoading.value = false; // 로딩 완료
  });
});

// 파일 변경 처리
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

// 닉네임 편집 처리
const toggleEditNickname = () => {
  editingNickname.value = !editingNickname.value;
};

const saveNickname = () => {
  editingNickname.value = false;
};

// 비밀번호 변경 모달 열기/닫기
const togglePasswordModal = () => {
  isPasswordModalOpen.value = !isPasswordModalOpen.value;
};

// 회원 탈퇴 모달 열기
const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

// 회원 탈퇴 모달 닫기
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

// 회원 탈퇴 확인
const handleDeleteConfirm = (enteredPassword) => {
  alert(`회원 탈퇴가 처리되었습니다. 비밀번호: ${enteredPassword}`);
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

    <!-- 닉네임 -->
    <div class="name-section">
      <span v-if="!editingNickname" class="name-text">{{ nickname }}</span>
      <input
        v-else
        v-model="nickname"
        @keyup.enter="saveNickname"
        @blur="saveNickname"
        class="name-input"
      />
      <button @click="toggleEditNickname" class="edit-btn">✏️</button>
    </div>

    <!-- 이메일 -->
    <div class="input-group">
      <label>이메일</label>
      <input v-model="email" readonly class="email-input" />
    </div>

    <!-- 펫 카드 목록 -->
    <div v-if="petCards.length" class="pet-cards">
      <h3>내 펫 카드</h3>
      <ul>
        <li v-for="pet in petCards" :key="pet.idx">{{ pet.name }}</li>
      </ul>
    </div>

    <!-- 로딩 중 -->
    <div v-if="isLoading" class="loading">로딩 중...</div>

    <!-- 비밀번호 설정 -->
    <button class="password-btn" @click="togglePasswordModal">비밀번호 설정</button>

    <!-- 회원 탈퇴 -->
    <button class="delete-link" @click="openDeleteModal">회원탈퇴</button>
  </div>

  <!-- 비밀번호 변경 모달 -->
  <MypagePassword v-if="isPasswordModalOpen" @close="togglePasswordModal" />

  <!-- 회원 탈퇴 모달 -->
  <MypageDelete
    v-if="isDeleteModalOpen"
    @confirm="handleDeleteConfirm"
    @cancel="closeDeleteModal"
  />
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: bold;
  margin-left: 30%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 0;
  max-width: 800px;
  background-color: #fff;
  border-radius: 12px;
}
.profile {
  position: relative;
  margin-bottom: 20px;
}
.image-upload {
  position: relative;
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
}
.camera-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #fff;
  padding: 5px;
  border-radius: 50%;
  font-size: 18px;
}
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
.delete-link {
  color: red;
  text-decoration: none;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}
.delete-link:hover {
  text-decoration: underline;
}
</style>
