<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "../../stores/useProfileStore.js";
import { useUserStore } from "../../stores/useUserStore.js";
import { storeToRefs } from "pinia";
import MypageDelete from "../mypage/components/MypageDelete.vue";
import MypagePassword from "../mypage/MypagePasswordModal.vue";

const store = useProfileStore();
const userStore = useUserStore();
const { userProfile } = storeToRefs(store);

const nickname = computed(() => userProfile.value.nickname);
const email = computed(() => userProfile.value.email);
const profileImageUrl = computed(() => userProfile.value.profileImageUrl);
const provider = computed(() => userProfile.value.provider);

const router = useRouter();
const isLoading = ref(true);
const editingNickname = ref(false);
const selectedImage = ref(null);
const newNickname = ref("");

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
  newNickname.value = nickname.value;
};

const saveNickname = async () => {
  if (newNickname.value.length < 4) {
    alert("닉네임은 최소 4글자 이상이어야 합니다.");
    return;
  }

  if (newNickname.value === nickname.value) {
    alert("닉네임이 동일합니다. 변경할 필요가 없습니다.");
    return;
  }

  editingNickname.value = false;
  const userId = getSessionUserIdx();

  try {
    await store.updateNickname(userId, newNickname.value);

    await userStore.loginCheck();

    await store.fetchUserProfile(userId);

    alert("닉네임이 변경되었습니다!");
  } catch (e) {
    editingNickname.value = true;
    alert("닉네임 변경 실패: " + e.message);
  }
};

// 비밀번호 설정 모달 열기
const togglePasswordModal = () => {
  isPasswordModalOpen.value = !isPasswordModalOpen.value;
};

// 회원 탈퇴 모달 열기
const openDeleteModal = async () => {
  const isOAuthUser = await checkOAuthLogin();
  console.log("isOAuth", isOAuthUser);
  if (isOAuthUser) {
    await handleDeleteConfirm("");
  } else {
    isDeleteModalOpen.value = true;
  }
};

// 회원 탈퇴 모달 닫기
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const checkOAuthLogin = async () => {
  const result = await userStore.checkOAuthLogin();
  return result.result;
};

const handleDeleteConfirm = async (enteredPassword) => {
  try {
    await userStore.deleteUser(enteredPassword); // 스토어에 삭제 요청
    alert("회원 탈퇴가 완료되었습니다.");
    router.push("/"); // 탈퇴 후 메인으로 이동
  } catch (error) {
    alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <h2 class="title">내 정보</h2>
    <div class="profile_wrapper">
      <div class="photo_name_box">
        <div class="profile">
          <label class="image-upload">
            <input type="file" accept="image/*" @change="onFileChange" />
            <img :src="profileImageUrl" alt="프로필 이미지" class="profile-img" />
            <div class="camera-icon">
              <img src="/src/assets/icons/camera.svg" alt="카메라 아이콘" />
            </div>
          </label>
          <button class="save-image-btn" @click="saveProfileImage">프로필 이미지 저장</button>
        </div>

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
          <img src="/src/assets/icons/edit.svg" alt="수정 버튼" @click="toggleEditNickname" class="edit-btn"></img>
        </div>
      </div>
      <!-- 이메일 -->
      <div class="input-group">
        <label>이메일</label>
        <input v-model="email" readonly class="email-input" />
      </div>

      <!-- 로딩 중 -->
      <div v-if="isLoading" class="loading">로딩 중...</div>

      <!-- 비밀번호 설정 -->
      <div class="input-group">
      <label>비밀번호</label>
      <button v-if="provider !== 'kakao'" class="password-btn" @click="togglePasswordModal">
        비밀번호 설정
      </button>

      <button class="delete-link" @click="openDeleteModal">회원탈퇴</button>
    </div>

      <!-- 회원 탈퇴 -->

    </div>
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
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0 20px;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
}

.profile_wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.photo_name_box {
  align-self: center;
  display: flex;
  justify-content: space-around;
  gap: 70px;
  margin-bottom: 20px;
}

.profile {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.image-upload {
  position: relative;
  cursor: pointer;
}

.image-upload input {
  display: none;
}

.profile-img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
}

.camera-icon {
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: var(--gray300);
  padding: 10px;
  border-radius: 50%;
  display: grid;
  place-content: center;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.name-text {
  width: 150px;
  font-size:16px;
  font-weight: bold;
  border-bottom: 1px solid var(--gray600);
  padding: 0 10px 5px;
}

.name-input {
  width: 150px;
  font-size: 16px;
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
  margin: 0 60px 30px;
}

.input-group label {
  font-size: 16px;
  margin-bottom: 10px;
}

.email-input {
  font-size: 16px;
  padding: 8px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  cursor: not-allowed;
  color: var(--gray700);
}

.password-btn {
  width: 110px;
  background: var(--main-color-brown);
  border: none;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 30px;
  transition: all .3s;
  white-space: nowrap;
}
.password-btn:hover {
  background: var(--main-color-hover);
}
.delete-link {
  color: red;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
}

.delete-link:hover {
  text-decoration: underline;
}

.save-image-btn {
  color: var(--main-color-brown);
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid var(--main-color-brown);
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.3s;
  white-space: nowrap;
}
.save-image-btn:hover {
  background: var(--main-color-light);
}
</style>
