<script setup>
import { ref } from 'vue'

const content = ref('')
const fileName = ref('')

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    fileName.value = file.name
  }
}

function handleCancel() {
  content.value = ''
  fileName.value = ''
  document.getElementById('fileInput').value = ''
}

function handleSubmit() {
  console.log('답변 내용:', content.value)
  console.log('파일 이름:', fileName.value)
  // 실제 업로드 로직 작성 예정
}
</script>

<template>
  <div class="container">
    <!-- 질문 카드 -->
    <div class="post_box">
      <div class="post_title">
        <img class="icon_img" src="/src/assets/icons/question.png" alt="질문 아이콘" />
        <span class="text">강아지 중성화 수술 고민입니다.</span>
      </div>

      <div class="user_info_line">
        <div class="user_info">
          <img class="profile_img" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
          <span class="nickname">닉네임</span>
          <span class="divider">ㅣ</span>
          <span class="date">24.8.10</span>
        </div>
      </div>

      <hr class="divider_line" />

      <div class="content_area">
        <img class="dog_img" src="/src/assets/images/dog1.png" alt="강아지 이미지" />
        <p class="description">
          저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야한다고 하는데 꼭 시켜야하는 건가요?
          찾아보니 가격도 만만치 않고 엄청 아파한다고 하더라구요 ㅠㅠㅠ
        </p>
        <div class="hashtags">
          <span># 강아지</span>
          <span># 강아지 중성화</span>
        </div>
      </div>
    </div>

    <!-- 답변 입력 폼 -->
    <div class="answer_form">
      <div class="form_box">
        <img class="answer_icon" src="/src/assets/icons/answerRegister.png" alt="답변 아이콘" />

        <textarea
          class="textarea"
          placeholder="내용을 입력해주세요."
          v-model="content"
        ></textarea>

        <div class="file_area">
          <label class="file_label" for="fileInput">사진 등록</label>
          <input
            id="fileInput"
            type="file"
            class="file_input"
            @change="handleFileChange"
          />
          <span v-if="fileName" class="file_name">{{ fileName }}</span>
        </div>

        <div class="btn_area">
          <button class="btn cancel" @click="handleCancel">취소</button>
          <button class="btn submit" @click="handleSubmit">답변 등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

/* 질문 카드 스타일 */
.post_box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}
.icon_img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.user_info_line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
}
.profile_img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.divider {
  margin: 0 6px;
  color: #aaa;
}
.date {
  color: #888;
  font-size: 13px;
}
.divider_line {
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
}
.content_area {
  margin-top: 20px;
}
.dog_img {
  width: 100%;
  max-width: 260px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.description {
  font-size: 16px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 16px;
}
.hashtags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hashtags span {
  font-size: 14px;
  color: #666;
}

/* 답변 폼 스타일 */
.answer_form {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.form_box {
  display: flex;
  flex-direction: column;
}

.answer_icon {
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
}

.textarea {
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  margin-bottom: 20px;
  color: #333;
  box-sizing: border-box;
}

.file_area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  margin-bottom: 20px;
}

.file_label {
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.file_input {
  font-size: 14px;
}

.file_name {
  margin-top: 4px;
  color: #555;
  font-size: 13px;
}

.btn_area {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  min-width: 80px;
}

.btn.cancel {
  background: #fff;
  color: #800000;
  border: 1px solid #800000;
}

.btn.submit {
  background: #800000;
  color: #fff;
  border: 1px solid #800000;
}
</style>
