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
      return res.data;
    } catch (error) {
      console.error("질문 단건 조회 실패:", error);
      throw error;
    }
  };

  const setSelectedQuestion = (q) => {
    selectedQuestion.value = q;
  };

  const refreshQuestionStatus = async (idx) => {
    try {
      const updated = await readQuestion(idx);
      const index = questions.value.findIndex((q) => q.idx === idx);
      if (index !== -1) {
        questions.value[index] = updated;
      }

      if (selectedQuestion.value?.idx === idx) {
        selectedQuestion.value = updated;
      }
    } catch (e) {
      console.error("질문 상태 갱신 실패:", e);
    }
  };

  return {
    questions,
    fetchQuestions,
    createQuestion,
    readQuestion,
    selectedQuestion,
    setSelectedQuestion,
    refreshQuestionStatus
  };
});
