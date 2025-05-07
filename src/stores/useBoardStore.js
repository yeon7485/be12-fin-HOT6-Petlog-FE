import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useBoardStore = defineStore("board", () => {
  const posts = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const pageGroupStart = ref(1);
  const pageGroupEnd = ref(1);
  const visiblePages = ref([]);

  const isSearching = ref(false);
  const currentKeyword = ref("");
  const currentCategoryName = ref("");

  const fetchPosts = async (boardType, page = 0, size = 10) => {
    isSearching.value = false;

    try {
      const res = await axios.get(`/api/post/list/${boardType}`, {
        params: { page, size },
      });

      const result = res.data.result;
      posts.value = result.content;
      currentPage.value = result.currentPage;
      totalPages.value = result.totalPages;
      pageGroupStart.value = result.pageGroupStart;
      pageGroupEnd.value = result.pageGroupEnd;
      visiblePages.value = result.visiblePages;
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      posts.value = [];
      totalPages.value = 1;
      visiblePages.value = [];
    }
  };

  const searchPosts = async ({
    boardName,
    category,
    keyword,
    page = 0,
    size = 10,
  }) => {
    isSearching.value = true;
    currentKeyword.value = keyword;
    currentCategoryName.value = category;

    try {
      const res = await axios.get("/api/post/search", {
        params: { boardName, category, keyword, page, size },
      });

      const result = res.data.result;
      posts.value = result.content;
      currentPage.value = result.currentPage;
      totalPages.value = result.totalPages;
      pageGroupStart.value = result.pageGroupStart;
      pageGroupEnd.value = result.pageGroupEnd;
      visiblePages.value = result.visiblePages;
    } catch (err) {
      console.error("검색 실패:", err);
      posts.value = [];
      totalPages.value = 1;
      visiblePages.value = [];
    }
  };

  const getPostDetail = async (postIdx) => {
    try {
      const res = await axios.get(`/api/post/read/${postIdx}`);
      return res.data.result;
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
    currentPage,
    totalPages,
    pageGroupStart,
    pageGroupEnd,
    visiblePages,
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
