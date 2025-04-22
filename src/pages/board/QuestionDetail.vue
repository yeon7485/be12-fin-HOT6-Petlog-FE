<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "/src/stores/useAnswerStore";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import { useUserStore } from "/src/stores/useUserStore";
import AnswerCard from "/src/pages/board/components/AnswerCard.vue";
import PetCard from "/src/pages/board/components/PetCardModal.vue";
import PetCardDetail from "/src/pages/board/components/PetCardDetailModal.vue";

const router = useRouter();
const route = useRoute();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const userStore = useUserStore();

const question = ref(null);
const selectedPetId = ref(null);
const isPetModalOpen = ref(false);
const questionIdx = Number(route.params.idx);

const openPetModal = (id) => {
  selectedPetId.value = id;
  isPetModalOpen.value = true;
};

const hasSelectedAnswer = computed(() =>
  answerStore.answers.some((a) => a.selected)
);

const isOwner = computed(
  () =>
    userStore.isLogin &&
    userStore.nickname &&
    question.value?.writer === userStore.nickname
);

const aiAnswer = computed(() =>
  answerStore.answers.find((a) => a.userType === "AI")
);

const userAnswers = computed(() =>
  answerStore.answers.filter((a) => a.userType !== "AI")
);

const answerCount = computed(() => userAnswers.value.length);

onMounted(async () => {
  try {
    question.value = await questionStore.readQuestion(questionIdx);
    await answerStore.fetchAnswersByQuestionId(questionIdx);
  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
  }
});

const handleDelete = async () => {
  if (!window.confirm("질문을 삭제하시겠습니까?")) return;
  try {
    await questionStore.deleteQuestion(questionIdx);
    alert("질문이 삭제되었습니다.");
    router.push("/board/qna");
  } catch (err) {
    alert("삭제 중 오류 발생");
    console.error(err);
  }
};

const handleSelectAnswer = async (answerId) => {
  if (!window.confirm("헤당 답변을 채택하시겠습니까?")) return;
  try {
    await answerStore.selectAnswer(answerId);
    await answerStore.fetchAnswersByQuestionId(questionIdx);
    await questionStore.refreshQuestionStatus(questionIdx);
    alert("채택이 완료되었습니다.");
  } catch (err) {
    alert("채택 실패");
    console.error(err);
  }
};

const confirmDeleteAnswer = async (answerIdx) => {
  if (!window.confirm("정말 답변을 삭제하시겠습니까?")) return;
  try {
    await answerStore.deleteAnswer(answerIdx, questionIdx);
    alert("답변이 삭제되었습니다.");
  } catch (err) {
    alert("답변 삭제 실패");
    console.error(err);
  }
};

const goToModifyAnswer = (answerId) => {
  router.push(`/board/qna/${questionIdx}/answer/${answerId}/modify`);
};

const goToModify = () => {
  questionStore.setSelectedQuestion(question.value); 
  router.push(`/board/qna/${questionIdx}/modify`);
};

const goToRegister = () => {
  questionStore.setSelectedQuestion(question.value); 
  router.push(`/board/qna/${question.value.idx}/answer/create`);
};
</script>

