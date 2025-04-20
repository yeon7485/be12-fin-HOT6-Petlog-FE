import { defineStore } from 'pinia'
import axios from 'axios'

export const usePetStore = defineStore('pet', {
    state: () => ({
      petDetail: null,
      userAnswers: [],
      petList: [] 
    }),
  
    actions: {
      async fetchPetById(petId) {
        try {
          const response = await axios.get(`/api/pet/${petId}`)
          this.petDetail = response.data
        } catch (error) {
          console.error('반려동물 정보를 불러오는 데 실패:', error)
          throw error
        }
      },
  
      async updatePet(petData) {
        try {
          const formData = new FormData()
          formData.append(
            "pet",
            new Blob([JSON.stringify(petData)], { type: "application/json" })
          )
  
          await axios.put(`/api/pet/${petData.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        } catch (error) {
          console.error("반려동물 정보 수정 실패:", error)
          throw error
        }
      },
  
      async fetchAnswersByUser(userId) {
        try {
          const response = await axios.get(`/api/answer/list/user/${userId}`)
          this.userAnswers = response.data
        } catch (error) {
          console.error("답변 목록 불러오기 실패:", error)
          throw error
        }
      },
      async createPet(petData, profileImageFile) {
        try {
          const formData = new FormData();
          formData.append(
            'pet',
            new Blob([JSON.stringify(petData)], { type: 'application/json' })
          );
          if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
          }
      
          await axios.post('/api/pet/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('카드 생성 실패:', error);
          throw error;
        }
      },
      async fetchPetDetail(petId) {
        try {
          const response = await axios.get(`/api/pet/${petId}`);
          this.petDetail = response.data;
          return response.data; // 💡 필요한 경우 컴포넌트에서 바로 활용 가능
        } catch (error) {
          console.error('반려동물 상세 불러오기 실패:', error);
          throw error;
        }
      },
      
      async deletePet(petId) {
        try {
          await axios.delete(`/api/pet/${petId}`);
        } catch (error) {
          console.error('반려동물 삭제 실패:', error);
          throw error;
        }
      },
      async fetchPetsByUser(userId) {
        try {
          const response = await axios.get(`/api/pet/user/${userId}`);
          this.petList = response.data;
        } catch (error) {
          console.error("사용자 반려동물 목록 불러오기 실패:", error);
          throw error;
        }
      },
      async fetchPetList(userId) {
        try {
          const response = await axios.get(`/api/pet/user/${userId}`);
          this.petList = response.data;
        } catch (error) {
          console.error("반려동물 목록 불러오기 실패:", error);
        }
      }
    }
  })