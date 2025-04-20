<script setup>
import { onMounted } from 'vue';
import { useMypageCard } from '../../stores/useMypageCard'
import { storeToRefs } from 'pinia';
import QuestionCard from '../board/components/QuestionCard.vue';

const store = useMypageCard();
const { userQuestions } = storeToRefs(store); // ✅ store 상태 사용

const getSessionUserIdx = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user?.idx || null;
};

const fetchQuestions = async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert('세션 정보가 없습니다.');
    return;
  }

  try {
    await store.fetchQuestionsByUser(userId); // ✅ store에서 API 호출
  } catch (err) {
    console.error('❌ 질문 목록 불러오기 실패', err);
  }
};

onMounted(fetchQuestions);
</script>

<template>
  <div class="container">
    <h2 class="title">나의 질문</h2>
    <QuestionCard v-for="q in userQuestions" :key="q.idx" :question="q" />
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 80%;
  max-width: 100%; /* 카드 크기 조정 */
  margin: 20px auto;
  font-family: Arial, sans-serif;
  margin-left: 10%;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: flex-start; 
  margin-left: 25%;
}


.question-card {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
}

.date {
  font-size: 12px;
  color: #888;
}

.question-content {
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  background: #4caf50;
  color: #fff;
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.question-title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 8px;
}

.question-text {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.comment-count {
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>
