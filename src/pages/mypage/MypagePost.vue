<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// 📌 Vue Router 사용
const router = useRouter();

// 📌 게시글 목록 상태
const posts = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));

// 📌 세션에서 user.idx 추출
function getSessionUserIdx() {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    return parsed.idx;
  }
  return null;
}

// 📌 날짜 포맷 함수
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// 📌 사용자 게시글 불러오기
const fetchUserPosts = async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert("세션에 유저 정보가 없습니다.");
    return;
  }

  try {
    const response = await axios.get(`/api/post/list/user/${userId}`);
    console.log("✅ 응답 결과:", response.data);

    if (Array.isArray(response.data)) {
      posts.value = response.data;
    } else {
      console.warn("❗ 응답이 배열이 아닙니다. 기본값 사용.");
      posts.value = [];
    }
  } catch (error) {
    console.error("❌ 게시글 불러오기 실패:", error);
    posts.value = [];
  }
};

// 📌 페이지네이션 계산
const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return posts.value.slice(start, start + itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// 📌 게시글 상세로 이동
const goToPostDetail = (post) => {
  router.push(`/board/${post.boardType}/post/${post.idx}`);
};

onMounted(() => {
  fetchUserPosts();
});
</script>

<template>
  <div class="mypage-posts">
    <h2 class="title">내가 쓴 글</h2>
    <table class="post-table">
      <thead>
        <tr>
          <th>게시판</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in pagedPosts" :key="post.idx">
          <td>{{ post.boardType }}</td>
          <td>
            <a href="#" class="post-title" @click.prevent="goToPostDetail(post)">
              {{ post.title.length > 25 ? post.title.substring(0, 25) + "..." : post.title }}
            </a>
          </td>
          <td>{{ post.writer }}</td>
          <td>{{ formatDate(post.createdAt) }}</td>
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

.post-table th,
.post-table td {
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
  cursor: pointer;
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
