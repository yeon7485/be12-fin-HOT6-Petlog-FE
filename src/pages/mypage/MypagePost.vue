<template>
  <div class="mypage-posts">
    <h2 class="title">내가 쓴 글</h2>
    <table class="post-table">
      <thead>
        <tr>
          <th>게시판</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td>{{ post.category }}</td>
          <td>
            <a href="#" class="post-title">
              {{ post.title.length > 25 ? post.title.substring(0, 25) + "..." : post.title }}
            </a>
            <span v-if="post.commentCount" class="comment-count">[{{ post.commentCount }}]</span>
          </td>
          <td>{{ post.author }}</td>
          <td>{{ post.date }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">‹</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 게시글 데이터 (백엔드 API에서 불러올 수도 있음)
const posts = ref([
  { category: "자유게시판", title: "자유게시판 글 제목입니다. 자유게시판 글 제목입니다.", author: "구름봄", date: "20:30" },
  { category: "분양 홍보", title: "자유게시판 글 제목입니다.", author: "구름봄", date: "25.1.24" },
  { category: "정보공유", title: "자유게시판 글 제목입니다.", author: "구름봄", date: "22.12.25", commentCount: 14 },
]);

// 페이지네이션 관련 데이터
const currentPage = ref(1);
const itemsPerPage = 10; // 한 페이지에 보여줄 글 개수
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
.mypage-posts {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: flex-start; 
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 70px;
}

.post-table th, .post-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.post-table th {
  font-weight: bold;
  background: #f9f9f9;
}

.post-title {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.comment-count {
  color: red;
  font-weight: bold;
  margin-left: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
}

.pagination button {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.pagination button:disabled {
  color: #ccc;
  cursor: default;
}
</style>
