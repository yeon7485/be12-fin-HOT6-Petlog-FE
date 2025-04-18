<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '/src/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()
const currentUserIdx = userStore.userIdx

const props = defineProps({
  comment: Object,
  postIdx: Number,
  isMyPage: {
    type: Boolean,
    default: false
  }
})

const goToPostDetail = () => {
  const boardName = props.comment.boardType?.boardName || 'free'
  router.push(`/board/${boardName}/post/${props.postIdx}`)
}
</script>

<template>
  <div class="comment_card" @click="goToPostDetail">
    <div class="comment_header">
      <div class="left_info">
        <img class="avatar" src="/src/assets/images/dog1.png" alt="유저 이미지" />
        <span class="nickname">{{ comment.writer }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ comment.createdAt }}</span>
      </div>

      <div class="icons" v-if="!isMyPage && comment.userIdx === currentUserIdx">
        <img
          src="/src/assets/icons/write.png"
          class="icon_btn"
          alt="수정"
          @click.stop="$emit('edit', comment)"
        />
        <img
          src="/src/assets/icons/x-button.png"
          class="icon_btn"
          alt="삭제"
          @click.stop="$emit('delete', comment.idx)"
        />
      </div>
    </div>

    <div class="comment_text">
      {{ comment.content }}
    </div>
  </div>
</template>

<style scoped>
.comment_card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}
.comment_card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.comment_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}
.left_info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.nickname {
  font-weight: 600;
}
.date {
  font-size: 13px;
  color: #888;
}
.divider {
  margin: 0 6px;
  color: #999;
}
.icons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon_btn {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.comment_text {
  font-size: 15px;
  color: #222;
  line-height: 1.5;
}
</style>