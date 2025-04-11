// stores/useScheduleCategoryStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useScheduleCategoryStore = defineStore('scheduleCategory', {
  // ✅ 상태 정의: 초기 더미 카테고리 + 색상 팔레트
  state: () => ({
    categories: [
      { id: 1, name: '방문', color: '#00bcd4' },
      { id: 2, name: '미팅실', color: '#e91e63' },
      { id: 3, name: '산책', color: '#4caf50' },
      { id: 4, name: '기타', color: '#9e9e9e' }
    ],
    colors: [
      '#00bcd4', '#e91e63', '#4caf50', '#9e9e9e',
      '#ff9800', '#673ab7', '#3f51b5', '#795548'
    ]
  }),

  actions: {
    // ✅ 카테고리 목록 불러오기
    async fetchCategories() {
      try {
        const response = await axios.get('/api/schedule-categories')
        this.categories = response.data
      } catch (error) {
        console.error('스케줄 카테고리 불러오기 실패:', error)
      }
    },

    // ✅ 새 카테고리 추가
    async addCategoryAsync(newCategory) {
      try {
        if (newCategory.name.trim()) {
          const response = await axios.post('/api/schedule-categories', newCategory)
          this.categories.push(response.data)
        }
      } catch (error) {
        console.error('카테고리 추가 실패:', error)
      }
    },

    // ✅ 카테고리 삭제
    async deleteCategoryAsync(index) {
      try {
        const category = this.categories[index]
        await axios.delete(`/api/schedule-categories/${category.id}`)
        this.categories.splice(index, 1)
      } catch (error) {
        console.error('카테고리 삭제 실패:', error)
      }
    },

    // ✅ 단일 카테고리 조회
    getCategory(index) {
      return this.categories[index]
    }
  }
})
