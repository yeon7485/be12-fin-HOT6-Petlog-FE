<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnswerStore } from '/src/stores/useAnswerStore'
import { useQuestionStore } from '/src/stores/useQuestionStore'
import { useUserStore } from '/src/stores/useUserStore'
import AnswerCard from '/src/pages/board/components/AnswerCard.vue'

const router = useRouter()
const route = useRoute()

const questionStore = useQuestionStore()
const answerStore = useAnswerStore()
const userStore = useUserStore()

const question = ref(null)
const questionIdx = Number(route.params.idx)

const hasSelectedAnswer = computed(() =>
  answerStore.answers.some((a) => a.selected)
)

const isOwner = computed(() => {
  return (
    userStore.isLogin &&
    userStore.nickname &&
    question.value?.writer &&
    question.value.writer === userStore.nickname
  )
})

// ✅ AI 답변 따로 추출
const aiAnswer = computed(() =>
  answerStore.answers.find(a => a.userType === 'AI')
)

// ✅ 일반 유저 답변만 추출
const userAnswers = computed(() =>
  answerStore.answers.filter(a => a.userType !== 'AI')
)

onMounted(async () => {
  try {
    question.value = await questionStore.readQuestion(questionIdx)
    await answerStore.fetchAnswersByQuestionId(questionIdx)
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
})

const handleDelete = async () => {
  if (!window.confirm('게시글을 삭제하시겠습니까?')) return
  try {
    await questionStore.deleteQuestion(questionIdx)
    alert('게시글이 삭제되었습니다.')
    router.push('/board/qna')
  } catch (err) {
    alert('삭제 중 오류 발생')
    console.error(err)
  }
}

const handleSelectAnswer = async (answerId) => {
  if (!window.confirm('채택하시겠습니까?')) return
  try {
    await answerStore.selectAnswer(answerId)
    await answerStore.fetchAnswersByQuestionId(questionIdx)
    await questionStore.refreshQuestionStatus(questionIdx)
    alert('채택 완료')
  } catch (err) {
    alert('채택 실패')
    console.error(err)
  }
}

const handleSelectedAnswer = () => {
  router.push('/board/qna')
}

const confirmDeleteAnswer = async (answerId) => {
  if (!window.confirm('정말 답변을 삭제하시겠습니까?')) return
  try {
    await answerStore.deleteAnswer(answerId)
    await answerStore.fetchAnswersByQuestionId(questionIdx)
    alert('답변 삭제 완료')
  } catch (err) {
    alert('답변 삭제 실패')
    console.error(err)
  }
}

const goToModifyAnswer = (answerId) => {
  router.push(`/board/qna/${questionIdx}/answer/${answerId}/modify`)
}

const goToModify = () => {
  router.push(`/board/qna/${questionIdx}/modify`)
}

const goToRegister = () => {
  questionStore.setSelectedQuestion(question.value)
  router.push(`/board/qna/${question.value.idx}/answer/create`)
}
</script>


<template>
  <div class="wrapper" v-if="question">
    <div class="post_box">
      <router-link to="/board/qna" class="list_button">목록으로</router-link>

      <div class="post_title">
        <img class="icon_img" src="/src/assets/icons/question.png" alt="질문 아이콘" />
        <span class="text">{{ question.qTitle }}</span>
      </div>

      <div class="user_info_line">
        <div class="user_info">
          <img
            v-if="question.image"
            class="profile_img"
            :src="question.image"
            alt="질문 이미지"
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
          <span v-for="tag in question.tags" :key="tag"># {{ tag }}</span>
        </div>
      </div>

      <div
        class="action_area"
        v-if="!hasSelectedAnswer && userStore.isLogin && userStore.nickname !== question.writer"
      >
        <button class="reply_btn" @click="goToRegister">답변하기</button>
      </div>
    </div>

    <!-- AI 답변 영역 -->
<div v-if="aiAnswer" class="ai_answer_v2">
  <div class="ai_header_v2">
    <img class="ai_icon_img" src="/src/assets/icons/Ai.png" alt="전구 아이콘" />
    <div class="ai_title_v2">AI 우선 답변 - 제가 먼저 도와드릴게요!</div>
  </div>

  <div class="ai_card">
    <div class="ai_card_header">
      <div class="ai_card_left">
        <img class="ai_profile_img" src="/src/assets/icons/chatGPS.png" alt="ChatGPS 프로필" />
        <span class="ai_card_name">ChatGPS</span>
      </div>
      <div class="ai_card_date">{{ aiAnswer.createdAt }}</div>
    </div>

    <div class="ai_card_body">
      <pre style="white-space: pre-wrap; font-family: inherit;">{{ aiAnswer.content }}</pre>
    </div>
  </div>
</div>


    <div class="answer_wrapper">
      <div class="answer_count">
        <img src="/src/assets/icons/answer.png" class="answer_icon" alt="답변 아이콘" />
        {{ answerStore.answers.length }}개 답변
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
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
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
  margin: 0 6px;
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

.ai_answer_v2 {
  margin-top: 30px;
  border-top: 2px dashed #ccc;
  padding-top: 24px;
}
.ai_header_v2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
}
.ai_icon_img {
  width: 50px;
  height: 50px;
}
.ai_title_v2 {
  font-size: 20px;
}
.ai_card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.ai_card_header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-bottom: 14px;
  align-items: center;
}
.ai_card_left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ai_profile_img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.ai_card_name {
  font-weight: 600;
  color: #333;
}
.ai_card_body {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}
.ai_section_v2 {
  margin-bottom: 20px;
}
.emoji_title {
  font-weight: bold;
  margin-bottom: 6px;
  color: #d00;
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
.answer_card {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
}
.answer_card.selected {
  border-left: 5px solid #4caf50;
}
.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.left_info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.selected_badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4caf50;
  font-weight: 500;
}
.badge_icon {
  width: 25px;
  height: 25px;
}
.comment_body {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}
.answer_img {
  width: 100%;
  max-width: 120px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: block;
}

.select_btn_area {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.select_btn {
  background: #6a0104;
  border: 2px solid #6a0104;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select_btn:hover {
  background-color: #800000;
}
</style>