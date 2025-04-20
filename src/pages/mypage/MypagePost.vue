<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useMypageCard } from '../../stores/useMypageCard' // ✅ 스토어 import
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useMypageCard();
const { userPosts } = storeToRefs(store); // ✅ 상태 반응형으로 꺼냄

const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(userPosts.value.length / itemsPerPage));

function getSessionUserIdx() {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    return parsed.idx;
  }
  return null;
}

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

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return userPosts.value.slice(start, start + itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPostDetail = (post) => {
  router.push(`/board/${post.boardType}/post/${post.idx}`);
};

onMounted(async () => {
  const userId = getSessionUserIdx();
  if (!userId) {
    alert("세션에 유저 정보가 없습니다.");
    return;
  }
  await store.fetchPostsByUser(userId); // ✅ store 메서드 사용
});
</script>

<template>
  <div class="mypage-posts">
    <h2 class="title">내가 쓴 글</h2>

    <div v-if="userPosts.length === 0" class="empty-message">
      내가 작성한 글이 없습니다.
    </div>

    <template v-else>
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

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">‹</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">›</button>
      </div>
    </template>
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
.empty-message {
  font-size: 18px;
  color: #999;
  margin: 40px auto;
  text-align: center;
  width: 100%;
}
</style>
