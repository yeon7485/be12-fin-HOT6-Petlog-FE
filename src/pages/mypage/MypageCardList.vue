<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMypageCard } from '../../stores/useMypageCard.js'
import { storeToRefs } from 'pinia'
import PetCard from '../../pages/mypage/components/MypagePetCard.vue'

const store = useMypageCard()
const { fetchPets } = store
const { pets } = storeToRefs(store) // ✅ 반응형 연결

const router = useRouter()
const userId = 1

onMounted(async () => {
  await fetchPets(userId)
})

const goToCreateCard = () => {
  router.push('/mypage/card/create')
}

const goToDetail = (pet) => {
  router.push(`/mypage/card/detail/${pet.idx}`)
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">내 반려동물</h2>
      <button class="add-button" @click="goToCreateCard">➕</button>
    </div>

    <div class="pet-cards" v-if="pets.length">
      <PetCard
        v-for="pet in pets"
        :key="pet.idx"
        :pet="pet"
        @click="() => goToDetail(pet)"
      />
    </div>
    <div v-else style="margin-top: 150px;">반려동물이 없습니다.</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-left: 70px;
}

.add-button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 20px 0 80px; 
}

.pet-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  max-width: 800px;
  margin-top: 50px;
}
</style>
