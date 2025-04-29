import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore.js";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    userProfile: {
      nickname: "",
      email: "",
      profileImageUrl: "",
      provider: "",
    },
  }),

  actions: {
    // 프로필 정보를 불러오는 메서드
    async fetchUserProfile(userId) {
      try {
        const response = await axios.get(`/api/user/${userId}/profile`);
        this.userProfile = response.data;

        // userStore에 있는 nickname도 업데이트
        const userStore = useUserStore();
        userStore.nickname = this.userProfile.nickname; // nickname 동기화
        userStore.type = this.userProfile.provider;     // provider 업데이트
        userStore.idx = userId; // idx 업데이트
      } catch (error) {
        console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
      }
    },

    // 프로필 이미지 업로드 메서드
    async uploadProfileImage(userId, imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      try {
        const response = await axios.post(`/api/user/${userId}/profileImage`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.userProfile.profileImageUrl = response.data.profileImageUrl;
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    },

    // 닉네임 업데이트 메서드
    async updateNickname(userId, newNickname) {
      try {
        console.log("Sending PUT request to:", `/api/user/${userId}/nickname`);
        console.log("Request body:", { newNickname });
        
        const response = await axios.put(`/api/user/${userId}/nickname`, { newNickname });

        // 닉네임 업데이트 후 userStore도 갱신
        const userStore = useUserStore();
        await userStore.loginCheck();

        // userStore에서 최신화된 nickname 반영
        userStore.nickname = newNickname; // nickname 동기화
        this.userProfile.nickname = newNickname; // 프로필에도 반영
        
        console.log("Response:", response.data);
      } catch (error) {
        if (error.response) {
          console.error("닉네임 업데이트 실패: ", error.response.data);
          alert("닉네임 업데이트 실패: " + error.response.data.message);
        } else {
          console.error("닉네임 업데이트 실패: ", error.message);
          alert("닉네임 업데이트 실패: " + error.message);
        }
        throw new Error("닉네임 업데이트 실패: " + (error.response?.data?.message || error.message));
      }
    },
  },
});
