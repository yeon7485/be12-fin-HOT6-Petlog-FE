<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePetStore } from "../../stores/usePetStore";

const router = useRouter();
const petStore = usePetStore();

function getSessionUserIdx() {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.idx;
  }
  return null;
}

const statuses = ["HEALTHY", "LOST", "ABANDONED", "DECEASED"];
const card = ref({
  id: "",
  name: "",
  breed: "",
  gender: "",
  birthDate: "",
  isNeutering: false,
  specificInformation: "",
  status: "HEALTHY",
  userId: "",
});

const selectedFile = ref(null);
const profileImage = ref("");
const fileInput = ref(null);

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

onMounted(async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert("로그인 정보가 없습니다.");
    router.push("/user/login");
    return;
  }

  try {
    const petId = router.currentRoute.value.params.petId;
    await petStore.fetchPetById(petId);

    card.value = {
      id: petStore.petDetail.id,
      name: petStore.petDetail.name,
      breed: petStore.petDetail.breed,
      gender: petStore.petDetail.gender,
      birthDate: petStore.petDetail.birthDate,
      isNeutering: petStore.petDetail.isNeutering,
      specificInformation: petStore.petDetail.specificInformation,
      status: petStore.petDetail.status,
      userId: userId,
    };

    profileImage.value = petStore.petDetail.profileImageUrl;
  } catch (err) {
    console.error("불러오기 실패:", err);
  }
});

const saveCard = async () => {
  try {
    const formData = new FormData();

    // ✅ JSON 데이터를 Blob으로 감싸 'pet'이라는 키로 추가
    formData.append(
      "pet",
      new Blob([JSON.stringify(card.value)], {
        type: "application/json",
      })
    );

    // ✅ 이미지가 있다면 같이 추가
    if (selectedFile.value) {
      formData.append("profileImage", selectedFile.value);
    }

    await petStore.updatePet(card.value.id, formData);
    alert("카드가 성공적으로 수정되었습니다!");
    router.push("/mypage/cardlist");
  } catch (err) {
    console.error("[❌ 수정 중 오류 발생]", err);
    alert("수정 중 오류가 발생했습니다.");
  }
};

const goToCardList = () => {
  router.push("/mypage/cardlist");
};
</script>

<template>
  <h1 class="title">반려동물 정보 수정</h1>
  <div class="form-container">
    <div class="profile-section">
      <img :src="profileImage" class="profile-img" />
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="uploadImage"
        hidden
      />
      <button class="upload-btn" @click="triggerFileInput">📷</button>
    </div>

    <input v-model="card.name" placeholder="이름" class="input" />

    <div class="gender-section">
      <label
        ><input type="radio" value="male" v-model="card.gender" /> ♂️</label
      >
      <label
        ><input type="radio" value="female" v-model="card.gender" /> ♀️</label
      >
      <label
        ><input type="checkbox" v-model="card.isNeutering" /> 중성화 유무</label
      >
    </div>

    <div class="birthdate-section">
      <input type="date" v-model="card.birthDate" />
    </div>

    <input v-model="card.breed" placeholder="품종" class="input" />

    <textarea
      v-model="card.specificInformation"
      placeholder="특이사항"
      class="textarea"
    />

    <div class="status-section">
      <label v-for="s in statuses" :key="s" class="status-option">
        <input type="radio" :value="s" v-model="card.status" />
        {{ s }}
      </label>
    </div>

    <div class="button-group">
      <button @click="goToCardList" class="cancel-btn">취소</button>
      <button @click="saveCard" class="save-btn">저장</button>
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
  margin: 0 auto 10px;
}

.upload-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  display: block;
  margin: 0 auto 15px;
}

.input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  color: #000;
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 8px 0;
  resize: none;
  background-color: white;
  color: #000;
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

.birthdate-section {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  color: #000;
}
</style>
