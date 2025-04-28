<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from '../../stores/useProfileStore.js'; // Pinia 스토어 사용
import { storeToRefs } from "pinia";
import MypageDelete from "../mypage/components/MypageDelete.vue";
import MypagePassword from "../mypage/MypagePasswordModal.vue";

// Pinia 스토어 연결
const store = useProfileStore(); 
const { userProfile } = storeToRefs(store);

// 템플릿에서 사용하기 위해 computed로 매핑
const nickname = computed(() => userProfile.value.nickname);
const email = computed(() => userProfile.value.email);
const profileImageUrl = computed(() => userProfile.value.profileImageUrl);
const provider = computed(() => userProfile.value.provider);

const router = useRouter();
const isLoading = ref(true);
const editingNickname = ref(false);
const selectedImage = ref(null);
const newNickname = ref(""); // 새로운 닉네임 입력을 위한 변수

const isPasswordModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

// 세션에서 사용자 인덱스 가져오기
function getSessionUserIdx() {
  const user = sessionStorage.getItem("user");
  if (user) return JSON.parse(user).idx;
  return null;
}

// 컴포넌트 마운트 시 프로필 정보 가져오기
onMounted(async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert("세션 정보가 없습니다.");
    router.push("/user/login");
    return;
  }

  try {
    await store.fetchUserProfile(userId);
  } catch (e) {
    alert("프로필 정보를 불러오는 데 실패했습니다.");
    router.push("/user/login");
  } finally {
    isLoading.value = false;
  }
});

// 프로필 이미지 변경 시 미리보기
const onFileChange = (event) => {
  selectedImage.value = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    userProfile.value.profileImageUrl = e.target.result;
  };
  reader.readAsDataURL(selectedImage.value);
};

// 프로필 이미지 저장
const saveProfileImage = async () => {
  if (!selectedImage.value) {
    alert("변경할 이미지가 없습니다.");
    return;
  }
  const userId = getSessionUserIdx();
  try {
    await store.uploadProfileImage(userId, selectedImage.value);
    alert("프로필 이미지가 저장되었습니다.");
  } catch (e) {
    alert("이미지 저장 실패");
  }
};

// 닉네임 편집 토글
const toggleEditNickname = () => {
  editingNickname.value = !editingNickname.value;
  newNickname.value = nickname.value; // 기존 닉네임을 새로운 닉네임 변수에 할당
};

const saveNickname = async () => {
  // 닉네임 길이 체크
  if (newNickname.value.length < 4) {
    alert("닉네임은 최소 4글자 이상이어야 합니다.");
    return;
  }

  // 기존 닉네임과 동일하면 저장하지 않음
  if (newNickname.value === nickname.value) {
    alert("닉네임이 동일합니다. 변경할 필요가 없습니다.");
    return;
  }

  editingNickname.value = false; // 편집 상태 종료
  const userId = getSessionUserIdx(); // 사용자 ID 가져오기
  try {
    await store.updateNickname(userId, newNickname.value); // Pinia 스토어에서 API 호출
    nickname.value = newNickname.value; // 실제 닉네임 값 업데이트
    alert("닉네임이 변경되었습니다.");
  } catch (e) {
    // 실패 시 편집 상태 유지하고 오류 메시지 출력
    editingNickname.value = true;
    alert("닉네임 변경 실패: " + e.message);
  }
};
// 비밀번호 설정 모달 열기
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
  alert(`회원 탈퇴 완료. 비밀번호: ${enteredPassword}`);
};
</script>

<template>
  <div class="mypage-profile">
    <h2 class="title">내 정보</h2>
  </div>

  <div class="container">
    <div class="profile">
      <label class="image-upload">
        <input type="file" accept="image/*" @change="onFileChange" />
        <img :src="profileImageUrl" alt="프로필 이미지" class="profile-img" />
        <div class="camera-icon">📷</div>
      </label>
    </div>

    <!-- 프로필 이미지 저장 버튼 -->
    <button class="save-image-btn" @click="saveProfileImage">프로필 이미지 저장</button>

    <!-- 닉네임 -->
    <div class="name-section">
      <span v-if="!editingNickname" class="name-text">{{ nickname }}</span>
      <input
        v-else
        v-model="newNickname"
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

    <!-- 로딩 중 -->
    <div v-if="isLoading" class="loading">로딩 중...</div>

    <!-- 비밀번호 설정 -->
    <button v-if="provider !== 'kakao'" class="password-btn" @click="togglePasswordModal">비밀번호 설정</button>

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
  background: #A0522D;
  border: none;
  color: white;
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
.save-image-btn {
  background: #A0522D;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
}
.save-image-btn:hover {
  background: #A0522D;
}
</style>
