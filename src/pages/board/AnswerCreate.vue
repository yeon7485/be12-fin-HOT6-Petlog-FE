<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "/src/stores/useAnswerStore";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import PetCard from "/src/pages/board/components/PetCardModal.vue";
import PetCardDetail from "/src/pages/board/components/PetCardDetailModal.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const answerStore = useAnswerStore();
const questionStore = useQuestionStore();

const answerId = Number(route.params.idx);
const questionId = Number(route.params.questionId);
const isEdit = !isNaN(answerId) && answerId > 0;

const content = ref("");
const files = ref([]);
const previewImages = ref([]);
const originalImageUrls = ref([]);
const question = ref(null);

const selectedPetId = ref(null);
const isPetModalOpen = ref(false);

const openPetModal = (id) => {
  selectedPetId.value = id;
  isPetModalOpen.value = true;
};

onMounted(async () => {
  if (questionStore.selectedQuestion) {
    question.value = questionStore.selectedQuestion;
  } else {
    question.value = await questionStore.readQuestion(questionId);
  }

  if (isEdit) {
    const target = await answerStore.getAnswerByIdFromServer(answerId);
    if (target) {
      content.value = target.content;
      originalImageUrls.value = target.imageUrls || [];
      previewImages.value = [...target.imageUrls];
    }
  }
});

const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  files.value = selectedFiles;
  previewImages.value = [];

  selectedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const removePreviewImage = (index) => {
  const removedUrl = previewImages.value[index];

  previewImages.value.splice(index, 1);

  if (files.value[index]) {
    files.value.splice(index, 1);
  }

  const originIdx = originalImageUrls.value.indexOf(removedUrl);
  if (originIdx !== -1) {
    originalImageUrls.value.splice(originIdx, 1);
  }
};

const handleCancel = () => {
  if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
    router.push(`/board/qna/${questionId}`);
  }
};

