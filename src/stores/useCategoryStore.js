import { defineStore } from "pinia"
import axios from "axios" // axios도 반드시 import 필요

export const useCategoryStore = defineStore("category", {
  state: () => ({
    scheduleCategories: [
      { idx: 1, color: "#00C9CD", name: "병원" },
      { idx: 2, color: "#E6B0BD", name: "미용실" },
      { idx: 3, color: "#65924D", name: "산책" },
      { idx: 4, color: "#BDBDBD", name: "기타" },
    ],
    recordCategories: [
      { idx: 1, color: "#00C9CD", name: "체중" },
      { idx: 2, color: "#E6B0BD", name: "이상현상" },
      { idx: 3, color: "#65924D", name: "배변상태" },
      { idx: 4, color: "#b29d90", name: "수면시간" },
      { idx: 5, color: "#f30F12", name: "체온" },
      { idx: 6, color: "#df32f3", name: "오늘의 사진" },
      { idx: 7, color: "#BDBDBD", name: "기타" },
    ],
    boardTypes: [
      { idx: 1, name: "자유게시판" },
      { idx: 2, name: "정보 공유" },
      { idx: 3, name: "Q&A" },
    ],
    boardCategories: [
      { idx: 1, name: "강아지" },
      { idx: 2, name: "고양이" },
      { idx: 3, name: "도마뱀" },
      { idx: 4, name: "햄스터" },
      { idx: 5, name: "물고기" },
      { idx: 6, name: "앵무새" },
      { idx: 7, name: "기타" },
    ],
  }),

  actions: {
    // ✅ 카테고리 리스트를 타입에 따라 반환
    getTargetList(type) {
      switch (type) {
        case "SCHEDULE":
          return this.scheduleCategories
        case "DAILY_RECORD":
          return this.recordCategories
        case "BOARD_TYPE":
          return this.boardTypes
        case "BOARD_CATEGORY":
          return this.boardCategories
        default:
          console.warn("지원하지 않는 카테고리 타입:", type)
          return []
      }
    },

    async getCategories(type) {
      // type은 'SCHEDULE',' 'DAILY_RECORD", "BOARD" 로 들어옴
      // type과 같이 요청을 백엔드로 보내서 카테고리 목록 가져와서 저장하기
      try {
        const response = await axios.get(`/api/categories?type=${type}`)
        switch (type) {
          case "SCHEDULE":
            this.scheduleCategories = response.data
            break
          case "DAILY_RECORD":
            this.recordCategories = response.data
            break
          case "BOARD_TYPE":
            this.boardTypes = response.data
            break
          case "BOARD_CATEGORY":
            this.boardCategories = response.data
            break
          default:
            console.warn("지원하지 않는 타입:", type)
        }
      } catch (error) {
        console.error(`카테고리(${type}) 불러오기 실패:`, error)
      }
    },

    async addCategory(type, category) {
       // type에 맞게 카테고리 저장
      try {
        const response = await axios.post(`/api/categories?type=${type}`, category)
        this._getTargetList(type).push(response.data)
      } catch (error) {
        console.error(`${type} 카테고리 추가 실패:`, error)
      }
    },

    async updateCategory(type, category) {
      // 카테고리 수정
      try {
        const response = await axios.put(`/api/categories/${category.idx}?type=${type}`, category)
        const targetList = this._getTargetList(type)
        const index = targetList.findIndex((c) => c.idx === category.idx)
        if (index !== -1) {
          targetList[index] = response.data
        }
      } catch (error) {
        console.error(`${type} 카테고리 수정 실패:`, error)
      }
    },

    async deleteCategory(type, category) {
       // 카테고리 삭제
      try {
        await axios.delete(`/api/categories/${category.idx}?type=${type}`)
        const list = this._getTargetList(type)
        const index = list.findIndex((c) => c.idx === category.idx)
        if (index !== -1) list.splice(index, 1)
      } catch (error) {
        console.error(`${type} 카테고리 삭제 실패:`, error)
      }
    },
  },
})
