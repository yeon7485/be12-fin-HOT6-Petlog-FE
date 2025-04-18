<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CommentCard from '../board/components/CommentCard.vue'

const comments = ref([])

const getSessionUserIdx = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return user?.idx || null
}

const fetchComments = async () => {
  const userId = getSessionUserIdx()
  if (!userId) {
    alert('세션 정보가 없습니다.')
    return
  }

  try {
    const res = await axios.get(`/api/comment/list/user/${userId}`)
    comments.value = res.data
  } catch (e) {
    console.error('❌ 댓글 불러오기 실패', e)
  }
}

onMounted(fetchComments)
</script>

<template>
  <div class="mypage-comments">
    <h2 class="title">내가 쓴 댓글</h2>

    <div v-if="comments.length === 0">
      작성한 댓글이 없습니다.
    </div>

    <CommentCard
      v-for="comment in comments"
      :key="comment.idx"
      :comment="comment"
      :post-idx="comment.postIdx"
      :is-my-page="true"
    />
  </div>
</template>

<style scoped>
.mypage-comments {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
}
</style>