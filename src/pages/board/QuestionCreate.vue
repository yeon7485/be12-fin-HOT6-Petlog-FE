<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import PetCardModal from "/src/pages/board/components/PetCardModal.vue";
import PetCardListModal from "/src/pages/board/components/PetCardListModal.vue";
import { useUserStore } from "/src/stores/useUserStore";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const store = useQuestionStore();

const removedImageUrls = ref([]);
const previewImageUrls = ref([]);
const questionIdx = route.params.idx ? Number(route.params.idx) : null;
const isEdit = computed(() => !!questionIdx);

const isModalOpen = ref(false);
const form = ref({
  qTitle: "",
  content: "",
  tags: "",
  file: null,
  image: "",
});
const selectedPets = ref([]);

onMounted(async () => {
  if (!userStore.isLogin) {
    alert("로그인 후 이용해주세요.");
    router.push("/user/login");
    return;
  }

  if (isEdit.value) {
    const data = await store.readQuestion(questionIdx);
    form.value.qTitle = data.qTitle;
    form.value.content = data.content;
    form.value.tags = data.tags.join(", ");
    form.value.image = data.image || "";
    selectedPets.value = data.petList || [];
    
    if (data.imageUrls && data.imageUrls.length > 0) {
      previewImageUrls.value = [...data.imageUrls];
    }
  }
});

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  form.value.file = files.length ? files : null;
  previewImageUrls.value = [];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageUrls.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const handleCancel = () => {
  if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
    router.go(-1);
  }
};

const handleSubmit = async () => {
  if (
    !window.confirm(
      isEdit.value ? "질문을 수정하시겠습니까?" : "질문을 등록하시겠습니까?"
    )
  )
    return;

  const tagsArray = form.value.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const questionData = {
    qTitle: form.value.qTitle,
    content: form.value.content,
    tags: tagsArray,
    image: form.value.image || "",
    selected: false,
    file: form.value.file,
    petIdxList: selectedPets.value.map((p) => p.idx),
    removedImageUrls: removedImageUrls.value,
  };

  try {
    if (isEdit.value) {
      await store.updateQuestion(questionIdx, questionData);
      alert("질문이 수정되었습니다.");
      router.push(`/board/qna/${questionIdx}`);
    } else {
      await store.createQuestion(questionData);
      await store.fetchQuestions();
      alert("질문이 등록되었습니다.");
      router.push("/board/qna");
    }
  } catch (err) {
    alert(isEdit.value ? "수정 실패하였습니다." : "등록 실패하였습니다.");
    console.error(err);
  }
};

const removeImage = (index) => {
  const removed = previewImageUrls.value.splice(index, 1)[0];

  if (removed?.startsWith("http")) {
    removedImageUrls.value.push(removed); 
  }

  if (form.value.file) {
    form.value.file.splice(index, 1);
  }
};

const selectPetCard = () => {
  isModalOpen.value = true;
};
const handleSelectPet = (pet) => {
  if (!selectedPets.value.find((p) => p.idx === pet.idx)) {
    selectedPets.value.push(pet);
  }
  isModalOpen.value = false;
};
const removePet = (idx) => {
  selectedPets.value = selectedPets.value.filter((p) => p.idx !== idx);
};
</script>

<template>
  <div class="qna_container">
    <h1 class="title">질문 {{ isEdit ? "수정" : "등록" }}</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_group">
        <label>제목</label>
        <input
          type="text"
          v-model="form.qTitle"
          placeholder="제목을 입력해주세요."
          required
        />
      </div>

      <div class="form_group">
        <label>내용</label>
        <textarea
          v-model="form.content"
          placeholder="내용을 입력해주세요."
          rows="10"
          required
        />
      </div>

      <div class="form_group">
        <label>해시태그</label>
        <input
          type="text"
          v-model="form.tags"
          placeholder="예) 강아지, 고양이 중성화"
        />
      </div>

      <div class="form_group">
        <label>사진 등록</label>
        <div v-if="previewImageUrls.length" class="image-preview-wrapper">
          <div
            v-for="(img, index) in previewImageUrls"
            :key="index"
            class="image-container"
          >
            <img :src="img" class="preview-image" />
            <img
              src="/src/assets/icons/delete.png"
              alt="삭제"
              class="remove-icon"
              @click="removeImage(index)"
            />
          </div>
        </div>
        <input type="file" multiple @change="handleFileChange" />
      </div>

      <div class="form_group">
        <label>반려동물 카드 등록</label>
        <button type="button" class="petcard_btn" @click="selectPetCard">
          카드 선택
        </button>
      </div>

      <div v-if="selectedPets.length > 0" class="selected-pet-preview">
        <label>선택된 반려동물</label>
        <div class="pet-preview-list">
          <div
            v-for="pet in selectedPets"
            :key="pet.idx"
            class="pet-preview-item"
          >
            <PetCardModal
              :pet="{
                ...pet,
                image: pet.profileImageUrl || '/default-profile.png',
              }"
            />
            <img
              src="/src/assets/icons/delete.png"
              alt="삭제"
              class="remove-icon"
              @click="removePet(pet.idx)"
            />
          </div>
        </div>
      </div>

      <PetCardListModal
        v-if="isModalOpen"
        @close="isModalOpen = false"
        @select="handleSelectPet"
      />

      <div class="form_actions">
        <button type="button" class="cancel_button" @click="handleCancel">
          취소
        </button>
        <button type="submit" class="submit_button">
          {{ isEdit ? "수정" : "등록" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.qna_container {
  max-width: 1200px;
  margin: 0 auto 40px auto;
  padding: 40px;
  font-family: "Arial", sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.title {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
}

.form_group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 13px;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  width: 100%;
  padding: 6px 0;
  border: none;
  background-color: transparent;
}

textarea {
  resize: vertical;
}

.form_actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

button {
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.cancel_button {
  background-color: #fff;
  color: #a14f4f;
  border: 1px solid #a14f4f;
}

.submit_button {
  background-color: #6a0104;
  color: #fff;
  border: none;
}

.submit_button:hover {
  background: #8b0000;
}

.petcard_btn {
  padding: 4px 10px;
  font-size: 14px;
  width: 90px;
  border: 1px solid #ccc;
  background-color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.petcard_btn:hover {
  background-color: #f5f5f5;
}

.pet-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pet-preview-item {
  position: relative;
  display: inline-block;
}

.image-preview-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: none;                
  border-radius: 6px;
  box-shadow: none;           
  background: transparent;     
  outline: none;               
}

.remove-icon {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
