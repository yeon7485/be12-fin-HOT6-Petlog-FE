import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "/src/stores/useUserStore"; 

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);
  const userStore = useUserStore(); 

  const fetchComments = async (postIdx) => {
    try {
      const { data } = await axios.get(`/api/comment/list/${postIdx}`);
      comments.value = data;
    } catch (e) {
      console.error("댓글 조회 실패:", e);
    }
  };

  const addComment = async (comment) => {
    try {
      console.log("댓글 작성 요청 전 userIdx:", userStore.userIdx);
      await axios.post("/api/comment/create", {
        
        postIdx: comment.postIdx,
        writer: comment.writer,
        content: comment.text,
        userIdx: userStore.userIdx, 
      });
      await fetchComments(comment.postIdx);
      
    } catch (e) {
      console.error("댓글 추가 실패:", e);
    }
  };

  const editComment = async (postIdx, commentIdx, content) => {
    try {
      await axios.put(`/api/comment/update/${commentIdx}`, {
        postIdx,
        content,
      });
      await fetchComments(postIdx);
    } catch (e) {
      console.error("댓글 수정 실패:", e);
    }
  };

  const deleteComment = async (postIdx, commentIdx) => {
    try {
      await axios.delete(`/api/comment/delete/${commentIdx}`);
      await fetchComments(postIdx);
    } catch (e) {
      console.error("댓글 삭제 실패:", e);
      throw e;
    }
  };

  return {
    comments,
    fetchComments,
    addComment,
    editComment,
    deleteComment,
  };
});
