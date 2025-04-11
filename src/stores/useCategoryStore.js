import { defineStore } from "pinia";

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
    getCategories(type) {
      // type은 'SCHEDULE',' 'DAILY_RECORD", "BOARD" 로 들어옴
      // type과 같이 요청을 백엔드로 보내서 카테고리 목록 가져와서 저장하기
    },

    addCategory(type, category) {
      // type에 맞게 카테고리 저장
    },
    updateCategory(type, category) {
      // 카테고리 수정
    },

    deleteCategory(type, category) {
      // 카테고리 삭제
    },
  },
});
