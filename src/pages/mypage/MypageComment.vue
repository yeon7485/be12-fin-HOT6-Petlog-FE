<template>
  <div class="mypage-comments">
    <h2 class="title">내가 쓴 댓글</h2>
    <table class="comment-table">
      <thead>
        <tr>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, index) in comments" :key="index">
          <td>
            <p class="comment-text">{{ comment.text }}</p>
            <div class="comment-meta">
              <span class="comment-time">{{ comment.time }}</span>
              <span class="comment-post-title">
                {{ comment.postTitle }}
                <span v-if="comment.commentCount" class="comment-count">[{{ comment.commentCount }}]</span>
              </span>
            </div>
          </td>
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

// 댓글 데이터 (백엔드 API에서 불러올 수도 있음)
const comments = ref([
  { text: "우리 강아지가 더 귀여운거 같은데요.", time: "21:37", postTitle: "자유게시판 글 제목입니다.", commentCount: 2 },
  { text: "친해지고 싶어요 !!!", time: "22.12.27 08:33", postTitle: "자유게시판 글 제목입니다.", commentCount: 27 },
]);

// 페이지네이션 관련 데이터
const currentPage = ref(1);
const itemsPerPage = 10; // 한 페이지에 보여줄 댓글 개수
const totalPages = computed(() => Math.ceil(comments.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
.mypage-comments {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin: 20px;
  position: absolute;
  left: 500px; 
  margin-top: 0px;
}

.comment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 70px;
}

.comment-table th, .comment-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.comment-table th {
  font-weight: bold;
  background: #f9f9f9;
}

.comment-text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.comment-time {
  font-weight: bold;
}

.comment-post-title {
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