const handleSubmit = async () => {
  const confirmed = window.confirm(isEdit ? '답변을 수정하시겠습니까?' : '답변을 등록하시겠습니까?');
  if (!confirmed) return;

  try {
    const formData = new FormData();
    const answerData = {
      content: content.value,
      originalImageUrls: originalImageUrls.value, 
    };
    const jsonBlob = new Blob([JSON.stringify(answerData)], {
      type: "application/json",
    });
    formData.append("answer", jsonBlob);

    files.value.forEach((file) => {
      formData.append("images", file);
    });

    if (isEdit) {
      await axios.put(`/api/answer/update/${answerId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert('답변이 수정되었습니다.');
    } else {
      await answerStore.registerAnswer(question.value.idx, content.value, files.value);
      alert('답변이 등록되었습니다.');
    }

    router.push(`/board/qna/${questionId}`);
  } catch (err) {
    alert(isEdit ? '답변 수정에 실패하였습니다.' : '답변 등록에 실패하였습니다.');
    console.error(err);
  }
};

</script>

<template>
  <div>
    <div v-if="question" class="container">
      <div class="post_box">
        <div class="post_title">
          <img
            class="icon_img"
            src="/src/assets/icons/question.png"
            alt="질문 아이콘"
          />
          <span class="text">{{ question.qTitle }}</span>
        </div>

        <div class="user_info_line">
          <div class="user_info">
            <img
              class="profile_img"
              :src="
                question.profileImageUrl || '/src/assets/images/default.png'
              "
              alt="프로필 이미지"
            />
            <span class="nickname">{{ question.writer }}</span>
            <span class="divider">ㅣ</span>
            <span class="date">{{ question.createdAt }}</span>
          </div>
        </div>

        <hr class="divider_line" />

        <div class="content_area">
          <div
            v-if="question.imageUrls && question.imageUrls.length"
            class="image_preview_area"
          >
            <img
              v-for="(img, index) in question.imageUrls"
              :key="index"
              :src="img"
              alt="질문 이미지"
              class="question_img"
            />
          </div>

          <p class="description">{{ question.content }}</p>

          <div class="hashtags">
            <span v-for="tag in question.tags" :key="tag"># {{ tag }}</span>
          </div>

          <div
            v-if="question.petList?.length"
            class="pet_card_section"
            style="margin-top: 20px"
          >
            <h2 class="card">&lt;반려동물 카드&gt;</h2>
            <div class="pet_card_list">
              <PetCard
                v-for="pet in question.petList"
                :key="pet.idx"
                :pet="{
                  ...pet,
                  image: pet.profileImageUrl || '/default-profile.png',
                }"
                @click="() => openPetModal(pet.idx)"
              />
            </div>
          </div>
        </div>
      </div>

      <PetCardDetail
        v-if="isPetModalOpen"
        :pet-id="selectedPetId"
        @close="isPetModalOpen = false"
      />

      <div class="ai_link_bridge">
        <img
          src="/src/assets/icons/connect.png"
          alt="AI 연결 아이콘"
          class="bridge_icon"
        />
      </div>

      <div class="answer_form">
        <div class="form_box">
          <img
            class="answer_icon"
            src="/src/assets/icons/answerRegister.png"
            alt="답변 아이콘"
          />

          <textarea
            class="textarea"
            placeholder="내용을 입력해주세요."
            v-model="content"
          ></textarea>

          <div class="file_area">
            <label class="file_label" for="fileInput">사진 등록</label>
            <input
              id="fileInput"
              type="file"
              class="file_input"
              multiple
              @change="handleFileChange"
            />
            <div
              v-if="previewImages.length > 0"
              class="image_preview_area"
              style="margin-top: 10px"
            >
              <div
                v-for="(img, index) in previewImages"
                :key="index"
                style="position: relative; display: inline-block"
              >
                <img :src="img" alt="미리보기 이미지" class="preview_img" />
                <img
                  src="/src/assets/icons/delete.png"
                  alt="삭제"
                  class="remove-icon"
                  style="
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                  "
                  @click="removePreviewImage(index)"
                />
              </div>
            </div>
          </div>

          <div class="btn_area">
            <button class="btn cancel" @click="handleCancel">
              {{ isEdit ? "수정 취소" : "취소" }}
            </button>
            <button class="btn submit" @click="handleSubmit">
              {{ isEdit ? "수정 완료" : "답변 등록" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">질문 정보를 불러오는 중입니다...</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 10px auto 0 auto;
}

.post_box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}
.icon_img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.user_info_line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
}
.profile_img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.divider {
  margin: 0 6px;
  color: #aaa;
}
.date {
  color: #888;
  font-size: 13px;
}
.divider_line {
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
}
.content_area {
  margin-top: 20px;
}
.image_preview_area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.question_img {
  width: 120px;
  height: auto;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.description {
  font-size: 16px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 16px;
}
.hashtags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hashtags span {
  font-size: 14px;
  color: #666;
}

.link {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.link_icon {
  width: 48px;
  height: auto;
  opacity: 0.5;
}

.answer_form {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.form_box {
  display: flex;
  flex-direction: column;
}

.answer_icon {
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
}

.textarea {
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  margin-bottom: 20px;
  color: #333;
  box-sizing: border-box;
}

.file_area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  margin-bottom: 20px;
}

.file_label {
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.file_input {
  font-size: 14px;
}

.preview_img {
  margin-top: 10px;
  width: 120px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn_area {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  min-width: 80px;
}

.btn.cancel {
  background: #fff;
  color: #800000;
  border: 1px solid #800000;
}

.btn.submit {
  background: #6a0104;
  color: #fff;
  border: 1px solid #800000;
}

.btn.submit:hover {
  background: #8b0000;
}

.image_container {
  position: relative;
  display: inline-block;
}

.preview_img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.remove_icon {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.ai_link_bridge {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.bridge_icon {
  width: 40px;
}

.pet_card_section {
  margin-top: 20px;
}

.pet_card_list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.card {
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 20px;
  color: #333;
}

.pet_card_section {
  margin-top: 30px;
}
.pet_card_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
</style>
