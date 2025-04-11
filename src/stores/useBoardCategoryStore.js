// Pinia 스토어 정의
import { defineStore } from 'pinia'
// axios를 통한 백엔드 API 호출을 위해 import
import axios from 'axios'

export const useRecordCategoryStore = defineStore('recordCategory', {
  // 상태 정의: 기본 카테고리 3개 포함
  state: () => ({
    categories: [
      { id: 1, name: '자유', color: '#00bcd4' },
      { id: 2, name: '정보공유', color: '#4caf50' },
      { id: 3, name: 'Q&A', color: '#e91e63' }
    ]
  }),

  actions: {
    // ✅ 카테고리 추가 (백엔드에 POST 요청 후 로컬 상태에 추가)
    async addCategoryAsync(category) {
      try {
        const response = await axios.post('/api/categories', category)
        // 백엔드에서 받은 데이터를 추가
        this.categories.push(response.data)
      } catch (error) {
        console.error('카테고리 추가 실패:', error)
      }
    },

    // ✅ 카테고리 삭제 (백엔드에 DELETE 요청 후 로컬 상태에서 제거)
    async deleteCategoryAsync(index) {
      try {
        const category = this.categories[index]
        await axios.delete(`/api/categories/${category.id}`)
        this.categories.splice(index, 1)
      } catch (error) {
        console.error('카테고리 삭제 실패:', error)
      }
    },

    // ✅ 단일 카테고리 조회
    getCategory(index) {
      return this.categories[index]
    },

    // ✅ 백엔드에서 카테고리 전체 불러오기
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error)
      }
    }
  }
})
