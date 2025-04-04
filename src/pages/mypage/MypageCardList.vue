<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 카드 생성 페이지로 이동하는 함수
const goToCreateCard = () => {
  router.push('/mypage/card/create');
};

// 반려동물 데이터 (예제)
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
        <img :src="pet.image" alt="반려동물 사진" class="pet-image" />
        <h3 class="pet-name">
          {{ pet.name }}
          <span :class="{ 'male': pet.gender === 'male', 'female': pet.gender === 'female' }">
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
/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  position: relative; /* 버튼 위치 조정을 위해 필요 */
  padding-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between; /* 좌우 끝으로 배치 */
  align-items: center;
  width: 100%;
  max-width: 1000px; /* 제목과 버튼이 너무 퍼지지 않도록 */
  margin-bottom: 20px; /* 제목과 카드 사이 여백 */
  position: absolute;
  top: 0; /* 화면 위쪽에 고정 */
}


/* 제목 (사용자가 직접 위치 조정 가능) */
.title {
  font-size: 32px;
  font-weight: bold;
  margin-left: 10px;
}

/* 추가 버튼 (사용자가 직접 위치 조정 가능) */
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

/* 카드들을 한 줄에 최대 3개씩 정렬 */
.pet-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 20px;
  justify-content: center;
  max-width: 800px;
  margin-top: 50px;
}

/* 반려동물 카드 */
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

/* 반려동물 사진 */
.pet-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

/* 반려동물 이름 */
.pet-name {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 반려동물 추가 정보 (나이, 품종) */
.pet-info {
  font-size: 16px;
  color: #444;
  margin: 10px 0; /* 간격 넓힘 */
}

/* 성별 아이콘 색상 */
.male {
  color: blue;
}

.female {
  color: red;
}
</style>
