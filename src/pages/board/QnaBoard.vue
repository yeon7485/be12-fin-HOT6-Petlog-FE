<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import { useAnswerStore } from "/src/stores/useAnswerStore";
import QuestionCard from "/src/pages/board/components/QuestionCard.vue";

const router = useRouter();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();

const search = ref("");
const keyword = ref("");
const searchResults = ref([]);
const searchTotalPages = ref(1);

const currentPage = ref(1);
const pageSize = 5;

const isSearching = computed(() => keyword.value.trim().length > 0);

const safeQuestions = computed(() => {
  const list = isSearching.value ? searchResults.value : questionStore.questions;
  return Array.isArray(list) ? list.filter((q) => typeof q === "object" && q !== null) : [];
});

const loadPage = async (page) => {
  currentPage.value = page;
  if (isSearching.value) {
    await triggerSearch(keyword.value, page);
  } else {
    await questionStore.fetchQuestions(page - 1, pageSize);
    await Promise.all(questionStore.questions.map((q) => answerStore.fetchAnswersByQuestionId(q.idx)));
  }
};

const triggerSearch = async (kw, page = 1) => {
  keyword.value = kw;
  currentPage.value = page;
  const res = await questionStore.searchQuestions(kw, page - 1, pageSize);
  searchResults.value = res.content;
  searchTotalPages.value = res.totalPages;
  await Promise.all(searchResults.value.map((q) => answerStore.fetchAnswersByQuestionId(q.idx)));
};

const goToRegister = () => {
  router.push("/board/qna/create");
};

onMounted(() => loadPage(1));
</script>

<template>
  <div class="qna_board">
    <div class="board_header">
      <h1 class="title">Q&amp;A</h1>
      <div class="search_write">
        <div class="search_box">
          <img class="icon_img" src="/src/assets/icons/search.png" alt="검색 아이콘" @click="triggerSearch(search)" />
          <input
            v-model="search"
            type="text"
            placeholder="제목, 작성자, 내용, 해시태그 검색 ..."
            @keyup.enter="triggerSearch(search)"
          />
        </div>
        <button class="write_button" @click="goToRegister">
          <img class="write_icon" src="/src/assets/icons/write.png" alt="글쓰기 아이콘" />
        </button>
      </div>
    </div>

    <QuestionCard
      v-for="question in safeQuestions"
      :key="question.idx"
      :question="{
        ...question,
        answerCount: answerStore.answers.filter(
          (a) => a.questionIdx === question.idx && a.userType !== 'AI'
        ).length,
      }"
    />

    <div v-if="(isSearching ? searchTotalPages : questionStore.totalPages) > 1" class="pagination">
      <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">◀</button>
      <button
        v-for="page in (isSearching ? searchTotalPages : questionStore.totalPages)"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="loadPage(page)"
      >
        {{ page }}
      </button>
      <button
        @click="loadPage(currentPage + 1)"
        :disabled="currentPage === (isSearching ? searchTotalPages : questionStore.totalPages)"
      >
        ▶
      </button>
    </div>
  </div>
</template>


<style scoped>
.qna_board {
  width: 100%;
  padding: 20px 0;
}

.board_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  animation: fadeSlideUp 0.5s ease;
}

.title {
  font-size: 36px;
  font-weight: 800;
  color: #333;
  animation: fadeInUp 0.6s ease-in-out;
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
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.search_box:focus-within {
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search_box input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  margin-left: 8px;
  color: #333;
}

.icon_img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  animation: pulse 2s infinite ease-in-out;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.1));
}

.write_button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  transition: transform 0.2s ease;
}
.write_button:hover {
  transform: scale(1.15);
}

.write_icon {
  width: 22px;
  height: 22px;
}

.page {
  font-weight: 600;
  cursor: pointer;
  color: #333;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.page:hover {
  background: #6a0104;
  color: #fff;
  transform: scale(1.05);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 6px;
}

.pagination button {
  padding: 6px 12px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  border-radius: 6px;
}

.pagination button.active {
  font-weight: bold;
  background-color: #c9baba;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
