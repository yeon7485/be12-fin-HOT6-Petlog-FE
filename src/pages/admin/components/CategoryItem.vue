<!-- src/components/CategoryItem.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  category: Object,
  index: Number
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => emit('edit', props.index)
const handleDelete = () => emit('delete', props.index)
</script>

<template>
  <div class="category-item">
    <div class="category-dot" :style="{ backgroundColor: category.color }"></div>
    <div class="category-name">{{ category.name }}</div>
    <div class="category-actions">
      <button class="action-button" @click="handleEdit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      <button class="action-button" @click="handleDelete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-item {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 16px;
}

.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
}

.category-name {
  flex: 1;
}

.category-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
  padding: 4px;
}

.action-button:hover {
  color: #212121;
}
</style>
