import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);

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
      await axios.post("/api/comment/add", {
        postIdx: comment.postIdx,
        writer: comment.writer,
        contents: comment.text,
      });
      await fetchComments(comment.postIdx); 
    } catch (e) {
      console.error("댓글 추가 실패:", e);
    }
  };

  return {
    comments,
    fetchComments,
    addComment,
  };
});
