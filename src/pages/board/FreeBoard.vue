<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const posts = ref([
  { id: 1, category: "강아지", title: "저희 강아지 귀엽쥬? ", author: "구름봄", date: "04/01" },
  { id: 2, category: "고양이", title: "우리 고양이도 귀엽쥬?", author: "별밤", date: "04/02" },
  { id: 3, category: "강아지", title: "우리 강아지 귀엽쥬?", author: "해파리", date: "04/03" },
  { id: 4, category: "물고기", title: "우리 물고기 귀엽쥬?", author: "해파리", date: "04/03" },
  { id: 5, category: "물고기", title: "잉어킹", author: "해파리", date: "04/03" },
  { id: 6, category: "물고기", title: "물속 친구 소개해요", author: "해파리", date: "04/03" },
  { id: 7, category: "물고기", title: "물속 친구 소개해요", author: "해파리", date: "04/03" }
]);

const searchQuery = ref("");
const searchResult = ref([...posts.value]);

const triggerSearch = () => {
  const query = searchQuery.value.trim();
  if (query === "") {
    searchResult.value = [...posts.value];
    return;
  }

  searchResult.value = posts.value.filter((post) =>
    post.title.includes(query) ||
    post.author.includes(query) ||
    post.category.includes(query)
  );
};

const goToDetail = (postId) => {
  router.push(`/detail/${postId}`);
};

const goToWritePage = () => {
  router.push("/write");
};
</script>

<template>
  <div>
    <div class="board_header">
      <h1>자유게시판</h1>
      <div class="search_box">
        <div class="search_input_wrap">
          <input
            v-model="searchQuery"
            placeholder="제목, 작성자, 카테고리 검색 ..."
            @keyup.enter="triggerSearch"
          />
          <button class="search_icon" @click="triggerSearch">
            🔍
          </button>
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
        <tr v-for="post in searchResult" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.category }}</td>
          <td>
            <span class="post_link" @click="goToDetail(post.id)">
              {{ post.title }}
            </span>
          </td>
          <td>{{ post.author }}</td>
          <td>{{ post.date }}</td>
        </tr>
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

/* 검색창 */
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

.search_icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 14px;
  color: #888;
  cursor: pointer;
  padding: 0;
}

.board_table {
  width: 100%;
  border-collapse: collapse;
}

.board_table th, .board_table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.post_link {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.page_btn, .page_number {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.write_btn {
  float: right;
  background: #b71c1c;
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
