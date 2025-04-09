<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBoardStore } from '/src/stores/useBoardStore'

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()

const postId = route.params.id ? Number(route.params.id) : null
const boardTypeFromRoute = route.params.boardType || ''
const isEdit = !!postId

const boardTypes = [
  { value: 'free', label: '자유 게시판' },
  { value: 'information', label: '정보 공유' }
]

const categories = ['강아지', '고양이', '물고기', '햄스터', '도마뱀']

const form = ref({
  boardType: boardTypeFromRoute || '',
  category: '',
  title: '',
  content: '',
  images: []
})

const previewImages = ref([])

onMounted(async () => {
  if (isEdit) {
    await boardStore.fetchPosts(boardTypeFromRoute)
    const target = boardStore.posts.find(p => p.id === postId)
    if (target) {
      form.value.boardType = target.boardType || boardTypeFromRoute
      form.value.category = target.category || ''
      form.value.title = target.title || ''
      form.value.content = target.content || target.contents || ''
    }
  }
})

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

const handleCancel = () => {
  const confirmed = window.confirm('작성을 취소하시겠습니까?')
  if (confirmed) {
    if (isEdit) {
      router.push(`/board/${form.value.boardType}/post/${postId}`)
    } else {
      router.push(`/board/${form.value.boardType}`)
    }
  }
}

const handleSubmit = () => {
  const confirmed = window.confirm(isEdit ? '수정하시겠습니까?' : '등록하시겠습니까?')
  if (!confirmed) return

  const action = isEdit ? '수정' : '등록'
  const postData = {
    id: postId || Date.now(),
    boardType: form.value.boardType,
    category: form.value.category,
    title: form.value.title,
    content: form.value.content,
    images: form.value.images
  }

  console.log(`📦 게시글 ${action}:`, postData)

  alert(`${action}이 완료되었습니다`)
  router.push(`/board/${form.value.boardType}/post/${postData.id}`)
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
            :disabled="isEdit"
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
      <button @click="handleSubmit" class="submit">{{ isEdit ? '수정' : '등록' }}</button>
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
