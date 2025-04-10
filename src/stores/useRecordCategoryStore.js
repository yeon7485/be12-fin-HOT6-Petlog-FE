// stores/useRecordCategoryStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordCategoryStore = defineStore('recordCategory', () => {
  const categories = ref([
    { name: '체중', color: '#4caf50' },
    { name: '이상현상', color: '#f44336' },
    { name: '배변상태', color: '#795548' },
    { name: '수면시간', color: '#3f51b5' },
    { name: '체온', color: '#ff9800' },
    { name: '오늘의사진', color: '#9c27b0' },
    { name: '기타', color: '#9e9e9e' }
  ])

  const colors = [
    '#00bcd4', '#e91e63', '#4caf50', '#9e9e9e',
    '#ff9800', '#673ab7', '#3f51b5', '#795548'
  ]

  const addCategory = (category) => {
    categories.value.push(category)
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
