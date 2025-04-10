<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>반려동물 목록</h3>

      <div class="scrollable pet-list-scroll">
        <div v-for="i in 10" :key="i" class="pet-card">
          <img src="/src/assets/images/Ellipse 12.png" class="pet-img" />
          <div class="pet-info">
            <div class="pet-name">멍멍이 {{ i }}</div>
            <div class="pet-detail">시바견 / 3살</div>
          </div>
        </div>
      </div>

      <button class="modal-close" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 500px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-content h3 {
  font-size: 20px;
  font-weight: bold;
}

.scrollable.pet-list-scroll {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

.pet-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.pet-info {
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-weight: bold;
}

.pet-detail {
  font-size: 12px;
  color: #666;
}

.modal-close {
  align-self: flex-end;
  padding: 6px 12px;
  border: none;
  background-color: #6A0104;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
