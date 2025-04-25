<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "/src/stores/useBoardStore";
import { useUserStore } from "/src/stores/useUserStore";
import { useCategoryStore } from "/src/stores/useCategoryStore";
import PetCardModal from "/src/pages/board/components/PetCardModal.vue";
import PetCardListModal from "/src/pages/board/components/PetCardListModal.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const postIdx = route.params.idx ? Number(route.params.idx) : null;
const boardTypeFromRoute = route.params.boardType || "";
const isEdit = !!postIdx;

const boardTypes = [
  { value: "free", label: "자유 게시판" },
  { value: "information", label: "정보 공유" },
];

const categories = computed(() =>
  categoryStore.boardCategories.map((c) => c.name)
);

const removePet = (idx) => {
  selectedPets.value = selectedPets.value.filter((p) => p.idx !== idx);
};

const form = ref({
  boardType: boardTypeFromRoute || "",
  category: "",
  title: "",
  content: "",
  images: [],
  writer: "",
  removedImageUrls: [],
});

const removeImage = (index) => {
  const removed = previewImages.value.splice(index, 1)[0];

  if (typeof removed === "string" && removed.startsWith("http")) {
    form.value.removedImageUrls.push(removed);
  }

  form.value.images.splice(index, 1);
};

const previewImages = ref([]);
const selectedPets = ref([]);
const isModalOpen = ref(false);

onMounted(async () => {
  if (!userStore.isLogin) {
    alert("로그인 후 이용해주세요.");
    router.push("/user/login");
    return;
  }

  form.value.writer = userStore.nickname;
  await categoryStore.fetchCategories("BOARD");

  if (isEdit) {
    await boardStore.fetchPosts(boardTypeFromRoute);
    const target = boardStore.posts.find((p) => p.idx === postIdx);
    if (target) {
      form.value.boardType = target.boardType || boardTypeFromRoute;
      form.value.category = target.category || "";
      form.value.title = target.title || "";
      form.value.content = target.content || "";

      if (target.imageUrls?.length) {
        previewImages.value = [...target.imageUrls];
      }

      if (target.petList?.length) {
        selectedPets.value = [...target.petList];
      }
    }
  }
});

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  form.value.images = files;
  previewImages.value = [];
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const handleCancel = () => {
  const confirmed = window.confirm("작성을 취소하시겠습니까?");
  if (confirmed) {
    const path = isEdit
      ? `/board/${form.value.boardType}/post/${postIdx}`
      : `/board/${form.value.boardType}`;
    router.push(path);
  }
};

