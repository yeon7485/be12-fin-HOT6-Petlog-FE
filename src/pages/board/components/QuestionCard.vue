<template>
  <div class="post_card">
    <div class="post_header">
      <div class="user_info">
        <img class="avatar" src="/src/assets/images/dog1.png" alt="유저 아바타" />
        <span class="author">{{ question.writer }}</span>
        <span class="date">{{ question.date }}</span>
      </div>
    </div>

    <div class="post_body">
      <div
        class="status_tag"
        :class="question.status === '해결됨' ? 'resolved' : 'unresolved'"
      >
        {{ question.status }}
      </div>

      <router-link :to="`/board/qna/${question.id}`" class="post_title">
        {{ question.title }}
      </router-link>

      <p class="post_content">{{ question.contents }}</p>

      <div class="post_tags">
        <span v-for="tag in question.tags" :key="tag" class="tag"># {{ tag }}</span>
      </div>

      <div class="comment_count">💬 {{ question.commentCount }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: Object
})
</script>

<style scoped>
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
</style>
