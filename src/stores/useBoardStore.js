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

  const searchPosts = async ({ boardName, category, keyword }) => {
    try {
      const res = await axios.get("/api/post/search", {
        params: { boardName, category, keyword },
      });
      filteredPosts.value = res.data;
    } catch (err) {
      console.error("검색 실패:", err);
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
    category,
    posts,
    filteredPosts,
    fetchPosts,
    searchPosts,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
  };
});
