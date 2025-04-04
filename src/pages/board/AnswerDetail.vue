<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const postId = route.params.id;
const post = ref(null);

// 임시 mock 데이터 (실제로는 API 또는 전역 상태에서 가져오도록 구현)
const mockPosts = [
  {
    id: '1',
    title: '강아지 중성화 수술 고민입니다.',
    author: '닉네임',
    date: '24.8.10',
    content: '중성화 수술 관련 고민이 있어요...',
    status: '해결됨',
    tags: ['강아지', '중성화'],
    commentCount: 2,
  },
  {
    id: '2',
    title: '질문입니다',
    author: '닉네임',
    date: '24.8.10',
    content: '포스트 내용입니다. 포스트 내용입니다. 포스트 내용입니다. 포스트 내용입니다...',
    status: '미해결',
    tags: ['강아지'],
    commentCount: 1,
  },
];

onMounted(() => {
  post.value = mockPosts.find(p => p.id === postId);
});
</script>

<template>
  <div v-if="post" class="detail_container">
    <h1 class="detail_title">{{ post.title }}</h1>
    <div class="detail_meta">
      <span>작성자: {{ post.author }}</span>
      <span>{{ post.date }}</span>
    </div>
    <p class="detail_content">{{ post.content }}</p>
    <div class="tags">
      <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
  </div>
  <div v-else>
    <p>존재하지 않는 게시글입니다.</p>
  </div>
</template>

<style scoped>
.detail_container {
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
}

.detail_title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.detail_meta {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
}

.detail_content {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tags {
  font-size: 14px;
  color: #999;
}

.tag {
  margin-right: 10px;
}
</style>
