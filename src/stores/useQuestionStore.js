import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("question", () => {
  const questions = ref([]);

  const fetchQuestions = async () => {
    questions.value = [
      {
        id: 1,
        status: "해결됨",
        title: "강아지 중성화 수술 고민입니다.",
        writer: "닉네임",
        date: "24.8.10",
        contents:
          "저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야한다고 하는데 꼭 시켜야하는 건가요? 찾아보니 가격도 만만치 않고 엄청 아파한다고 하더라고요 ㅠㅠㅠ",
        tags: ["강아지", "강아지 중성화"],
        commentCount: 2,
      },
      {
        id: 2,
        status: "미해결",
        title: "질문입니다",
        writer: "닉네임",
        date: "24.8.10",
        contents: "포스트 내용입니다. 포스트 내용입니다. 포스트 내용입니다.",
        tags: ["강아지", "강아지 중성화"],
        commentCount: 2,
      },
      {
        id: 3,
        status: "해결됨",
        title: "테스트용",
        writer: "테스트",
        date: "24.8.12",
        contents: "테스트용입니다.",
        tags: ["테스트", "강아지 중성화"],
        commentCount: 2,
      },
    ];
  };

  const getQuestionById = (id) => {
    return questions.value.find((question) => question.id === id);
  };

  return {
    questions,
    fetchQuestions,
    getQuestionById,
  };
});
