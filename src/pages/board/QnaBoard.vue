<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([
  {
    id: 1,
    status: '해결됨',
    title: '강아지 중성화 수술 고민입니다.',
    author: '닉네임',
    date: '24.8.10',
    content:
      '저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야한다고 하는데 꼭 시켜야하는 건가요? 찾아보니 가격도 만만치 않고 엄청 아파한다고 하더라고요 ㅠㅠㅠ',
    tags: ['강아지', '강아지 중성화'],
    commentCount: 2,
  },
  {
    id: 2,
    status: '미해결',
    title: '질문입니다',
    author: '닉네임',
    date: '24.8.10',
    content: '포스트 내용입니다. 포스트 내용입니다. 포스트 내용입니다. 포스트 내용입니다...',
    tags: ['강아지', '강아지 중성화'],
    commentCount: 2,
  },
]);

const search = ref('');
const keyword = ref('');

const filteredPosts = computed(() => {
  if (!keyword.value.trim()) return posts.value;

  const q = keyword.value.toLowerCase();
  return posts.value.filter(post => {
    return (
      post.title.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });
});

function triggerSearch() {
  keyword.value = search.value;
}

function goToRegister() {
  router.push('/board/qna/register');
}
</script>

<template>
  <div class="qna_board">
    <div class="board_header">
      <h1 class="title">Q&amp;A</h1>
      <div class="search_write">
        <div class="search_box">
          <span class="icon" @click="triggerSearch">🔍</span>
          <input
            v-model="search"
            type="text"
            placeholder="제목, 작성자, 내용, 해시태그 검색 ..."
            @keyup.enter="triggerSearch"
          />
        </div>
        <button class="write_button" @click="goToRegister">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
            alt="글쓰기"
          />
        </button>
      </div>
    </div>

    <div v-for="post in filteredPosts" :key="post.id" class="post_card">
      <div class="post_header">
        <div class="user_info">
          <img class="avatar" src="https://i.imgur.com/1XxWysT.png" alt="유저 아바타" />
          <span class="author">{{ post.author }}</span>
          <span class="date">{{ post.date }}</span>
        </div>
      </div>

      <div class="post_body">
        <div
          class="status_tag"
          :class="post.status === '해결됨' ? 'resolved' : 'unresolved'"
        >
          {{ post.status }}
        </div>

        <router-link :to="`/board/qna/${post.id}`" class="post_title">
          {{ post.title }}
        </router-link>

        <p class="post_content">{{ post.content }}</p>
        <div class="post_tags">
          <span v-for="tag in post.tags" :key="tag" class="tag"># {{ tag }}</span>
        </div>
        <div class="comment_count">💬 {{ post.commentCount }}</div>
      </div>
    </div>

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

.icon {
  font-size: 16px;
  cursor: pointer;
}

.write_button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.write_button img {
  width: 22px;
  height: 22px;
}

.post_card {
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background-color: #fff;
  padding: 20px 30px;
  margin-bottom: 20px;
}

.user_info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.post_body {
  position: relative;
}

.status_tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.resolved {
  background-color: #d6f5d6;
  color: #2e7d32;
}

.unresolved {
  background-color: #e0e0e0;
  color: #555;
}

.post_title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
  display: inline-block;
  color: #000;
  text-decoration: none;
}

.post_title:hover {
  text-decoration: underline;
}

.post_content {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.post_tags {
  margin-top: 8px;
  font-size: 13px;
  color: #999;
}

.tag {
  margin-right: 8px;
}

.comment_count {
  font-size: 13px;
  color: #888;
  margin-top: 5px;
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
