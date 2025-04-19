<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Card from "/src/pages/board/components/PostCard.vue"
import { useBoardStore } from "/src/stores/useBoardStore.js"

const router = useRouter()
const boardStore = useBoardStore()

const searchQuery = ref("")
const selectedCategory = ref("")

const categories = ['강아지', '고양이', '햄스터', '도마뱀', '물고기']

const triggerSearch = async () => {
  if (!selectedCategory.value) {
    alert("카테고리를 선택해주세요.")
    return
  }

  await boardStore.searchPosts({
    boardName: 'free',
    category: selectedCategory.value,
    keyword: searchQuery.value || ''
  })
}

const goToWritePage = () => {
  router.push("/board/free/create")
}

onMounted(() => {
  boardStore.fetchPosts("free")
})
</script>

<template>
  <div>
    <div class="board_header">
      <h1>자유 게시판</h1>
      <div class="search_box">
        <select v-model="selectedCategory" class="category_dropdown" @change="triggerSearch">
          <option value="">카테고리를 선택하세요.</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <div class="search_input_wrap">
          <input
            v-model="searchQuery"
            placeholder="제목, 작성자 검색 ..."
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
          v-for="(post, index) in boardStore.filteredPosts"
          :key="post.idx"
          :post="post"
          :index="index + 1"
          :boardType="'free'"
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
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

/* ✅ 드롭다운 개선 */
.category_dropdown {
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #a1887f;
  background-color: #fdf6f1;
  color: #4E342E;
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

/* ✅ 검색창 개선 */
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
}

.board_table th {
  background-color: #d7ccc8;
  text-align: left;
  padding: 10px 6px;
  border-bottom: 2px solid #a1887f;
  font-size: 15px;
  font-weight: 600;
  color: #4E342E;
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
  color: #5D4037;
}

.write_btn {
  float: right;
  background: #6D4C41;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.write_btn:hover {
  background: #5D4037;
}

</style>
