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
      comments.value = data.result;
    } catch (e) {
      alert("댓글 목록 조회에 실패했습니다.");
      console.error("댓글 조회 실패:", e);
    }
  };

  const addComment = async (comment) => {
    const confirmed = window.confirm("댓글을 등록하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.post("/api/comment/create", {
        postIdx: comment.postIdx,
        writer: comment.writer,
        content: comment.text,
        userIdx: userStore.userIdx,
      });
      alert("댓글이 등록되었습니다.");
      await fetchComments(comment.postIdx);
    } catch (e) {
      alert("댓글 등록에 실패했습니다.");
      console.error("댓글 추가 실패:", e);
    }
  };

  const editComment = async (postIdx, commentIdx, content) => {
    const confirmed = window.confirm("댓글을 수정하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.put(`/api/comment/update/${commentIdx}`, {
        postIdx,
        content,
      });
      alert("댓글이 수정되었습니다.");
      await fetchComments(postIdx);
    } catch (e) {
      alert("댓글 수정에 실패했습니다.");
      console.error("댓글 수정 실패:", e);
    }
  };

  const deleteComment = async (postIdx, commentIdx) => {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/comment/delete/${commentIdx}`);
      alert("댓글이 삭제되었습니다.");
      await fetchComments(postIdx);
    } catch (e) {
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
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
