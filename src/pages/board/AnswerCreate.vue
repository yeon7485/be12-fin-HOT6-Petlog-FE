<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnswerStore } from '/src/stores/useAnswerStore'
import { useQuestionStore } from '/src/stores/useQuestionStore'

const router = useRouter()
const route = useRoute()

const answerStore = useAnswerStore()
const questionStore = useQuestionStore()

const answerId = Number(route.params.idx)
const questionId = Number(route.params.questionId)
const isEdit = !isNaN(answerId) && answerId > 0

const content = ref('')
const fileName = ref('')
const previewImage = ref('')
const originalImage = ref('')
const question = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(async () => {
  if (questionStore.selectedQuestion) {
    question.value = questionStore.selectedQuestion
  } else {
    question.value = await questionStore.readQuestion(questionId)
  }

  if (isEdit) {
    const target = await answerStore.getAnswerByIdFromServer(answerId)
    if (target) {
      content.value = target.content
      originalImage.value = target.image
      previewImage.value = target.image
    }
  }
})

const handleCancel = () => {
  if (window.confirm('작성 중인 내용을 취소하시겠습니까?')) {
    router.push(`/board/qna/${questionId}`)
  }
}

const handleSubmit = async () => {
  const confirmed = window.confirm(isEdit ? '답변을 수정하시겠습니까?' : '답변을 등록하시겠습니까?')
  if (!confirmed) return

  try {
    if (isEdit) {
      await answerStore.updateAnswer(answerId, content.value, previewImage.value || originalImage.value || '')
      alert('답변이 수정되었습니다.')
    } else {
      await answerStore.registerAnswer(question.value.idx, content.value)
      alert('답변이 등록되었습니다.')
    }
    router.push(`/board/qna/${questionId}`)
  } catch (err) {
    alert(isEdit ? '답변 수정에 실패하였습니다.' : '답변 등록에 실패하였습니다.')
    console.error(err)
  }
}
</script>

<template>
  <div>
    <div v-if="question" class="container">
      <div class="post_box">
        <div class="post_title">
          <img class="icon_img" src="/src/assets/icons/question.png" alt="질문 아이콘" />
          <span class="text">{{ question.qTitle }}</span>
        </div>

        <div class="user_info_line">
          <div class="user_info">
            <img class="profile_img" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
            <span class="nickname">{{ question.writer }}</span>
            <span class="divider">ㅣ</span>
            <span class="date">{{ question.created_at }}</span>
          </div>
        </div>

        <hr class="divider_line" />

        <div class="content_area">
          <img class="dog_img" src="/src/assets/images/dog1.png" alt="강아지 이미지" />
          <p class="description">{{ question.content }}</p>
          <div class="hashtags">
            <span v-for="tag in question.tags" :key="tag"># {{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="link">
        <img class="link_icon" src="/src/assets/icons/link.png" alt="링크 아이콘" />
      </div>

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
            <img v-if="previewImage" :src="previewImage" alt="미리보기 이미지" class="preview_img" />
          </div>

          <div class="btn_area">
            <button class="btn cancel" @click="handleCancel">
              {{ isEdit ? '수정 취소' : '취소' }}
            </button>
            <button class="btn submit" @click="handleSubmit">
              {{ isEdit ? '수정 완료' : '답변 등록' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      질문 정보를 불러오는 중입니다...
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 1200px;
  margin: 10px auto 0 auto;
}

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

.link {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.link_icon {
  width: 48px;
  height: auto;
  opacity: 0.5;
}

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

.preview_img {
  margin-top: 10px;
  width: 120px;
  border-radius: 6px;
  border: 1px solid #ccc;
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
  background: #6A0104;
  color: #fff;
  border: 1px solid #800000;
}

.btn.submit:hover {
  background: #8b0000;
}
</style>
