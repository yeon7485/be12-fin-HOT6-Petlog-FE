<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '/src/stores/useQuestionStore'
import AnimalCardModal from '/src/pages/board/components/AnimalCardModal.vue'

const route = useRoute()
const router = useRouter()
const store = useQuestionStore()

const questionIdx = route.params.idx ? Number(route.params.idx) : null
const isEdit = !!questionIdx

const isModalOpen = ref(false)

const selectPetCard = () => {
  isModalOpen.value = true
}

const form = ref({
  qTitle: '',
  content: '',
  tags: '',
  file: null,
})

onMounted(async () => {
  await store.fetchQuestions()

  if (isEdit) {
    const target = store.questions.find(q => q.idx === questionIdx)
    if (target) {
      form.value.qTitle = target.qTitle
      form.value.content = target.content
      form.value.tags = target.tags.join(', ')
    }
  }
})

const handleFileChange = (event) => {
  form.value.file = event.target.files[0]
}

const handleCancel = () => {
  const confirmed = window.confirm('작성 중인 내용을 취소하시겠습니까?')
  if (confirmed) {
    router.go(-1)
  }
}

const handleSubmit = async () => {
  const confirmed = window.confirm(isEdit ? '질문을 수정하시겠습니까?' : '질문을 등록하시겠습니까?')
  if (!confirmed) return

  const tagsArray = form.value.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  const questionData = {
    qTitle: form.value.qTitle,
    content: form.value.content,
    tags: tagsArray,
    writer: '닉네임',
    created_at: new Date().toLocaleDateString('ko-KR'),
    status: '미해결',
    commentCount: 0,
  }

  if (isEdit) {
    alert('수정 기능은 아직 백엔드 연동되지 않았습니다.')
    router.push(`/board/qna/${questionIdx}`)
  } else {
    try {
      await store.createQuestion(questionData)
      await store.fetchQuestions() 
      alert('질문이 등록되었습니다.')
      router.push('/board/qna')
    } catch (err) {
      alert('등록 실패하였습니다.')
    }
  }
}
</script>

<template>
  <div class="qna_container">
    <h1 class="title">Q&A {{ isEdit ? '수정' : '등록' }}</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="form.qTitle" placeholder="제목을 입력해주세요." required />
      </div>

      <div class="form_group">
        <label for="content">내용</label>
        <textarea id="content" v-model="form.content" placeholder="내용을 입력해주세요." rows="10" required></textarea>
      </div>

      <div class="form_group">
        <label for="tags" >해시태그</label>
        <input type="text" id="tags" v-model="form.tags" placeholder="예) 강아지, 강아지 중성화" />
      </div>

      <div class="form_group">
        <label for="file">사진 등록</label>
        <input type="file" id="file" @change="handleFileChange" />
      </div>

      <div class="form_group">
        <label>반려동물 카드 등록</label>
        <button @click="selectPetCard" class="petcard_btn">카드 선택</button>
      </div>

      <AnimalCardModal v-if="isModalOpen" @close="isModalOpen = false" />

      <div class="form_actions">
        <button type="button" class="cancel_button" @click="handleCancel">취소</button>
        <button type="submit" class="submit_button">{{ isEdit ? '수정' : '등록' }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.qna_container {
  max-width: 1200px;
  margin: 0 auto 40px auto;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.title {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
}

.form_group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  width: 100%;
  padding: 6px 0;
  border: none;
  background-color: transparent;
}

textarea {
  resize: vertical;
}

.form_actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

.cancel_button,
.submit_button {
  padding: 10px 24px;
  border: 1px solid #a14f4f;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.cancel_button {
  background-color: #fff;
  color: #a14f4f;
}

.submit_button {
  background-color: #6A0104;
  color: #fff;
}

.submit_button:hover {
  background: #8b0000;
}

.petcard_btn {
  padding: 4px 10px;
  font-size: 14px;
  width: 90px;
  border: 1px solid #ccc;
  background-color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

.petcard_btn:hover {
  background-color: #f5f5f5;
}
</style>
