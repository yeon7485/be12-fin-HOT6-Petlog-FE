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

  const updateAnswer = async (answerId, content, image = "") => {
    try {
      await axios.put(`/api/answer/update/${answerId}`, {
        content,
        image,
      });
    } catch (err) {
      console.error("답변 수정 실패:", err);
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

  const getAnswerByIdFromServer = async (idx) => {
    try {
      const res = await axios.get(`/api/answer/read/${idx}`);
      return res.data;
    } catch (err) {
      console.error("단일 답변 조회 실패:", err);
      throw err;
    }
  };
  
  const deleteAnswer = async (answerIdx) => {
    try {
      await axios.delete(`/api/answer/delete/${answerIdx}`);
    } catch (err) {
      console.error("답변 삭제 실패:", err);
      throw err;
    }
  };

  return {
    answers,
    fetchAnswersByQuestionId,
    registerAnswer,
    updateAnswer,
    selectAnswer,
    getAnswerById,
    getAnswerByIdFromServer,
    deleteAnswer,
  };
});
