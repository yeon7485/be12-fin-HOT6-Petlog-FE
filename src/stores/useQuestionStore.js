import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useQuestionStore = defineStore("question", () => {
  const questions = ref([]);
  const selectedQuestion = ref(null);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/api/question/list");
      questions.value = res.data;
    } catch (error) {
      console.error("질문 목록 조회 실패:", error);
    }
  };

  const createQuestion = async (questionData) => {
    try {
      const res = await axios.post("/api/question/create", questionData);
      return res.data;
    } catch (error) {
      console.error("질문 등록 실패:", error);
      throw error;
    }
  };

  const readQuestion = async (idx) => {
    try {
      const res = await axios.get(`/api/question/read/${idx}`);
      selectedQuestion.value = res.data;
      return res.data;
    } catch (error) {
      console.error("질문 단건 조회 실패:", error);
      throw error;
    }
  };

  const deleteQuestion = async (idx) => {
    try {
      await axios.delete(`/api/question/delete/${idx}`);
      await fetchQuestions();
    } catch (error) {
      console.error("질문 삭제 실패:", error);
      throw error;
    }
  };

  const refreshQuestionStatus = async (idx) => {
    const id = Number(idx);
    if (isNaN(id)) {
      console.warn("❗ 유효하지 않은 question idx:", idx);
      return;
    }

    try {
      const updated = await readQuestion(id);
      const index = questions.value.findIndex((q) => q.idx === id);
      if (index !== -1) {
        questions.value[index] = updated;
      }
      if (!selectedQuestion.value || selectedQuestion.value.idx === id) {
        selectedQuestion.value = updated;
      }
    } catch (e) {
      console.error("질문 상태 갱신 실패:", e);
    }
  };

  const searchQuestions = async (keyword) => {
    try {
      const res = await axios.get(`/api/question/search?keyword=${keyword}`);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("질문 검색 실패:", error);
      return [];
    }
  };

  const setSelectedQuestion = (q) => {
    selectedQuestion.value = q;
  };

  const updateQuestion = async (idx, questionData) => {
    try {
      await axios.put(`/api/question/update/${idx}`, questionData);
    } catch (error) {
      console.error("질문 수정 실패:", error);
      throw error;
    }
  };


  return {
    questions,
    selectedQuestion,
    fetchQuestions,
    createQuestion,
    readQuestion,
    deleteQuestion,
    refreshQuestionStatus,
    searchQuestions,
    setSelectedQuestion,
    updateQuestion,
  };
});
