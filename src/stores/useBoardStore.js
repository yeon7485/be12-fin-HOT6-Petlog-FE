import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", () => {
  const posts = ref([]);
  const filteredPosts = ref([]);
  const category = ref("");

  const fetchPosts = async (boardType) => {
    category.value = boardType;
    const dummy = {
      free: {
        title: "저희 강아지 귀엽쥬??",
        category: "강아지",
        writer: "멍쟈뽀짝",
        contents: "너무너무 귀엽고 깜찍해요 이 세상에서 제일 귀여워요",
        date: "04/01",
        imageUrl: "/src/assets/images/dog3.png",
      },
      information: {
        title: "강아지 키울 때 꿀팁 공유!",
        category: "강아지",
        writer: "구름봄",
        contents:
          "강아지 1마리 키우시는 분들 약간 꿀팁아닌 꿀팁 드리자면 한 마리 키우면 애기가 너무 외로워할 수 있으니 한 마리 더 키우면 즐거움 2배 + 행복 2배 + 사료값 2배",
        date: "04/03",
        imageUrl: "",
      },
    };

    const dummyPost = {
      category: boardType,
      ...dummy[boardType],
    };

    posts.value = Array.from({ length: 8 }, (_, i) => ({
      ...dummyPost,
      id: 8 - i,
    }));

    filteredPosts.value = [...posts.value];
  };

  const searchPosts = (query) => {
    if (!query.trim()) {
      filteredPosts.value = [...posts.value];
      return;
    }

    const q = query.trim().toLowerCase();
    filteredPosts.value = posts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(q) &&
        post.writer.toLowerCase().includes(q) &&
        post.category.toLowerCase().includes(q)
    );
  };

  return { category, posts, filteredPosts, fetchPosts, searchPosts };
});
