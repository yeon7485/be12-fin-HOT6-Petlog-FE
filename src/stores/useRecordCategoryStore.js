// stores/useRecordCategoryStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRecordCategoryStore = defineStore('recordCategory', {
  state: () => ({
    // ✅ 초기 더미 카테고리
    categories: [
      { id: 1, name: '체중', color: '#4caf50' },
      { id: 2, name: '이상현상', color: '#f44336' },
      { id: 3, name: '배변상태', color: '#795548' },
      { id: 4, name: '수면시간', color: '#3f51b5' },
      { id: 5, name: '체온', color: '#ff9800' },
      { id: 6, name: '오늘의사진', color: '#9c27b0' },
      { id: 7, name: '기타', color: '#9e9e9e' }
    ],

    // ✅ 선택 가능한 색상 리스트
    colors: [
      '#00bcd4', '#e91e63', '#4caf50', '#9e9e9e',
      '#ff9800', '#673ab7', '#3f51b5', '#795548'
    ]
  }),

  actions: {
    // ✅ 백엔드에서 카테고리 목록 불러오기
    async fetchCategories() {
      try {
        const response = await axios.get('/api/record-categories')
        this.categories = response.data
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error)
      }
    },

    // ✅ 카테고리 추가 (POST)
    async addCategoryAsync(category) {
      try {
        const response = await axios.post('/api/record-categories', category)
        this.categories.push(response.data)
      } catch (error) {
        console.error('카테고리 추가 실패:', error)
      }
    },

    // ✅ 카테고리 삭제 (DELETE)
    async deleteCategoryAsync(index) {
      try {
        const category = this.categories[index]
        await axios.delete(`/api/record-categories/${category.id}`)
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
