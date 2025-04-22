<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="pet-detail-modal">
      <button class="modal-close-icon" @click="$emit('close')">✕</button>
      <img :src="pet.image" class="detail-pet-img" />
      <h2>
        {{ pet.name }}
        <span class="gender" v-if="pet.gender === '여'">♀</span>
        <span class="gender" v-else>♂</span>
      </h2>
      <p class="pet-subinfo">{{ pet.age }} {{ pet.breed }}</p>

      <div class="pet-info-box">
        <div class="info-row">
          <span class="label">생일</span>
          <span>{{ pet.birth }}</span>
        </div>
        <div class="info-row">
          <span class="label">중성화 여부</span>
          <span>{{ pet.neutered ? "✅" : "❌" }}</span>
        </div>
        <div class="info-row">
          <span class="label">특이사항</span>
          <span style="white-space: pre-line">{{ pet.specialNote }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pet: Object,
});
defineEmits(["close"]);
</script>
<style scoped>
/* ✅ 모달 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.pet-detail-modal {
  background: #fff4ec;
  border-radius: 20px;
  padding: 24px;
  width: 480px;
  height: 480px;
  position: relative;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  /* ✅ 추가 */
  display: flex;
  flex-direction: column;
}

.modal-close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.detail-pet-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.gender {
  color: #d04b4b;
  font-size: 16px;
  margin-left: 4px;
}

.pet-subinfo {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

.pet-info-box {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  color: #333;
  margin-top: auto; /* ✅ 아래로 밀기 */
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  color: #777;
}
</style>
