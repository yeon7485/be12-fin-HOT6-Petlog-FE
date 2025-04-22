<script setup>
defineProps({ question: Object })
</script>

<template>
  <div class="post_card">
    <div class="post_header">
      <div class="user_info">
        <img class="avatar" :src="question.profileImageUrl || '/src/assets/images/default.png'" alt="유저 아바타" />

        <span class="author">{{ question.writer }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ question.createdAt }}</span>
      </div>
    </div>    

    <div class="post_body">
      <div class="status_badge" :class="question.selected ? 'resolved' : 'unresolved'">
        {{ question.selected ? '해결됨' : '미해결' }}
      </div>

      <router-link :to="`/board/qna/${question.idx}`" class="post_title">
        {{ question.qTitle || question.qtitle }}
        <img
         v-if="question.imageUrls && question.imageUrls.length > 0"
          src="/src/assets/icons/image.png"
          alt="이미지 있음"
          class="image_icon"/>
       </router-link>

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

.post_card:hover .post_title {
  color: #6a0104;
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
  margin-bottom: 12px;
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

.status_badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 12px;
  margin-right: 8px;
  margin-top: 10px;
}

.status_badge.resolved {
  background-color: #d6f5d6;
  color: #2e7d32;
}

.status_badge.unresolved {
  background-color: #f6e3df;  
  color: #914141;
}

.post_title {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
  transition: color 0.2s ease, transform 0.2s ease;
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
  font-size: 16px;
  color: #444;
  margin: 6px 0 12px;
  line-height: 1.5;
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
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 2px 8px;
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



