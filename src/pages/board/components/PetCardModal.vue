<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  pet: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click', props.pet)
}
</script>

<template>
  <div class="pet-card" @click="handleClick">
    <img
      :src="pet.image"
      alt="반려동물 사진"
      class="pet-image"
    />
    <div class="pet-info-wrapper">
      <h3 class="pet-name">
        {{ pet.name }}
        <span :class="{ male: pet.gender === 'male', female: pet.gender === 'female' }">
          {{ pet.gender === 'male' ? '♂' : '♀' }}
        </span>
      </h3>
      <p class="pet-info">{{ pet.breed }}</p>
    </div>
  </div>
</template>

<style scoped>
.pet-card {
  width: 100%;
  max-width: 500px;
  height: 140px;
  background: #f8f1ea;
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pet-card:hover {
  background-color: #f3e9dc;
}

.pet-image {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.pet-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.pet-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.pet-info {
  font-size: 14px;
  color: #444;
}

.male {
  color: blue;
}

.female {
  color: red;
}
</style>
