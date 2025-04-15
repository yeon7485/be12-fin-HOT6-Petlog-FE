import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useBoardStore = defineStore("board", () => {
  const posts = ref([]);
  const filteredPosts = ref([]);
  const category = ref("");

  const fetchPosts = async (boardType) => {
    category.value = boardType;
    try {
      const res = await axios.get(`/api/post/list/${boardType}`);
      posts.value = res.data;
      filteredPosts.value = [...res.data];
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      posts.value = [];
      filteredPosts.value = [];
    }
  };

  const searchPosts = async (query) => {
    if (!query.trim()) {
      filteredPosts.value = [...posts.value];
      return;
    }

    try {
      const res = await axios.get(`/api/post/search`, {
        params: {
          boardName: category.value,
          keyword: query,
        },
      });
      filteredPosts.value = res.data;
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  return { 
    category, 
    posts, 
    filteredPosts, 
    fetchPosts, 
    searchPosts };
});
