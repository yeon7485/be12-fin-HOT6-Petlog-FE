import { defineStore } from "pinia";
import axios from "axios";

export const useMypageCard = defineStore("mypageCard", {
  state: () => ({
    pets: [],
    userComments: [],
    userPosts: [],
    userProfile: {
      nickname: "",
      email: "",
      profileImageUrl: "",
      petCards: [],
    },
    userQuestions: [],
    userAnswers: []  
  }),

  actions: {
    async fetchCommentsByUser(userId) {
      try {
        const response = await axios.get(`/api/comment/list/user/${userId}`);
        this.userComments = response.data;
      } catch (error) {
        console.error("❌ 댓글 목록 실패:", error);
        throw error;
      }
    },

    async fetchPostsByUser(userId) {
      try {
        const response = await axios.get(`/api/post/list/user/${userId}`);
        this.userPosts = response.data;
      } catch (error) {
        console.error("❌ 게시글 목록 실패:", error);
        throw error;
      }
    },

    async fetchUserProfile(userId) {
      try {
        const response = await axios.get(`/api/user/${userId}/profile`);
        this.userProfile = {
          nickname: response.data.nickname ?? "",
          email: response.data.email ?? "",
          profileImageUrl: response.data.profileImageUrl ?? "/src/assets/images/default.png",
          petCards: response.data.petCards ?? [],
        };
      } catch (e) {
        console.error("유저 프로필 조회 실패:", e);
        throw e;
      }
    },

    async uploadProfileImage(userId, file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post(`/api/user/${userId}/profileImage`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.userProfile.profileImageUrl = response.data.profileImageUrl;
      } catch (e) {
        console.error("프로필 이미지 저장 실패:", e);
        throw e;
      }
    },

    async fetchQuestionsByUser(userId) {
      try {
        const response = await axios.get(`/api/question/list/user/${userId}`);
        this.userQuestions = response.data;
      } catch (error) {
        console.error("❌ 질문 목록 불러오기 실패:", error);
        throw error;
      }
    },

    async fetchAnswersByUser(userId) {
      // ✅ 옮긴 액션
      try {
        const response = await axios.get(`/api/answer/list/user/${userId}`);
        this.userAnswers = response.data;
      } catch (error) {
        console.error("❌ 답변 목록 불러오기 실패:", error);
        throw error;
      }
    },
  },
});
