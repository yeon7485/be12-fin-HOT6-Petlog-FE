<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore } from '/src/stores/useBoardStore.js'
import { useCategoryStore } from '/src/stores/useCategoryStore.js'
import Card from '/src/pages/board/components/PostCard.vue'

const router = useRouter()
const boardStore = useBoardStore()
const categoryStore = useCategoryStore()

const searchQuery = ref("");
const selectedCategory = ref("");
const currentPage = ref(1);
const pageSize = 5;

const categories = computed(() =>
  categoryStore.boardCategories.map(c => ({ label: c.name, value: c.idx }))
);

const loadPage = async (page) => {
  currentPage.value = page;

  if (boardStore.isSearching) {
    await boardStore.searchPosts({
      boardName: 'information',
      category: boardStore.currentCategoryName,
      keyword: boardStore.currentKeyword,
      page: page - 1,
      size: pageSize
    });
  } else {
    await boardStore.fetchPosts('information', page - 1, pageSize);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

const triggerSearch = async () => {
  currentPage.value = 1;

  const selectedCategoryName = selectedCategory.value 
    ? categoryStore.boardCategories.find(c => c.idx === selectedCategory.value)?.name 
    : '';

  const keyword = searchQuery.value.trim();

  if (!keyword && !selectedCategoryName) {
    boardStore.isSearching = false;
    await boardStore.fetchPosts('information', 0, pageSize);
  } else {
    boardStore.isSearching = true;
    await boardStore.searchPosts({
      boardName: 'information',
      category: selectedCategoryName,
      keyword: keyword,
      page: 0,
      size: pageSize
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const goToWritePage = () => {
  router.push("/board/information/create");
};

onMounted(async () => {
  await categoryStore.fetchCategories('BOARD')
  await loadPage(1)
});
</script>

<template>
  <div>
    <div class="board_header">
      <h1>자유 게시판</h1>
      <div class="search_box">
        <select
          v-model="selectedCategory"
          class="category_dropdown"
          @change="triggerSearch"
        >
          <option value="">카테고리를 선택하세요.</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>

        <div class="search_input_wrap">
          <input v-model="searchQuery" placeholder="제목, 작성자 검색 ..." @keyup.enter="triggerSearch" />
          <img class="search_icon_img" src="/src/assets/icons/search.png" alt="검색 아이콘" @click="triggerSearch" />
        </div>
      </div>
    </div>

    <table class="board_table">
      <thead>
        <tr>
          <th>번호</th>
          <th>카테고리</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <Card
          v-for="(post, index) in boardStore.posts"
          :key="post.idx"
          :post="post"
          :index="(currentPage - 1) * pageSize + index + 1"
          :boardType="'information'"
        />
      </tbody>
    </table>

    <div v-if="boardStore.totalPages > 1" class="pagination">
      <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">◀</button>
      <button
        v-for="page in boardStore.totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="loadPage(page)"
      >
        {{ page }}
      </button>
      <button @click="loadPage(currentPage + 1)" :disabled="currentPage === boardStore.totalPages">▶</button>
    </div>

    <button class="write_btn" @click="goToWritePage">글쓰기</button>
  </div>
</template>

<style scoped>
.board_header {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
}

.board_header h1 {
  animation: fadeIn 0.8s ease-in-out;
}

.search_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.category_dropdown {
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #a1887f;
  background-color: #fdf6f1;
  color: #4e342e;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(93, 64, 55, 0.1);
  transition: all 0.2s ease;
}

.category_dropdown:hover {
  border-color: #8d6e63;
  background-color: #fcefe7;
}

.category_dropdown:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(93, 64, 55, 0.3);
}

.search_input_wrap {
  position: relative;
  width: 320px;
  transition: all 0.3s ease;
}

.search_input_wrap input {
  width: 100%;
  height: 44px;
  padding: 10px 16px 10px 44px;
  border: 1px solid #ccc;
  border-radius: 999px;
  font-size: 14px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search_input_wrap input::placeholder {
  color: #aaa;
  font-style: italic;
}

.search_input_wrap input:focus {
  border-color: #a1887f;
  box-shadow: 0 0 0 2px rgba(161, 136, 127, 0.3);
}

.search_icon_img {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.search_icon_img:hover {
  transform: translateY(-50%) scale(1.15);
}

.board_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  animation: fadeSlideUp 0.6s ease-out;
}

.board_table th {
  background-color: #d7ccc8;
  text-align: left;
  padding: 10px 6px;
  border-bottom: 2px solid #a1887f;
  font-size: 15px;
  font-weight: 600;
  color: #4e342e;
}

.page_btn,
.page_number {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
  color: #5d4037;
}

.write_btn {
  float: right;
  background: #6d4c41;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.write_btn:hover {
  background: #5d4037;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
