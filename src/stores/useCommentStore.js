import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);

  const fetchComments = (postId) => {
    comments.value = [
      {
        id: 1,
        postId,
        author: "댓글작성",
        date: "24.8.10",
        text: "저희집 콩이가 더 귀엽네유",
        editable: true,
      },
      {
        id: 2,
        postId,
        author: "닉네임",
        date: "24.8.10",
        text: "뒤에 사료값 2배는 뭔가요 ㅋㅋ",
        editable: true,
      },
    ];
  };

  const addComment = (comment) => {
    const newComment = {
      id: Date.now(),
      postId: comment.postId,
      author: "현재 사용자",
      date: new Date().toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      }),
      text: comment.text,
      editable: true,
    };
    comments.value.push(newComment);
  };

  const editComment = (postId, commentId, newText) => {
    const target = comments.value.find(
      (c) => c.postId === postId && c.id === commentId
    );
    if (target) target.text = newText;
  };

  const deleteComment = (postId, commentId) => {
    comments.value = comments.value.filter(
      (c) => !(c.postId === postId && c.id === commentId)
    );
  };

  return {
    comments,
    fetchComments,
    addComment,
    editComment,
    deleteComment,
  };
});
