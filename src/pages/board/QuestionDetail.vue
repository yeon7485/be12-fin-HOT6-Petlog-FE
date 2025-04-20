<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAnswerStore } from "/src/stores/useAnswerStore";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import { useUserStore } from "/src/stores/useUserStore";
import AnswerCard from "/src/pages/board/components/AnswerCard.vue";

const router = useRouter();
const route = useRoute();

const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const userStore = useUserStore();

const question = ref(null);
const questionIdx = Number(route.params.idx);

const hasSelectedAnswer = computed(() =>
  answerStore.answers.some((a) => a.selected)
);

const isOwner = computed(() => {
  return (
    userStore.isLogin &&
    userStore.nickname &&
    question.value?.writer &&
    question.value.writer === userStore.nickname
  );
});

// ✅ AI 답변 따로 추출
const aiAnswer = computed(() =>
  answerStore.answers.find((a) => a.userType === "AI")
);

// ✅ 일반 유저 답변만 추출
const userAnswers = computed(() =>
  answerStore.answers.filter((a) => a.userType !== "AI")
);

const answerCount = computed(() => userAnswers.value.length);

onMounted(async () => {
  try {
    question.value = await questionStore.readQuestion(questionIdx);
    await answerStore.fetchAnswersByQuestionId(questionIdx);
    console.log("📦 전체 답변 리스트", answerStore.answers);
  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
  }
});

const handleDelete = async () => {
  if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
  try {
    await questionStore.deleteQuestion(questionIdx);
    alert("게시글이 삭제되었습니다.");
    router.push("/board/qna");
  } catch (err) {
    alert("삭제 중 오류 발생");
    console.error(err);
  }
};

const handleSelectAnswer = async (answerId) => {
  if (!window.confirm("채택하시겠습니까?")) return;
  try {
    await answerStore.selectAnswer(answerId);
    await answerStore.fetchAnswersByQuestionId(questionIdx);
    await questionStore.refreshQuestionStatus(questionIdx);
    alert("채택 완료");
  } catch (err) {
    alert("채택 실패");
    console.error(err);
  }
};

const handleSelectedAnswer = () => {
  router.push("/board/qna");
};

const confirmDeleteAnswer = async (answerId) => {
  if (!window.confirm("정말 답변을 삭제하시겠습니까?")) return;
  try {
    await answerStore.deleteAnswer(answerId);
    await answerStore.fetchAnswersByQuestionId(questionIdx);
    alert("답변 삭제 완료");
  } catch (err) {
    alert("답변 삭제 실패");
    console.error(err);
  }
};

const goToModifyAnswer = (answerId) => {
  router.push(`/board/qna/${questionIdx}/answer/${answerId}/modify`);
};

const goToModify = () => {
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
        <div v-if="question.imageUrls && question.imageUrls.length">
          <img
            v-for="(url, index) in question.imageUrls"
            :key="index"
            class="dog_img"
            :src="url"
            alt="질문 첨부 이미지"
          />
        </div>
        <p class="description">{{ question.content }}</p>
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
  position: relative;
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
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.list_button:hover {
  background: #e0e0e0;
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 16px;
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}

.icon_img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.nickname {
  font-weight: 600;
  color: #333;
}

.divider {
  margin: 0 2px;
  color: #999;
}

.date,
.ai_card_date {
  color: #888;
  font-size: 13px;
}

.icons {
  display: flex;
  gap: 15px;
}

.icon_btn {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.divider_line {
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 20px;
}

.content_area {
  margin-bottom: 20px;
}

.dog_img {
  width: 260px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.hashtags span {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
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
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
.reply_btn:hover {
  background: #8b0000;
}

.ai_link_bridge {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.bridge_icon {
  width: 48px;
  height: auto;
  max-height: 48px;
  object-fit: contain;
  background: transparent;
  border: none;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.ai_answer_v2 {
  margin-top: 0;
  padding: 36px 36px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.ai_answer_v2:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
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
  width: 46px;
  height: 46px;
}

.ai_card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  position: relative;
  transition: all 0.3s ease;
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
.ai_card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
}

.ai_card_header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  margin-bottom: 14px;
  align-items: center;
}
.ai_card_left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ai_profile_img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: petbot-bounce 2s infinite;
}
@keyframes petbot-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.reply_btn:hover,
.list_button:hover {
  animation: scaleUp 0.3s ease-in-out forwards;
}

.ai_icon_img,
.icon_img,
.icon_btn,
.answer_icon {
  animation: pulse 2s infinite ease-in-out;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
}
</style>
