import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAnswerStore = defineStore("answer", () => {
  const answers = ref([]);

  const fetchAnswersByQuestionId = async (questionId) => {
    try {
      const res = await axios.get(`/api/answer/list/${questionId}`);
      answers.value = res.data;
    } catch (err) {
      console.error("답변 목록 조회 실패:", err);
    }
  };

  const registerAnswer = async (questionIdx, content) => {
    try {
      await axios.post("/api/answer/create", {
        questionIdx,
        content,
      });
    } catch (err) {
      console.error("답변 등록 실패:", err);
      throw err;
    }
  };

  const selectAnswer = async (answerIdx) => {
    try {
      await axios.post(`/api/answer/${answerIdx}/select`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("답변 채택 실패:", err);
      throw err;
    }
  };

  const getAnswerById = (id) => {
    return answers.value.find((a) => a.idx === id);
  };

  return {
    answers,
    fetchAnswersByQuestionId,
    registerAnswer,
    selectAnswer,
    getAnswerById,
  };
});
