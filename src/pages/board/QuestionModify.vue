<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  title: '강아지 중성화 수술 고민입니다.',
  content: `저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야한다고 하는데 꼭 시켜야하는 건가요? 찾아보니 가격도 만만치 않고 엄청 아파한다고 하더라고요 ㅠㅠㅠ`,
  tags: '# 강아지 # 강아지 중성화',
  file: null
})

const preview = ref('/src/assets/images/dog1.png')

const handleFileChange = (e) => {
  const file = e.target.files[0]
  form.value.file = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      preview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleCancel = () => {
  const confirmed = window.confirm('작성 중인 내용을 취소하시겠습니까?')
  if (confirmed) {
    router.push('/board/qna/1')
  }
}

const handleSubmit = () => {
  const confirmed = window.confirm('질문을 등록하시겠습니까?')
  if (confirmed) {
    alert('질문이 등록되었습니다.')
    console.log('등록된 데이터:', form.value)
    // TODO: 서버 전송 로직
  }
}
</script>

<template>
  <div class="qna_container">
    <h1 class="title">Q&A</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>

      <div class="form_group">
        <label for="content">내용</label>
        <textarea id="content" v-model="form.content" rows="10" required></textarea>
      </div>

      <div class="form_group">
        <label for="tags">태그 (1개 이상)</label>
        <input type="text" id="tags" v-model="form.tags" />
      </div>

      <div class="form_group">
        <label for="file">사진 등록</label>
        <input type="file" id="file" @change="handleFileChange" />
        <img :src="preview" alt="미리보기" class="preview_img" />
      </div>

      <div class="form_actions">
        <button type="button" class="cancel_button" @click="handleCancel">취소</button>
        <button type="submit" class="submit_button">등록</button>
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

textarea {
  resize: vertical;
}

input[type="file"] {
  width: 100%;
  padding: 6px 0;
  border: none;
  background-color: transparent;
}

.preview_img {
  margin-top: 12px;
  width: 120px;
  height: auto;
  border-radius: 6px;
  border: 1px solid #ddd;
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
</style>
