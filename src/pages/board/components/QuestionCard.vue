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
  padding: 20px 30px;
  margin-bottom: 20px;
  width: 100%;
}

.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
  gap: 5px;
}

.divider {
  margin: 0 2px;
  color: #aaa;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.post_body {
  position: relative;
}

.post_title {
  font-size: 20px;
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
  font-size: 17px;
  color: #333;
  margin-bottom: 10px;
}

.post_tags {
  margin-top: 8px;
  font-size: 14px;
  color: #999;
}

.tag {
  margin-right: 8px;
}

.comment_icon {
  width: 13px;
  height: 13px;
  vertical-align: middle;
  margin-right: 2px;
}

.comment_count {
  font-size: 12px;
  color: #000000;
  margin-top: 6px;
}

.status_badge {
  display: inline-block;
  font-size: 13px;
  margin-right: 5px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.status_badge.resolved {
  background-color: #d6f5d6;
  color: #2e7d32;
}

.status_badge.unresolved {
  background-color: #f2f2f2;
  color: #555;
}
.image_icon {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  vertical-align: middle;
}
</style>
