import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useQuestionStore = defineStore("question", () => {
  const questions = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const pageGroupStart = ref(1);
  const pageGroupEnd = ref(1);
  const visiblePages = ref([]);
  const selectedQuestion = ref(null);

  const isSearching = ref(false);
  const currentKeyword = ref("");

  const fetchQuestions = async (page = 0, size = 5) => {
    isSearching.value = false;

    try {
      const res = await axios.get(
        `/api/question/list?page=${page}&size=${size}`
      );
      const result = res.data.result;

      questions.value = result.content;
      currentPage.value = result.currentPage;
      totalPages.value = result.totalPages;
      pageGroupStart.value = result.pageGroupStart;
      pageGroupEnd.value = result.pageGroupEnd;
      visiblePages.value = result.visiblePages;
    } catch (error) {
      console.error("질문 목록 조회 실패:", error);
      questions.value = [];
    }
  };

  const searchQuestions = async (keyword, page = 0, size = 5) => {
    isSearching.value = true;
    currentKeyword.value = keyword;

    try {
      const res = await axios.get(`/api/question/search`, {
        params: { keyword, page, size },
      });
      const result = res.data.result;

      questions.value = result.content;
      currentPage.value = result.currentPage;
      totalPages.value = result.totalPages;
      pageGroupStart.value = result.pageGroupStart;
      pageGroupEnd.value = result.pageGroupEnd;
      visiblePages.value = result.visiblePages;
    } catch (error) {
      console.error("질문 검색 실패:", error);
      questions.value = [];
    }
  };

  const createQuestion = async (questionData) => {
    try {
      const formData = new FormData();
      const questionBlob = new Blob([JSON.stringify(questionData)], {
        type: "application/json",
      });
      formData.append("question", questionBlob);

      if (Array.isArray(questionData.file)) {
        questionData.file.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await axios.post("/api/question/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.result;
    } catch (error) {
      console.error("질문 등록 실패:", error);
      throw error;
    }
  };

  const updateQuestion = async (idx, questionData) => {
    try {
      const formData = new FormData();
      const questionBlob = new Blob([JSON.stringify(questionData)], {
        type: "application/json",
      });
      formData.append("question", questionBlob);

      if (Array.isArray(questionData.file)) {
        questionData.file.forEach((file) => {
          formData.append("images", file);
        });
      }

      await axios.put(`/api/question/update/${idx}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("질문 수정 실패:", error);
      throw error;
    }
  };

  const readQuestion = async (idx) => {
    try {
      const res = await axios.get(`/api/question/read/${idx}`);
      selectedQuestion.value = res.data.result;
      return res.data.result;
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

  const setSelectedQuestion = (q) => {
    selectedQuestion.value = q;
  };

  return {
    questions,
    currentPage,
    totalPages,
    pageGroupStart,
    pageGroupEnd,
    visiblePages,
    selectedQuestion,
    isSearching,
    currentKeyword,
    fetchQuestions,
    searchQuestions,
    createQuestion,
    updateQuestion,
    readQuestion,
    deleteQuestion,
    refreshQuestionStatus,
    setSelectedQuestion,
  };
});
