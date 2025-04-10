<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '/src/stores/useQuestionStore'
import QuestionCard from '/src/pages/board/components/QuestionCard.vue'

const router = useRouter()
const questionStore = useQuestionStore()

const search = ref('')
const keyword = ref('')

onMounted(() => {
  questionStore.fetchQuestions()
})

const filteredQuestions = computed(() => {
  if (!keyword.value.trim()) return questionStore.questions

  const q = keyword.value.toLowerCase()
  return questionStore.questions.filter(question => {
    return (
      question.title.toLowerCase().includes(q) ||
      question.author.toLowerCase().includes(q) ||
      question.content.toLowerCase().includes(q) ||
      question.tags.some(tag => tag.toLowerCase().includes(q))
    )
  })
})

function triggerSearch() {
  keyword.value = search.value
}

function goToRegister() {
  router.push('/board/qna/register')
}
</script>

<template>
  <div class="qna_board">
    <div class="board_header">
      <h1 class="title">Q&amp;A</h1>
      <div class="search_write">
        <div class="search_box">
          <img
            class="icon_img"
            src="/src/assets/icons/search.png"
            alt="검색 아이콘"
            @click="triggerSearch"
          />
          <input
            v-model="search"
            type="text"
            placeholder="제목, 작성자, 내용, 해시태그 검색 ..."
            @keyup.enter="triggerSearch"
          />
        </div>
        <button class="write_button" @click="goToRegister">
          <img
            class="write_icon"
            src="/src/assets/icons/write.png"
            alt="글쓰기 아이콘"
          />
        </button>
      </div>
    </div>

    <QuestionCard
      v-for="question in filteredQuestions"
      :key="question.id"
      :question="question"
    />

    <div class="pagination">
      <span class="page">1</span>
      <span class="page">2</span>
      <span class="page">3</span>
    </div>
  </div>
</template>

<style scoped>
.qna_board {
  width: 100%;
}

.board_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 36px;
  font-weight: 800;
}

.search_write {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search_box {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 8px 14px;
  border-radius: 40px;
  width: 300px;
  font-size: 14px;
  color: #999;
}

.search_box input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  margin-left: 8px;
}

.icon_img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.write_button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.write_icon {
  width: 22px;
  height: 22px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.page {
  font-weight: 600;
  cursor: pointer;
  color: #333;
}
</style>
