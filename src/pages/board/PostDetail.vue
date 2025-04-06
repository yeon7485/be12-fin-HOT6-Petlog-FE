<script setup>
import { ref } from 'vue';

const newComment = ref('');
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
]);

const addComment = () => {
  if (newComment.value.trim() === '') return;
  comments.value.push({
    id: Date.now(),
    author: '익명',
    date: new Date().toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\./g, '.'),
    text: newComment.value,
    editable: true,
  });
  newComment.value = '';
};
</script>

<template>
  <div class="wrapper">
    <div class="post_box">
      
      <div class="post_title">
        <span class="text">강아지 키울 때 꿀팁 공유!</span>
      </div>

      <div class="user_info_line">
        <div class="user_info">
          <img class="profile_img" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
          <span class="nickname">닉네임</span>
          <span class="divider">ㅣ</span>
          <span class="date">24.8.10</span>
        </div>
        <div class="icons">
          <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정 아이콘" />
          <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제 아이콘" />
        </div>
      </div>

      <hr class="divider_line" />

      <div class="content_area">
        <img class="dog_img" src="/src/assets/images/dog1.png" alt="강아지 이미지" />
        <p class="description">
          강아지 1마리 키우시는 분들 약간 꿀팁아닌 꿀팁 드리자면 한 마리 키우면 
        </p>
        <p class="description">
          애기가 너무 외로워할 수 있으니 한 마리 더 키우면 즐거움 2배 + 행복 2배 + 사료값 2배
        </p>
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

    <div class="comment_card" v-for="comment in comments" :key="comment.id">
      <div class="comment_header">
        <img class="avatar" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
        <span class="nickname">{{ comment.author }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ comment.date }}</span>
        <template v-if="comment.editable">
          <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정" />
          <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제" />
        </template>
      </div>
      <div class="comment_text">
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
  width: 1800%;
  max-width: 1000px;
  margin: 0 auto;          /* 가운데 정렬 */
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


</style>
