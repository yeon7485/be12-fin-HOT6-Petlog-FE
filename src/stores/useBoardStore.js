import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useBoardStore = defineStore("board", () => {
  const posts = ref([]);
  const category = ref("");
  const totalPages = ref(1);

  const isSearching = ref(false);
  const currentKeyword = ref("");
  const currentCategoryName = ref("");

  const fetchPosts = async (boardType, page = 0, size = 5) => {
    isSearching.value = false;
    category.value = boardType;

    try {
      const res = await axios.get(`/api/post/list/${boardType}`, {
        params: { page, size },
      });
      posts.value = res.data.content;
      totalPages.value = res.data.totalPages;
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      posts.value = [];
      totalPages.value = 1;
    }
  };

  const searchPosts = async ({
    boardName,
    category,
    keyword,
    page = 0,
    size = 5,
  }) => {
    isSearching.value = true;
    currentKeyword.value = keyword;
    currentCategoryName.value = category;

    try {
      const res = await axios.get("/api/post/search", {
        params: { boardName, category, keyword, page, size },
      });
      posts.value = res.data.content;
      totalPages.value = res.data.totalPages;
    } catch (err) {
      console.error("검색 실패:", err);
      posts.value = [];
      totalPages.value = 1;
    }
  };

  const getPostDetail = async (postIdx) => {
    try {
      const res = await axios.get(`/api/post/read/${postIdx}`);
      return res.data;
    } catch (err) {
      console.error("게시글 상세 조회 실패:", err);
      return null;
    }
  };

  const createPost = async (postData) => {
    try {
      const { writer, ...sanitized } = postData;
      await axios.post("/api/post/create", sanitized);
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      throw err;
    }
  };

  const updatePost = async (postIdx, postData) => {
    try {
      const { writer, ...sanitized } = postData;
      await axios.put(`/api/post/update/${postIdx}`, sanitized);
    } catch (err) {
      console.error("게시글 수정 실패:", err);
      throw err;
    }
  };

  const deletePost = async (postIdx) => {
    try {
      await axios.delete(`/api/post/delete/${postIdx}`);
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      throw err;
    }
  };

  return {
    posts,
    category,
    totalPages,
    isSearching,
    currentKeyword,
    currentCategoryName,
    fetchPosts,
    searchPosts,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
  };
});
