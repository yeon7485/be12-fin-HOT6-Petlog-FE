<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 카드 생성 페이지로 이동
const goToCreateCard = () => {
  router.push('/mypage/card/create');
};

// 모든 카드 클릭 시 디테일 페이지로 이동
const goToDetail = () => {
  router.push('/mypage/card/detail');
};

// 반려동물 더미 데이터
const pets = [
  { id: 1, name: '봄', age: '8살', breed: '말티즈', gender: 'female', image: '/src/assets/images/dog1.png' },
  { id: 2, name: '구름', age: '8살', breed: '말티즈', gender: 'male', image: '/src/assets/images/dog2.jpeg' },
  { id: 3, name: '썬더', age: '1살', breed: '말티즈', gender: 'male', image: '/src/assets/images/dog2.jpeg' },
  { id: 4, name: '솜', age: '8살', breed: '스코티시 스트레이트', gender: 'female', image: '/src/assets/images/cat1.jpg' },
  { id: 5, name: '빙봉', age: '6살', breed: '코리안숏헤어', gender: 'male', image: '/src/assets/images/cat2.jpg' }
];
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">내 반려동물</h2>
      <button class="add-button" @click="goToCreateCard">➕</button>
    </div>

    <div class="pet-cards">
      <div v-for="pet in pets" :key="pet.id" class="pet-card">
        <img
          :src="pet.image"
          alt="반려동물 사진"
          class="pet-image"
          @click="goToDetail"
          style="cursor: pointer;"
        />
        <h3 class="pet-name">
          {{ pet.name }}
          <span :class="{ male: pet.gender === 'male', female: pet.gender === 'female' }">
            {{ pet.gender === 'male' ? '♂' : '♀' }}
          </span>
        </h3>
        <p class="pet-info">{{ pet.age }}</p>
        <p class="pet-info">{{ pet.breed }}</p>
      </div>
    </div>
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
  margin-left: 10px;
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

.pet-card {
  width: 230px;
  height: 250px;
  background: #f8f1ea;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pet-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.pet-name {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-info {
  font-size: 16px;
  color: #444;
  margin: 10px 0;
}

.male {
  color: blue;
}

.female {
  color: red;
}
</style>
