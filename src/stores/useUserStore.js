import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    type: "USER",
  }),

  actions: {
    async signup(userData) {
      try {
        const response = await axios.post("/api/user/sign-up", userData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          return response.data;
        } else {
          alert("회원가입에 실패하였습니다.");
          return response;
        }
        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
