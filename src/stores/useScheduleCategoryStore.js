// stores/useScheduleCategoryStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScheduleCategoryStore = defineStore('scheduleCategory', () => {
  const categories = ref([
    { name: '방문', color: '#00bcd4' },
    { name: '미팅실', color: '#e91e63' },
    { name: '산책', color: '#4caf50' },
    { name: '기타', color: '#9e9e9e' }
  ])

  const colors = [
    '#00bcd4', '#e91e63', '#4caf50', '#9e9e9e',
    '#ff9800', '#673ab7', '#3f51b5', '#795548'
  ]

  const addCategory = (newCategory) => {
    if (newCategory.name.trim()) {
      categories.value.push({
        name: newCategory.name,
        color: newCategory.color
      })
    }
  }

  const deleteCategory = (index) => {
    categories.value.splice(index, 1)
  }

  const getCategory = (index) => {
    return categories.value[index]
  }

  return {
    categories,
    colors,
    addCategory,
    deleteCategory,
    getCategory
  }
})
