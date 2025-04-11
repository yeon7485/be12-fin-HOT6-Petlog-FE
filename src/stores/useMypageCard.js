// src/stores/useMypageCard.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMypageCard = defineStore('mypageCard', () => {
  // ✅ 더미 펫 카드 데이터 (초기 UI 테스트용)
  const pets = ref([
    { id: 1, name: '봄', age: '8살', breed: '말티즈', gender: 'female', image: '/src/assets/images/dog1.png' },
    { id: 2, name: '구름', age: '8살', breed: '말티즈', gender: 'male', image: '/src/assets/images/dog2.jpeg' },
    { id: 3, name: '썬더', age: '1살', breed: '말티즈', gender: 'male', image: '/src/assets/images/dog4.jpg' },
    { id: 4, name: '솜', age: '8살', breed: '스코티시 스트레이트', gender: 'female', image: '/src/assets/images/cat1.jpg' },
    { id: 5, name: '빙봉', age: '6살', breed: '코리안숏헤어', gender: 'male', image: '/src/assets/images/cat2.jpg' },
    { id: 6, name: '멍쟈', age: '2살', breed: '포메라니안', gender: 'male', image: '/src/assets/images/dog3.png' },
    { id: 7, name: '멍지', age: '3살', breed: '포메라니안', gender: 'male', image: '/src/assets/images/dog5.jpg' },
    { id: 8, name: '멍쥐', age: '5살', breed: '포메라니안', gender: 'male', image: '/src/assets/images/dog6.jpg' },
    { id: 9, name: '짱구', age: '4살', breed: '포메라니안', gender: 'male', image: '/src/assets/images/dog7.jpg' }
  ])

  // ✅ 펫 목록 불러오기 (서버로부터)
  const fetchPets = async () => {
    try {
      const response = await axios.get('/api/pets')
      pets.value = response.data
    } catch (error) {
      console.error('펫 목록 불러오기 실패:', error)
    }
  }

  // ✅ 펫 추가
  const addPet = async (pet) => {
    try {
      const response = await axios.post('/api/pets', pet)
      pets.value.push(response.data)
    } catch (error) {
      console.error('펫 추가 실패:', error)
    }
  }

  // ✅ 펫 삭제
  const removePet = async (id) => {
    try {
      await axios.delete(`/api/pets/${id}`)
      pets.value = pets.value.filter(p => p.id !== id)
    } catch (error) {
      console.error('펫 삭제 실패:', error)
    }
  }

  return {
    pets,
    fetchPets,
    addPet,
    removePet
  }
})
