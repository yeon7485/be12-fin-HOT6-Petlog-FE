import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    type: "USER",
    nickname: "",
    isLogin: false,
  }),
  persist: {
    storage: sessionStorage,
  },

  actions: {
    async signup(signupData) {
      try {
        const response = await axios.post("/api/user/sign-up", signupData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          return response.data;
        } else {
          alert("회원가입에 실패하였습니다.");
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async login(loginData) {
      try {
        const response = await axios.post("/api/login", loginData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          this.isLogin = true;
          this.nickname = response.data.userId;
          return response.data;
        } else {
          alert("로그인에 실패하였습니다.");
        }
      } catch (error) {
        if (error.status === 401) {
          alert("이메일과 비밀번호를 다시 입력해주세요.");
        } else {
          alert("로그인에 실패하였습니다.");
          console.error(error);
        }
      }
    },

    async loginCheck() {
      try {
        const response = await axios.get("/api/user/auth/check", {
          withCredentials: true,
        });

        if (response.data.result.login) {
          this.isLogin = response.data.result.login;
          this.nickname = response.data.result.nickname;
        } else {
          this.isLogin = false;
        }
      } catch (error) {
        this.isLogin = false;
      }
    },

    getNickname() {
      return this.nickname;
    },
    logout() {
      this.nickname = "";
      this.isLogin = false;
    },
  },
});
