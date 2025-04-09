<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBoardStore } from '/src/stores/useBoardStore'

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()

const boardType = route.params.boardType
const postId = Number(route.params.id)
const post = ref(null)

onMounted(async () => {
  await boardStore.fetchPosts(boardType)
  post.value = boardStore.posts.find(p => p.id === postId)
})

const goToModify = () => {
  router.push(`/board/${boardType}/post/${postId}/modify`)
}

const confirmDeletePost = () => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    alert('게시글이 삭제되었습니다.')
    router.push(`/board/${boardType}`)
  }
}

// 댓글 관련
const newComment = ref('')
const comments = ref([
  {
    id: 1,
    author: '댓글작성',
    date: '24.8.10',
    text: '저희집 콩이가 더 귀엽네유',
    editable: false,
  },
  {
    id: 2,
    author: '닉네임',
    date: '24.8.10',
    text: '뒤에 사료값 2배는 뭔가요 ㅋㅋ',
    editable: true,
  },
])

const addComment = () => {
  if (newComment.value.trim() === '') return

  const confirmed = window.confirm('댓글을 등록하시겠습니까?')
  if (confirmed) {
    alert('댓글이 등록되었습니다')
    comments.value.push({
      id: Date.now(),
      author: '새 댓글',
      date: new Date().toLocaleDateString(),
      text: newComment.value,
      editable: true,
    })
    newComment.value = ''
  }
}

const editCommentId = ref(null)
const editedText = ref('')

const startEdit = (comment) => {
  editCommentId.value = comment.id
  editedText.value = comment.text
}

const cancelEdit = () => {
  editCommentId.value = null
  editedText.value = ''
}

const saveEdit = (id) => {
  const target = comments.value.find(c => c.id === id)
  if (target) target.text = editedText.value
  cancelEdit()
}

const confirmDeleteComment = (id) => {
  const confirmed = window.confirm('댓글을 삭제하시겠습니까?')
  if (confirmed) {
    comments.value = comments.value.filter(c => c.id !== id)
    alert('댓글이 삭제되었습니다.')
  }
}
</script>

<template>
  <div v-if="post" class="wrapper">
    <div class="post_box">
      <div class="post_title">
        <span class="text">{{ post.title }}</span>
      </div>

      <div class="user_info_line">
        <div class="user_info">
          <img class="profile_img" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
          <span class="nickname">{{ post.writer }}</span>
          <span class="divider">ㅣ</span>
          <span class="date">{{ post.date }}</span>
        </div>
        <div class="icons">
          <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정 아이콘" @click="goToModify" />
          <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제 아이콘" @click="confirmDeletePost" />
        </div>
      </div>

      <hr class="divider_line" />

      <div class="content_area">
        <img class="dog_img" src="/src/assets/images/dog1.png" alt="강아지 이미지" />
        <p class="description">{{ post.contents || '게시글 내용이 없습니다.' }}</p>
      </div>
    </div>
  </div>

  <div class="comment_section">
    <label class="comment_label">
      <img class="label_icon" src="/src/assets/icons/write-letter.png" alt="댓글 아이콘" />
      댓글
    </label>

    <div class="input_area">
      <input
        type="text"
        class="comment_input"
        placeholder="댓글을 작성해주세요."
        v-model="newComment"
      />
      <button class="submit_btn" @click="addComment">등록</button>
    </div>

    <div
      class="comment_card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="comment_header">
        <img class="avatar" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
        <span class="nickname">{{ comment.author }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ comment.date }}</span>
        <template v-if="comment.editable">
          <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정" @click="startEdit(comment)" />
          <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제" @click="confirmDeleteComment(comment.id)" />
        </template>
      </div>

      <div v-if="editCommentId === comment.id">
        <div class="edit_buttons">
          <span class="edit_save" @click="saveEdit(comment.id)">수정</span>
          <span class="edit_cancel" @click="cancelEdit">취소</span>
        </div>
        <input
          type="text"
          v-model="editedText"
          class="edit_input"
        />
      </div>

      <div v-else class="comment_text">
        {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 0 auto; 
  padding: 20px;
  background: #fff;
}

.post_box {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
}

.user_info_line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
}

.profile_img,
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}

.nickname {
  font-weight: 600;
  color: #333;
}

.date {
  color: #888;
  font-size: 13px;
}

.divider {
  margin: 0 6px;
  color: #999;
}

.icons {
  display: flex;
  gap: 15px;
}

.icon_btn {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
}

.divider_line {
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 20px;
}

.content_area {
  margin-bottom: 20px;
}

.dog_img {
  width: 260px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

/* ⬇ 댓글 영역 */
.comment_section {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.comment_label {
  display: block;
  font-weight: bold;
  margin-bottom: 30px;
}

.input_area {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.comment_input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 14px;
  outline: none;
}

.submit_btn {
  margin-left: 10px;
  background: #6A0104;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.submit_btn:hover {
  background: #800000;
}

.comment_card {
  background: #f1f1f1;
  padding: 16px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.comment_header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}

.comment_text {
  font-size: 15px;
  color: #222;
  line-height: 1.5;
}

.label_icon {
  width: 35px;
  height: 35px;
  margin-left: 3px;
  vertical-align: middle;
}

.edit_input {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  box-sizing: border-box;
}

.edit_buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 6px;
}

.edit_save,
.edit_cancel {
  font-size: 14px;
  font-weight: bold;
  color: #6c7dc6;
  cursor: pointer;
}
</style>

