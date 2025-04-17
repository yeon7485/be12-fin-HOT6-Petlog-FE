import { defineStore } from 'pinia'
import axios from 'axios'

export const useMypageCard = defineStore('mypageCard', {
  state: () => ({
    pets: []
  }),
  actions: {
    async fetchPets(userId) {
      try {
        const response = await axios.get('/api/pet/user/1')
        this.pets = response.data
      } catch (error) {
        console.error('반려동물 목록을 불러오는 데 실패했습니다.', error)
      }
    },

    async addPet(pet) {
      try {
        const response = await axios.post('/api/pet', pet)
        this.pets.push(response.data)
      } catch (error) {
        console.error('반려동물 추가 실패:', error)
      }
    },

    async removePet(id) {
      try {
        await axios.delete(`/api/pet/${id}`)
        this.pets = this.pets.filter(p => p.idx !== id)
      } catch (error) {
        console.error('반려동물 삭제 실패:', error)
      }
    }
  }
})
