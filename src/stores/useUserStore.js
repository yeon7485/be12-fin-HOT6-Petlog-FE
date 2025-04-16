import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    type: "",
    nickname: "",
    isLogin: false,
  }),
  persist: {
    storage: sessionStorage,
    paths: ["type", "nickname"],
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

        if (response.data.isSuccess) {
          this.isLogin = true;
          this.nickname = response.data.userId;
          this.type = response.data.role;
          console.log("this.isLogin 후:", this.isLogin);
        } else if (response.data.code === 1102) {
          alert(response.data.message + " 메일을 확인해주세요.");
        }
        return response.data;
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

        console.log(response);
        const res = response.data.result;

        if (response.data.result.login) {
          this.isLogin = res.login;
          this.nickname = res.nickname;
          this.type = res.role;
        } else {
          this.isLogin = false;
        }
      } catch (error) {
        this.isLogin = false;
      }
    },

    async logout() {
      try {
        const response = await axios.post("/api/user/logout", {}, { withCredentials: true });

        this.nickname = "";
        this.isLogin = false;
        this.type = "";

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    getNickname() {
      return this.nickname;
    },
  },
});
