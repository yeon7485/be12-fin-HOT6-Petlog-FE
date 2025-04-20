<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePetStore } from '../../stores/usePetStore'

const router = useRouter()
const petStore = usePetStore()

function getSessionUserIdx() {
  const user = sessionStorage.getItem('user')
  if (user) {
    const parsedUser = JSON.parse(user)
    return parsedUser.idx
  }
  return null
}

const statuses = ['정상', '실종', '파양', '사망']
const card = ref({
  id: '',
  name: '',
  breed: '',
  gender: '',
  birthDate: '',
  isNeutering: false,
  specificInformation: '',
  status: '',
  userId: ''
})

onMounted(async () => {
  const userId = getSessionUserIdx()
  if (!userId) {
    alert('로그인 정보가 없습니다.')
    router.push('/user/login')
    return
  }

  try {
    const petId = router.currentRoute.value.params.petId
    await petStore.fetchPetById(petId)

    card.value = {
      id: petStore.petDetail.id,
      name: petStore.petDetail.name,
      breed: petStore.petDetail.breed,
      gender: petStore.petDetail.gender,
      birthDate: petStore.petDetail.birthDate,
      isNeutering: petStore.petDetail.isNeutering,
      specificInformation: petStore.petDetail.specificInformation,
      status: petStore.petDetail.status,
      userId: userId
    }
  } catch (err) {
    console.error('불러오기 실패:', err)
  }
})

const saveCard = async () => {
  try {
    await petStore.updatePet(card.value)
    alert("카드가 성공적으로 수정되었습니다!")
    router.push("/mypage/cardlist")
  } catch (err) {
    alert("수정 중 오류가 발생했습니다.")
  }
}

const goToCardList = () => {
  router.push("/mypage/cardlist")
}
</script>

<template>
  <h1 class="title">반려동물 정보 수정</h1>
  <div class="form-container">

    <!-- 프로필 사진 (나중에 처리) -->
    <div class="profile-section">
      <img src="/src/assets/images/cat1.jpg" class="profile-img" />
    </div>

    <!-- 이름 -->
    <input v-model="card.name" placeholder="이름" class="input" />

    <!-- 성별 -->
    <div class="gender-section">
      <label><input type="radio" value="♂️" v-model="card.gender" /> ♂️</label>
      <label><input type="radio" value="♀️" v-model="card.gender" /> ♀️</label>
      <label><input type="checkbox" v-model="card.isNeutering" /> 중성화 유무</label>
    </div>

    <!-- 생일 -->
    <div class="birthdate-section">
      <input type="date" v-model="card.birthDate" />
    </div>

    <!-- 품종 -->
    <input v-model="card.breed" placeholder="품종" class="input" />

    <!-- 특이사항 -->
    <textarea v-model="card.specificInformation" placeholder="특이사항" class="textarea" />

    <!-- 상태 -->
    <div class="status-section">
      <label v-for="s in statuses" :key="s" class="status-option">
        <input type="radio" :value="s" v-model="card.status" />
        {{ s }}
      </label>
    </div>

    <!-- 버튼 그룹 -->
    <div class="button-group">
      <button @click="goToCardList" class="cancel-btn">취소</button>  <!-- 취소 버튼 -->
      <button @click="saveCard" class="save-btn">저장</button>  <!-- 저장 버튼 -->
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: 60%;
  width: fit-content;
}

.form-container {
  background: #fdf6e3;
  width: 400px;
  margin: 30px auto;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 20px;
  
}

.input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

.textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 8px 0;
  resize: none;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

.gender-section,
.status-section,
.birthdate-section {
  margin: 10px 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
}

.status-option {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 4px 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn {
  background: #eee;
}

.save-btn {
  background: #800000;
  color: #fff;
}
.birthdate-section{
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white; /* ✅ 배경색 흰색으로 고정 */
  color: #000; /* 텍스트 색은 검정색 */
}

</style>