const handleSubmit = async () => {
  const trimmedTitle = form.value.title.trim();
  const trimmedContent = form.value.content.trim();

  if (!trimmedTitle && !trimmedContent) {
    alert("제목은 필수 입력사항 입니다.");
    return;
  }

  if (!trimmedTitle) {
    alert("제목은 필수 입력사항 입니다.");
    return;
  }

  if (!trimmedContent) {
    alert("내용을 입력해주세요.");
    return;
  }

  const confirmed = window.confirm(
    isEdit ? "수정하시겠습니까?" : "등록하시겠습니까?"
  );
  if (!confirmed) return;

  try {
    const formData = new FormData();

    if (form.value.images.length > 0) {
      form.value.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const selectedCategory = categoryStore.boardCategories.find(
      (cat) => cat.name === form.value.category
    );

    const postPayload = {
      writer: form.value.writer,
      title: form.value.title,
      content: form.value.content,
      categoryIdx: selectedCategory?.idx,
      boardType: form.value.boardType,
      image: form.value.images[0]?.name || "",
      petIdxList: selectedPets.value.map((p) => p.idx),
    };

    formData.append(
      "post",
      new Blob(
        [
          JSON.stringify({
            ...postPayload,
            removedImageUrls: form.value.removedImageUrls,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (isEdit) {
      await axios.put(`/api/post/update/${postIdx}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("수정이 완료되었습니다");
      router.push(`/board/${form.value.boardType}/post/${postIdx}`);
    } else {
      await axios.post("/api/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("등록이 완료되었습니다");
      router.push(`/board/${form.value.boardType}`);
    }
  } catch (err) {
    const res = err?.response?.data;
    const code = res?.code;

    if (code === 6006) {
      alert("제목은 필수 입력 항목입니다.");
    } else if (code === 6007) {
      alert("내용은 필수 입력 항목입니다.");
    } else {
      alert("작업에 실패하였습니다.");
    }

    console.error("요청 실패:", err);
  }
};



const openPetCardModal = () => {
  isModalOpen.value = true;
};

const selectPetCard = (pet) => {
  const alreadySelected = selectedPets.value.find((p) => p.idx === pet.idx);
  if (!alreadySelected) {
    selectedPets.value.push(pet);
  }
  isModalOpen.value = false;
};
</script>

<template>
  <div class="container">
    <div class="board_select">
      <label class="section_title">게시판 선택</label>
      <div class="radio_group">
        <label
          v-for="item in boardTypes"
          :key="item.value"
          class="radio_option"
        >
          <input
            type="radio"
            :value="item.value"
            v-model="form.boardType"
            name="boardType"
            :disabled="isEdit"
          />
          {{ item.label }}
        </label>
      </div>
    </div>

    <div class="form_group">
      <label>카테고리</label>
      <select v-model="form.category">
        <option disabled value="">카테고리를 선택하세요.</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="form_group">
      <label>제목</label>
      <input
        type="text"
        v-model="form.title"
        placeholder="제목을 입력해주세요."
      />
    </div>

    <div class="form_group">
      <label>내용</label>
      <textarea
        v-model="form.content"
        placeholder="내용을 입력해주세요."
        rows="8"
      />
    </div>

    <div class="form_group">
      <label>사진 등록</label>
      <input type="file" multiple @change="handleFileChange" />
      <div v-if="previewImages.length > 0" class="image_preview">
        <div
          v-for="(img, index) in previewImages"
          :key="index"
          class="image-container"
        >
          <img :src="img" class="preview" />
          <img
            src="/src/assets/icons/delete.png"
            alt="삭제"
            class="remove-icon"
            @click="removeImage(index)"
          />
        </div>
      </div>
    </div>

    <div class="form_group">
      <label>반려동물 카드 등록</label>
      <button @click="openPetCardModal" class="petcard_btn">카드 선택</button>
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
      @select="selectPetCard"
    />

    <div class="actions">
      <button @click="handleCancel" class="cancel">취소</button>
      <button @click="handleSubmit" class="submit">
        {{ isEdit ? "수정" : "등록" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto 40px auto;
  padding: 40px;
  font-family: sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.section_title {
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 40px;
  display: block;
}

.board_select {
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
}

.radio_group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.radio_option {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.form_group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form_group label {
  margin-bottom: 13px; 
  font-weight: bold;   
  font-size: 15px;
}

select,
input[type="text"],
textarea {
  border: 1px solid #ccc;
  padding: 14px;
  border-radius: 4px;
  font-size: 15px;
}

select {
  width: 40%;
}

input[type="file"] {
  margin-top: 8px;
}

.image_preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-container {
  position: relative;
  display: inline-block;
}

.preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.remove-icon {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.pet-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.selected-pet-preview {
  margin-top: 20px;
}

.selected-pet-preview label {
  font-weight: bold;
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  color: #4e342e;
}

.pet-preview-item {
  position: relative;
  display: inline-block;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.cancel {
  background-color: white;
  color: #963a3a;
  border: 1px solid #963a3a;
}

.cancel:hover {
  background-color: #963a3a;
  color: white;
}

.submit {
  background-color: #6a0104;
  color: white;
  border: none;
}

.submit:hover {
  background-color: #7a2b2b;
  color: white;
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
</style>
