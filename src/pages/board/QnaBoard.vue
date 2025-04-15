<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '/src/stores/useQuestionStore'
import QuestionCard from '/src/pages/board/components/QuestionCard.vue'
import axios from 'axios'

const router = useRouter()
const questionStore = useQuestionStore()

const search = ref('')
const keyword = ref('')
const searchResults = ref([])

const isSearching = computed(() => keyword.value.trim().length > 0)

const safeQuestions = computed(() => {
  const list = isSearching.value ? searchResults.value : questionStore.questions
  return Array.isArray(list) ? list.filter(q => typeof q === 'object' && q !== null) : []
})

onMounted(() => {
  questionStore.fetchQuestions()
})

async function triggerSearch() {
  keyword.value = search.value

  if (!keyword.value.trim()) {
    searchResults.value = []
    return
  }

  try {
    const res = await axios.get(`/api/question/search?keyword=${keyword.value}`)
    if (Array.isArray(res.data)) {
      searchResults.value = res.data
    } else {
      console.warn('검색 결과가 배열이 아닙니다:', res.data)
      searchResults.value = []
    }
  } catch (err) {
    console.error('검색 실패:', err)
    searchResults.value = []
  }
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
      v-for="question in safeQuestions"
      :key="question.idx"
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