<template>
  <div class="wrapper" v-if="question">
    <div class="post_box">
      <router-link to="/board/qna" class="list_button">목록으로</router-link>

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
            :src="question.profileImageUrl || '/src/assets/images/default.png'"
            alt="작성자 프로필"
          />
          <span class="nickname">{{ question.writer }}</span>
          <span class="divider">ㅣ</span>
          <span class="date">{{ question.createdAt }}</span>
        </div>

        <div class="icons" v-if="isOwner">
          <img
            v-if="!hasSelectedAnswer"
            src="/src/assets/icons/write.png"
            class="icon_btn"
            alt="수정 아이콘"
            @click="goToModify"
          />
          <img
            src="/src/assets/icons/x-button.png"
            class="icon_btn"
            alt="삭제 아이콘"
            @click="handleDelete"
          />
        </div>
      </div>

      <hr class="divider_line" />

      <div class="content_area">
        <div
          v-if="question.imageUrls && question.imageUrls.length"
          class="image_gallery"
        >
          <img
            v-for="(url, index) in question.imageUrls"
            :key="index"
            class="dog_img"
            :src="url"
            alt="질문 첨부 이미지"
          />
        </div>

        <p class="description">{{ question.content }}</p>
        <hr class="pet_section_divider" />

        <div v-if="question.petList?.length">
          <h2 class="card">&lt;반려동물 카드&gt;</h2>

          <div class="pet_card_section">
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

        <PetCardDetail
          v-if="isPetModalOpen"
          :pet-id="selectedPetId"
          @close="isPetModalOpen = false"
        />

        <div class="hashtags">
          <span v-for="tag in question.tags" :key="tag" class="tag"
            ># {{ tag }}</span
          >
        </div>
      </div>

      <div
        class="action_area"
        v-if="
          !hasSelectedAnswer &&
          userStore.isLogin &&
          userStore.nickname !== question.writer
        "
      >
        <button class="reply_btn" @click="goToRegister">답변하기</button>
      </div>
    </div>

    <div class="ai_link_bridge">
      <img
        src="/src/assets/icons/connect.png"
        alt="AI 연결 아이콘"
        class="bridge_icon"
      />
    </div>

    <!-- AI 답변 영역 -->
    <div v-if="aiAnswer" class="ai_answer_v2">
      <div class="ai_header_v2">
        <img
          class="ai_icon_img"
          src="/src/assets/icons/Ai.png"
          alt="전구 아이콘"
        />
        <div class="ai_title_v2">AI 우선 답변 - 제가 먼저 도와드릴게요!</div>
      </div>

      <div class="ai_card">
        <div class="ai_card_header">
          <div class="ai_card_left">
            <img
              class="ai_profile_img"
              src="/src/assets/icons/petbot.png"
              alt="ChatGPS 프로필"
            />
            <span class="ai_card_name">petbot</span>
            <span class="divider">ㅣ</span>
            <span class="ai_card_date">{{ aiAnswer.createdAt }}</span>
          </div>
        </div>

        <div class="ai_card_body">
          <pre style="white-space: pre-wrap; font-family: inherit">{{
            aiAnswer.content
          }}</pre>
        </div>
      </div>
    </div>

    <div class="answer_wrapper">
      <div class="answer_count" v-if="answerStore.answers.length > 0">
        <img
          src="/src/assets/icons/answer.png"
          class="answer_icon"
          alt="답변 아이콘"
        />
        {{ answerCount }}개 답변
      </div>

      <AnswerCard
        v-for="answer in userAnswers"
        :key="answer.idx"
        :answer="answer"
        :question-idx="questionIdx"
        @select="handleSelectAnswer"
        @modify="goToModifyAnswer"
        @delete="(id) => confirmDeleteAnswer(id)"
        @selected="handleSelectedAnswer"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
}

.post_box {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.list_button {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 16px;
  color: #666;
  text-decoration: none;
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.list_button:hover {
  background: #e0e0e0;
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  animation: fadeIn 1s ease-out forwards;
}

.icon_img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  animation: pulse 2s infinite ease-in-out;
}

.user_info_line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
}
.profile_img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.date {
  color: #888;
  font-size: 13px;
}
.divider {
  margin: 0 6px;
  color: #999;
}
.icons {
  display: flex;
  gap: 10px;
}
.icon_btn {
  width: 16px;
  height: 16px;
  cursor: pointer;
  animation: pulse 2s infinite ease-in-out;
}

.divider_line {
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 20px;
}

.content_area {
  margin-bottom: 20px;
}
.image_gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.dog_img {
  width: 200px;
  height: auto;
  object-fit: contain;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}
.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
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

.hashtags {
  margin-top: 10px;
}
.tag {
  font-size: 13px;
  color: #666;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 2px 8px;
  margin-right: 6px;
  margin-bottom: 4px;
  display: inline-block;
}

.action_area {
  display: flex;
  justify-content: flex-end;
}

.reply_btn {
  background: #6a0104;
  color: #fff;
  border: 1px solid #800000;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
}
.reply_btn:hover {
  background: #8b0000;
  animation: scaleUp 0.3s ease-in-out forwards;
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

.ai_answer_v2 {
  padding: 30px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.ai_answer_v2:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.ai_header_v2 {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
}
.ai_icon_img {
  width: 40px;
  height: 40px;
  animation: pulse 2s infinite ease-in-out;
}

.ai_card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 20px;
  position: relative;
}
.ai_card::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 24px;
  width: 16px;
  height: 16px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
}
.ai_card_header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  margin-bottom: 14px;
}
.ai_card_left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ai_profile_img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  animation: petbot-bounce 2s infinite;
}
.ai_card_name {
  font-weight: bold;
  font-size: 15px;
  color: #333;
}
.ai_card_body {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
  white-space: pre-wrap;
  font-family: "Noto Sans KR", sans-serif;
}

.answer_wrapper {
  margin-top: 40px;
}
.answer_count {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}
.answer_icon {
  width: 50px;
  height: 50px;
  margin-right: 18px;
  animation: pulse 2s infinite ease-in-out;
}

.pet_section_divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 30px 0 20px;
  opacity: 0.6;
}

.card {
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 20px;
  color: #333;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes petbot-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>

