<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '/src/stores/useQuestionStore'
import PetCardModal from '/src/pages/board/components/PetCardModal.vue'
import PetCardListModal from '/src/pages/board/components/PetCardListModal.vue'

const route = useRoute()
const router = useRouter()
const store = useQuestionStore()

const questionIdx = route.params.idx ? Number(route.params.idx) : null
const isEdit = computed(() => !!questionIdx)

const isModalOpen = ref(false)
const form = ref({
  qTitle: '',
  content: '',
  tags: '',
  file: null,
  image: '',
})
const selectedPets = ref([])

onMounted(async () => {
  if (isEdit.value) {
    const data = await store.readQuestion(questionIdx)
    form.value.qTitle = data.qTitle
    form.value.content = data.content
    form.value.tags = data.tags.join(', ')
    form.value.image = data.image || ''
    selectedPets.value = data.petList || []
  }
})

const handleFileChange = (event) => {
  form.value.file = Array.from(event.target.files)
}

const handleCancel = () => {
  if (window.confirm('작성 중인 내용을 취소하시겠습니까?')) {
    router.go(-1)
  }
}

const handleSubmit = async () => {
  if (!window.confirm(isEdit.value ? '질문을 수정하시겠습니까?' : '질문을 등록하시겠습니까?')) return

  const tagsArray = form.value.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  const questionData = {
    qTitle: form.value.qTitle,
    content: form.value.content,
    tags: tagsArray,
    image: form.value.image || '',
    selected: false,
    file: form.value.file,
    petIdxList: selectedPets.value.map(p => p.idx)
  }

  try {
    if (isEdit.value) {
      await store.updateQuestion(questionIdx, questionData)
      alert('질문이 수정되었습니다.')
      router.push(`/board/qna/${questionIdx}`)
    } else {
      await store.createQuestion(questionData)
      await store.fetchQuestions()
      alert('질문이 등록되었습니다.')
      router.push('/board/qna')
    }
  } catch (err) {
    alert(isEdit.value ? '수정 실패하였습니다.' : '등록 실패하였습니다.')
    console.error(err)
  }
}

const selectPetCard = () => {
  isModalOpen.value = true
}
const handleSelectPet = (pet) => {
  if (!selectedPets.value.find(p => p.idx === pet.idx)) {
    selectedPets.value.push(pet)
  }
  isModalOpen.value = false
}
const removePet = (idx) => {
  selectedPets.value = selectedPets.value.filter(p => p.idx !== idx)
}
</script>

<template>
  <div class="qna_container">
    <h1 class="title">Q&A {{ isEdit ? '수정' : '등록' }}</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_group">
        <label>제목</label>
        <input type="text" v-model="form.qTitle" placeholder="제목을 입력해주세요." required />
      </div>

      <div class="form_group">
        <label>내용</label>
        <textarea v-model="form.content" placeholder="내용을 입력해주세요." rows="10" required />
      </div>

      <div class="form_group">
        <label>해시태그</label>
        <input type="text" v-model="form.tags" placeholder="예) 강아지, 고양이 중성화" />
      </div>

      <div class="form_group">
        <label>사진 등록</label>
        <input type="file" multiple @change="handleFileChange" />
      </div>

      <div class="form_group">
        <label>반려동물 카드 등록</label>
        <button type="button" class="petcard_btn" @click="selectPetCard">카드 선택</button>
      </div>

      <div v-if="selectedPets.length > 0" class="selected-pet-preview">
        <label>선택된 반려동물</label>
        <div class="pet-preview-list">
          <div v-for="pet in selectedPets" :key="pet.idx" class="pet-preview-item">
            <PetCardModal :pet="{ ...pet, image: pet.profileImageUrl || '/default-profile.png' }" />
            <button class="remove-btn" @click="removePet(pet.idx)">❌</button>
          </div>
        </div>
      </div>

      <PetCardListModal v-if="isModalOpen" @close="isModalOpen = false" @select="handleSelectPet" />

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

.pet-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.pet-preview-item {
  position: relative;
}
.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  background: transparent;
  color: #6727a3;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
