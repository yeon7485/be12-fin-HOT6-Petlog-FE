<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Card from "/src/pages/board/components/PostCard.vue"
import { useBoardStore } from "/src/stores/useBoardStore.js"

const router = useRouter()
const boardStore = useBoardStore()

const searchQuery = ref("")

const triggerSearch = () => {
  boardStore.searchPosts(searchQuery.value)
}

const goToWritePage = () => {
  router.push("/board/register")
}

onMounted(() => {
  boardStore.fetchPosts("information")
})
</script>

<template>
  <div>
    <div class="board_header">
      <h1>정보 공유</h1>
      <div class="search_box">
        <div class="search_input_wrap">
          <input
            v-model="searchQuery"
            placeholder="제목, 작성자, 카테고리 검색 ..."
            @keyup.enter="triggerSearch"
          />
          <img
            class="search_icon_img"
            src="/src/assets/icons/search.png"
            alt="검색 아이콘"
            @click="triggerSearch"
          />
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
          v-for="post in boardStore.filteredPosts"
          :key="post.id"
          :post="post"
          boardType="information"
        />
      </tbody>
    </table>

    <div class="pagination">
      <button class="page_btn">◀</button>
      <span class="page_number">1</span>
      <span class="page_number">2</span>
      <span class="page_number">3</span>
      <button class="page_btn">▶</button>
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

.search_box {
  display: flex;
  justify-content: flex-end;
}

.search_input_wrap {
  position: relative;
  width: 300px;
}

.search_input_wrap input {
  width: 250px;
  padding: 10px 12px 10px 36px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  background-color: #f1f1f1;
  color: #333;
  outline: none;
}

.search_icon_img {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.board_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.board_table th {
  background-color: #fafafa;
  text-align: left;
  padding: 12px 8px;
  border-bottom: 2px solid #ccc;
  font-size: 15px;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.page_btn,
.page_number {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.write_btn {
  float: right;
  background: #6a0104;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.write_btn:hover {
  background: #8b0000;
}
</style>
