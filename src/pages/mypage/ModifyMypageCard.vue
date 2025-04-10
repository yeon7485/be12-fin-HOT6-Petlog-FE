<script setup>
import { ref, onMounted } from 'vue';

const card = ref({
  name: '',
  breed: '',
  gender: '',
  birthdate: '',
  neutered: false,
  notes: '',
  status: '',
});

onMounted(() => {
  card.value = {
    name: '빙빙',
    breed: '코리안숏헤어',
    gender: '♀️',
    birthdate: '2017-04-01',
    neutered: true,
    notes: '성격 더러움\n꼬리가 잘려있음',
    status: '정상',
  };
});

const statuses = ['정상', '실종', '파양', '사망'];
</script>

<template>
  <h1 class ="title">반려동물 정보 수정</h1>
  <div class="form-container">
    

    <div class="profile-section">
      <img src="/src/assets/images/cat1.jpg" class="profile-img" />
    </div>

    <input v-model="card.name" placeholder="이름" class="input" />

    <div class="gender-section">
      <label><input type="radio" value="♂️" v-model="card.gender" /> ♂️</label>
      <label><input type="radio" value="♀️" v-model="card.gender" /> ♀️</label>
      <label><input type="checkbox" v-model="card.neutered" /> 중성화 유무</label>
    </div>

    <div class="birthdate-section">
      <input type="date" v-model="card.birthdate" />
    </div>

    <input v-model="card.breed" placeholder="품종" class="input" />
    <textarea v-model="card.notes" placeholder="특이사항" class="textarea" />

    <div class="status-section">
      <label v-for="s in statuses" :key="s" class="status-option">
        <input type="radio" :value="s" v-model="card.status" />
        {{ s }}
      </label>
    </div>

    <div class="button-group">
      <button class="cancel-btn">취소</button>
      <button class="save-btn">저장</button>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: 410px;
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
