<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 프로필 이미지 경로
const profileImage = '/src/assets/images/dog1.png';

// 라우터 사용
const router = useRouter();

// 카드 정보
const card = ref({
  name: "봄",
  age: "8살",
  breed: "말티즈",
  gender: "♀️", // 성별 아이콘
  birthdate: "2017.04.01",
  neutered: true,
  notes: "슬개골 수술\n온순하고 착하고 귀엽고",
});

// 목록으로 이동하는 함수
const goToList = () => {
  router.push('/mypage/cards');
};
</script>

<template>
  <div class="card-detail">
    <!-- 목록으로 돌아가기 버튼 -->
    <button @click="goToList" class="back-button">← 목록으로</button>

    <div class="card-container">
      <!-- 상단 우측 수정/삭제 버튼 -->
      <div class="card-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>

      <!-- 프로필 정보 -->
      <div class="profile-section">
        <img :src="profileImage" alt="프로필 이미지" class="profile-img" />
        <h2 class="name">{{ card.name }}</h2>
        <p class="sub-info">{{ card.age }} · {{ card.breed }} {{ card.gender }}</p>
      </div>

      <!-- 정보 박스 -->
      <div class="info-box">
        <p><strong>생일</strong> <span>{{ card.birthdate }}</span></p>
        <p><strong>중성화 여부</strong> 
          <span v-if="card.neutered">✅</span>
          <span v-else>❌</span>
        </p>
        <p class="notes">
          <strong>특이사항</strong>
          <span v-html="card.notes.replace(/\n/g, '<br>')"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
}


.back-button {
  align-self: flex-start;
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 250px;
}

.card-container {
  position: relative;
  background: #fdf6e3; 
  border-radius: 16px;
  padding: 20px;
  width: 350px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}


.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}


.profile-section {
  text-align: center;
  margin-bottom: 10px;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.name {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.sub-info {
  font-size: 14px;
  color: #666;
}


.info-box {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
}


.info-box p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0; 
}


.notes {
  align-items: flex-start; 
}

.notes span {
  text-align: right; 
  white-space: pre-line; 
  max-width: 60%; 
}
</style>
