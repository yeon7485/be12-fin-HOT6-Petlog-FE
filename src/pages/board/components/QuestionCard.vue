<script setup>
defineProps({ question: Object });
</script>

<template>
  <div class="post_card">
    <div class="post_header">
      <div class="user_info">
        <img
          class="avatar"
          :src="question.profileImageUrl || '/src/assets/images/default.png'"
          alt="유저 아바타"
        />

        <span class="author">{{ question.writer }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ question.createdAt }}</span>
      </div>
    </div>

    <div class="post_body">
      <div class="title_box">
        <div class="status_badge" :class="question.selected ? 'resolved' : 'unresolved'">
          {{ question.selected ? "해결됨" : "미해결" }}
        </div>

        <router-link :to="`/board/qna/${question.idx}`" class="post_title">
          {{ question.qTitle }}
          <img
            v-if="question.imageUrls && question.imageUrls.length > 0"
            src="/src/assets/icons/image.png"
            alt="이미지 있음"
            class="image_icon"
          />
        </router-link>
      </div>

      <p class="post_content">{{ question.content }}</p>

      <div class="post_tags">
        <span v-for="tags in question.tags" :key="tags" class="tag"># {{ tags }}</span>
      </div>

      <div class="comment_count">
        <img src="/src/assets/icons/comment.png" alt="답변 아이콘" class="comment_icon" />
        {{ question.answerCount }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.post_card {
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background-color: #fff;
  padding: 24px 28px;
  margin-bottom: 20px;
  width: 100%;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  animation: fadeIn 0.6s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.post_card:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.post_card:hover {
  transform: scale(1.01);
}

.post_card:hover .image_icon {
  transform: scale(1.1);
}

.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  gap: 6px;
}

.divider {
  color: #aaa;
  margin: 0 4px;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.post_body {
  position: relative;
}

.title_box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.status_badge {
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 12px;
}

.status_badge.resolved {
  background-color: #d6f5d6;
  color: #2e7d32;
}

.status_badge.unresolved {
  background-color: var(--gray400);
  color: white;
}

.post_title {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  text-decoration: none;
}

.image_icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  vertical-align: middle;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.post_content {
  font-size: 14px;
  margin: 6px 0 12px;
  line-height: 140%;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

.post_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  font-size: 13px;
  color: #666;
}

.comment_count {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-top: 14px;
}

.comment_icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
</style>
