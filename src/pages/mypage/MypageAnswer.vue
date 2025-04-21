<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AnswerCard from '../board/components/AnswerCard.vue'; // 경로 맞게 조정

const answers = ref([]);

const getSessionUserIdx = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user?.idx || null;
};

const fetchAnswers = async () => {
  try {
    const userId = getSessionUserIdx();
    const res = await axios.get(`/api/answer/list/user/${userId}`);
    answers.value = res.data;
  } catch (e) {
    console.error("답변 불러오기 실패", e);
  }
};


onMounted(fetchAnswers);
</script>

<template>
  <div class="container">
    <h2 class="title">내가 작성한 답변</h2>
    <div v-if="answers.length === 0" class="empty-message">작성한 답변이 없습니다.</div>
    <AnswerCard
      v-else
      v-for="answer in answers"
      :key="answer.idx"
      :answer="answer"
      :question-idx="answer.questionIdx"
    />
  </div>
</template>


<style scoped>
.container {
  max-width: 800px;
  margin: 30px auto;

}
.title {
  font-size: 32px;
  font-weight: bold;
  align-self: flex-start; 
}
.empty-message {
  font-size: 18px;
  color: #999;
  margin: 30px auto;
  text-align: center;
  width: 100%;
}
</style>