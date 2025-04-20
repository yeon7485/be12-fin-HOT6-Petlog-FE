<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useMypageCard } from '../../stores/useMypageCard';
import { storeToRefs } from "pinia";
import MypageDelete from "../mypage/components/MypageDelete.vue";
import MypagePassword from "../mypage/MypagePasswordModal.vue";

const store = useMypageCard();
const { userProfile } = storeToRefs(store);

// ⬇️ 추가: 템플릿에서 직접 사용하기 위해 computed로 매핑
const nickname = computed(() => userProfile.value.nickname);
const email = computed(() => userProfile.value.email);
const profileImageUrl = computed(() => userProfile.value.profileImageUrl);

const router = useRouter();
const isLoading = ref(true);
const editingNickname = ref(false);
const selectedImage = ref(null);

const isPasswordModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

function getSessionUserIdx() {
  const user = sessionStorage.getItem("user");
  if (user) return JSON.parse(user).idx;
  return null;
}

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

const onFileChange = (event) => {
  selectedImage.value = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    userProfile.value.profileImageUrl = e.target.result;
  };
  reader.readAsDataURL(selectedImage.value);
};

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

const toggleEditNickname = () => {
  editingNickname.value = !editingNickname.value;
};

const saveNickname = () => {
  editingNickname.value = false;
};

const togglePasswordModal = () => {
  isPasswordModalOpen.value = !isPasswordModalOpen.value;
};

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const handleDeleteConfirm = (enteredPassword) => {
  alert(`회원 탈퇴 완료. 비밀번호: ${enteredPassword}`);
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

    <!-- 프로필 이미지 저장 버튼 -->
    <button class="save-image-btn" @click="saveProfileImage">프로필 이미지 저장</button>

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
  background: #A0522D
}
</style>
