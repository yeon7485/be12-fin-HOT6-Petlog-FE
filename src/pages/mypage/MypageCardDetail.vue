<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const card = ref({
  name: "빙빙",
  age: "8살",
  breed: "코리안숏헤어",
  gender: "♀️",
  birthdate: "2017.04.01",
  neutered: true,
  notes: "성격 더러움\n꼬리가 잘려있음",
});

const profileImage = '/src/assets/images/cat1.jpg';

const goToEdit = () => {
  router.push('/mypage/card/change');
};

const goToList = () => {
  router.push('/mypage/card');
};

// ✅ 삭제 함수 추가
const deleteCard = () => {
  const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
  if (confirmDelete) {
    // 실제 API가 있다면 여기서 호출
    // await axios.delete(`/api/cards/${cardId}`)

    // 일단 로컬에서 삭제 시뮬레이션
    alert('삭제되었습니다.');
    router.push('/mypage/card'); // 목록으로 이동
  }
};
</script>

<template>
  <div class="card-detail">
    <button @click="goToList" class="back-button">← 목록으로</button>

    <div class="card-container">
      <div class="card-actions">
        <button class="edit-btn" @click="goToEdit">✏️</button>
        <button class="delete-btn" @click="deleteCard">🗑️</button>
      </div>

      <div class="profile-section">
        <img :src="profileImage" alt="프로필 이미지" class="profile-img" />
        <h2 class="name">{{ card.name }}</h2>
        <p class="sub-info">{{ card.age }} · {{ card.breed }} {{ card.gender }}</p>
      </div>

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
  padding: 10px 30px 10px 5px; 
  margin-left: 170px;
}

.card-container {
  position: relative;
  background: #fdf6e3;
  border-radius: 16px;
  padding: 20px;
  width: 400px;
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
