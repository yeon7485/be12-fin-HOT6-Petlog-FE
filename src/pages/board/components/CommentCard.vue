<script setup>
import { ref } from 'vue'
import { useCommentStore } from '/src/stores/useCommentStore'

const commentStore = useCommentStore()

const props = defineProps({
  comment: Object,
  postIdx: Number,
  currentUserIdx: Number
})

const isEditing = ref(false)
const editedText = ref(props.comment.content)

const startEdit = () => {
  isEditing.value = true
  editedText.value = props.comment.content
}

const cancelEdit = () => {
  isEditing.value = false
  editedText.value = ''
}

const editComment = async () => {
  if (editedText.value.trim() === '') {
    alert('댓글 내용을 입력해주세요')
    return
  }
  try {
    await commentStore.editComment(props.postIdx, props.comment.idx, editedText.value)
    isEditing.value = false
  } catch (err) {
    console.error(err)
  }
}

const deleteComment = async () => {
  try {
    await commentStore.deleteComment(props.postIdx, props.comment.idx)
  } catch (err) {
    alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.")
  }
}
</script>

<template>
  <div class="comment_card">
    <div class="comment_header">
      <img class="avatar" :src="comment.profileImageUrl || '/src/assets/images/default.png'" alt="프로필 이미지" />

      <span class="nickname">{{ comment.writer }}</span>
      <span class="divider">ㅣ</span>
      <span class="date">{{ comment.createdAt }}</span>

      <template v-if="comment.userIdx === currentUserIdx">
        <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정" @click="startEdit" />
        <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제" @click="deleteComment" />
      </template>
    </div>

    <div v-if="isEditing">
      <div class="edit_buttons">
        <span class="edit_save" @click="editComment">수정</span>
        <span class="edit_cancel" @click="cancelEdit">취소</span>
      </div>
      <input type="text" v-model="editedText" class="edit_input" />
    </div>

    <div v-else class="comment_text">
      {{ comment.content }}
    </div>
  </div>
</template>



<style scoped>
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

.icon_btn {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
}

.comment_text {
  font-size: 15px;
  color: #222;
  line-height: 1.5;
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
  height: 12px;
  width: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #6c7dc6;
  cursor: pointer;
}
</style>