<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const postId = 1

const boardTypes = [
  { value: 'free', label: '자유 게시판' },
  { value: 'info', label: '정보 공유' }
]

const categories = ['강아지', '고양이', '물고기', '햄스터', '도마뱀']

const form = ref({
  boardType: 'free',
  category: '강아지',
  title: '강아지 키울 때 꿀팁 공유!',
  content: `강아지 1마리 키우시는 분들 약간 꿀팁아닌 꿀팁 드리자면 한 마리 키우면 애기가 너무 외로워할 수 있으니 한 마리 더 키우면 즐거움 2배 + 행복 2배 + 사료값 2배`,
  images: []
})

const previewImages = ref([])

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  form.value.images = files

  previewImages.value = []
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

onMounted(() => {
  previewImages.value = ['/src/assets/images/dog1.png']
})

const handleCancel = () => {
  const confirmed = window.confirm('작성 중인 내용을 취소하시겠습니까?')
  if (confirmed) {
    router.push(`/board/post/${postId}`)
  }
}

const handleModify = () => {
  const confirmed = window.confirm('변경 내용을 수정하시겠습니까?')
  if (confirmed) {
    alert('수정이 완료되었습니다')
  }
}
</script>

<template>
  <div class="container">
    <div class="board_select">
      <label class="section_title">게시판 선택</label>
      <div class="radio_group">
        <label v-for="item in boardTypes" :key="item.value" class="radio_option">
          <input
            type="radio"
            :value="item.value"
            v-model="form.boardType"
            name="boardType"
          />
          {{ item.label }}
        </label>
      </div>
    </div>

    <div class="form_group">
      <label>카테고리</label>
      <select v-model="form.category">
        <option disabled value="">카테고리를 선택하세요.</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="form_group">
      <label>제목</label>
      <input type="text" v-model="form.title" placeholder="제목을 입력해주세요." />
    </div>

    <div class="form_group">
      <label>내용</label>
      <textarea v-model="form.content" placeholder="내용을 입력해주세요." rows="8" />
    </div>

    <div class="form_group">
      <label>사진 등록</label>
      <input type="file" multiple @change="handleFileChange" />
      <div v-if="previewImages.length > 0" class="image_preview">
        <div v-for="(img, index) in previewImages" :key="index">
          <img :src="img" class="preview" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="handleCancel" class="cancel">취소</button>
      <button @click="handleModify" class="submit">수정</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto 40px auto;
  padding: 40px;
  font-family: sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.section_title {
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 40px;
  display: block;
}

.board_select {
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
}

.radio_group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.radio_option {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.form_group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

select {
  width: 40%;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="text"],
textarea,
select {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}

input[type="file"] {
  margin-top: 8px;
}

.image_preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.cancel {
  background-color: white;
  color: #963a3a;
  border: 1px solid #963a3a;
}

.cancel:hover {
  background-color: #963a3a;
  color: white;
}

.submit {
  background-color: #6A0104;
  color: white;
  border: none;
}

.submit:hover {
  background-color: #7a2b2b;
  color: white;
}
</style>
