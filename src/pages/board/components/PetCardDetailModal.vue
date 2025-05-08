<script setup>
import { ref, watch } from "vue";
import { usePetStore } from "/src/stores/usePetStore";

const props = defineProps({
  petId: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const store = usePetStore();
const card = ref(null);
const profileImage = ref("");

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  let month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const fetchPetDetail = async () => {
  try {
    const data = await store.fetchPetById(props.petId);

    const imageUrl = data.profileImageUrl
      ? data.profileImageUrl
      : "/src/assets/images/image_not_found.png";

    card.value = {
      name: data.name,
      age: calculateAge(data.birthDate),
      breed: data.breed,
      gender: data.gender,
      birthDate: data.birthDate,
      specificInformation: data.specificInformation,
      profileImageUrl: imageUrl,
      isNeutering: data.isNeutering,
      status: data.status,
    };

    profileImage.value = imageUrl;
  } catch (e) {
    console.error("🐾 반려동물 상세 불러오기 실패:", e);
  }
};

watch(() => props.petId, fetchPetDetail, { immediate: true });
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="card-detail" v-if="card">
      <button class="close-btn" @click="emit('close')">✖</button>

      <div class="card-container">
        <div class="profile-section">
          <img :src="profileImage" alt="프로필 이미지" class="profile-img" />
          <h2 class="name">{{ card.name }}</h2>
          <p class="sub-info">
            <span
              class="gender"
              :class="{
                male: card.gender === '남' || card.gender === 'male',
                female: card.gender === '여' || card.gender === 'female',
              }"
            >
              {{ card.gender === "남" || card.gender === "male" ? "♂" : "♀" }}
            </span>
          </p>
        </div>

        <div class="info-box">
          <p>
            <strong>생일</strong><span>{{ card.birthDate }}</span>
          </p>
          <p>
            <strong>중성화 여부</strong><span>{{ card.isNeutering ? "✅" : "❌" }}</span>
          </p>
          <p>
            <strong>나이</strong><span>{{ card.age }}살</span>
          </p>
          <p>
            <strong>품종</strong><span>{{ card.breed }}</span>
          </p>
          <p>
            <strong>상태</strong><span>{{ card.status || "정보 없음" }}</span>
          </p>
          <p class="notes">
            <strong>특이사항</strong>
            <span v-html="card.specificInformation?.replace(/\n/g, '<br>') || '없음'"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-detail {
  position: relative;
  width: 420px;
  background: #fdf6e3;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #444;
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
  margin-bottom: 10px;
}

.sub-info {
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.gender {
  font-size: 18px;
}
.male {
  color: blue;
}
.female {
  color: red;
}

.info-box {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;
  text-align: left;
}

.info-box p {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
}

.notes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.notes span {
  white-space: pre-line;
  margin-top: 4px;
}
</style>
