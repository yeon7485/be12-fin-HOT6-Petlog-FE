// stores/useRecordCategoryStore.js
import { defineStore } from 'pinia'

export const useRecordCategoryStore = defineStore('recordCategory', {
  state: () => ({
    categories: [
      { name: '자유', color: '#00bcd4' },
      { name: '정보공유', color: '#4caf50' },
      { name: 'Q&A', color: '#e91e63' }
    ]
  }),
  actions: {
    addCategory(category) {
      this.categories.push(category)
    },
    deleteCategory(index) {
      this.categories.splice(index, 1)
    },
    getCategory(index) {
      return this.categories[index]
    }
  }
})
