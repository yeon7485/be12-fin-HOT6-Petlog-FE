import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnswerStore = defineStore("answer", () => {
  const answers = ref([]);

  const fetchAnswersByQuestionId = async (questionId) => {
    answers.value = [
      {
        id: 1,
        questionId,
        writer: "구름봄맘",
        profileImage: "/src/assets/images/dog2.jpeg",
        date: "24.8.10",
        contents:
          "중성화 안 하면 자궁축농증이나 유선종양 등 질병에 걸릴 가능성이 아주 큽니다...",
        selected: true,
        image: null,
      },
      {
        id: 2,
        questionId,
        writer: "눈가을맘",
        profileImage: "/src/assets/images/dog2.jpeg",
        date: "24.8.10",
        contents: "중성화는 명백한 동물학대입니다!!!",
        selected: false,
        image: "/src/assets/images/dog1.png",
      },
      {
        id: 3,
        questionId,
        writer: "멍쟈쟈맘",
        profileImage: "/src/assets/images/dog3.png",
        date: "24.8.15",
        contents: "너무 비싸요",
        selected: false,
        image: "/src/assets/images/dog3.png",
      },
    ];
  };

  const getAnswerById = (id) => {
    return answers.value.find((a) => a.id === id);
  };

  return {
    answers,
    fetchAnswersByQuestionId,
    getAnswerById,
  };
});
