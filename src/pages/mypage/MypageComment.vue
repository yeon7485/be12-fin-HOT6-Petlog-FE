<script setup>
import { onMounted } from 'vue'
import { useMypageCard } from '../../stores/useMypageCard'
import { storeToRefs } from 'pinia'
import CommentCard from '../board/components/CommentCard.vue'

// store 사용
const store = useMypageCard()
const { userComments } = storeToRefs(store) // 반응형 연결

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
    await store.fetchCommentsByUser(userId) // ✅ store 메서드 사용
  } catch (e) {
    console.error('❌ 댓글 불러오기 실패', e)
  }
}

onMounted(fetchComments)
</script>

<template>
  <div class="mypage-comments">
    <h2 class="title">내가 쓴 댓글</h2>

    <div v-if="userComments.length === 0" class="empty-message">
      작성한 댓글이 없습니다.
    </div>

    <CommentCard
      v-else
      v-for="comment in userComments"
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
.empty-message {
  font-size: 18px;
  color: #999;
  margin: 30px auto;
  text-align: center;
  width: 100%;
}
</style>