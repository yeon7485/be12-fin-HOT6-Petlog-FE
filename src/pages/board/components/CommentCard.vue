<script setup>
import { ref } from "vue";
import { useCommentStore } from "/src/stores/useCommentStore";

const commentStore = useCommentStore();

const props = defineProps({
  comment: Object,
  postIdx: Number,
  currentUserIdx: Number,
});

const isEditing = ref(false);
const editedText = ref(props.comment.content);

const startEdit = () => {
  isEditing.value = true;
  editedText.value = props.comment.content;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedText.value = "";
};

const editComment = async () => {
  if (editedText.value.trim() === "") {
    alert("댓글 내용을 입력해주세요");
    return;
  }
  try {
    await commentStore.editComment(props.postIdx, props.comment.idx, editedText.value);
    isEditing.value = false;
  } catch (err) {
    console.error(err);
  }
};

const deleteComment = async () => {
  try {
    await commentStore.deleteComment(props.postIdx, props.comment.idx);
  } catch (err) {
    alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<template>
  <div class="comment_card">
    <div class="comment_header">
      <img
        class="avatar"
        :src="comment.profileImageUrl || '/src/assets/images/default.png'"
        alt="프로필 이미지"
      />

      <span class="nickname">{{ comment.writer }}</span>
      <span class="divider">ㅣ</span>
      <span class="date">{{ comment.createdAt }}</span>

      <template v-if="comment.userIdx === currentUserIdx">
        <div class="btn_box">
          <img src="/src/assets/icons/edit.svg" class="icon_btn" alt="수정" @click="startEdit" />
          <img
            src="/src/assets/icons/x_button.svg"
            class="icon_btn delete"
            alt="삭제"
            @click="deleteComment"
          />
        </div>
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
  padding: 20px;
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
  line-height: normal;
}

.divider {
  margin: 0 6px;
  color: #999;
}

.btn_box {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.icon_btn {
  width: 14px;
  height: 14px;
  margin-left: 8px;
  cursor: pointer;
}

.icon_btn.delete {
  width: 10px;
  height: 10px;
}

.comment_text {
  line-height: 140%;
  padding: 10px;
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
  gap: 20px;
  margin: 0 15px 6px 0;
}

.edit_save,
.edit_cancel {
  height: 12px;
  width: 12px;
  font-size: 14px;
  color: var(--gray700);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
}

.edit_save:hover,
.edit_cancel:hover {
  font-weight: bold;
}
</style>
