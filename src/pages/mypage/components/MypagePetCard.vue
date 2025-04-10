<!-- src/components/PetCard.vue -->
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
  <div class="pet-card">
    <img
      :src="pet.image"
      alt="반려동물 사진"
      class="pet-image"
      @click="handleClick"
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
</template>

<style scoped>
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
