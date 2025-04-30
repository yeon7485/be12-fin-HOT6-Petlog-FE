import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    type: "",
    nickname: "",
    isLogin: false,
    idx: 0,
  }),

  persist: {
    storage: sessionStorage,
    paths: ["type", "nickname", "isLogin", "idx"],
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
          this.nickname = response.data.nickname;
          this.type = response.data.role;
          this.idx = response.data.idx;
        } else {
          if (response.data.code === 1400) {
            alert("탈퇴한 회원입니다. 다시 가입해 주세요.");
          } else if (response.data.code === 1102) {
            alert(response.data.message + " 메일을 확인해주세요.");
          }
        }
        return response.data;
      } catch (error) {
        alert("이메일과 비밀번호를 다시 확인해주세요.");
        console.error(error);
      }
    },

    async loginCheck() {
      try {
        const response = await axios.get("/api/user/auth/check", {
          withCredentials: true,
        });

        const res = response.data.result;

        if (response.data.result.login) {
          this.isLogin = res.login;
          this.nickname = res.nickname;
          this.type = res.role;
          this.idx = res.idx;
        } else {
          this.isLogin = false;
          this.idx = 0;
        }
      } catch (error) {
        this.isLogin = false;
        this.idx = 0;
      }
    },

    async logout() {
      try {
        const response = await axios.post("/api/user/logout", {}, { withCredentials: true });

        this.nickname = "";
        this.isLogin = false;
        this.type = "";
        this.idx = 0;

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    getNickname() {
      return this.nickname;
    },

    async deleteUser(password = "") {
      try {
        const requestBody = {
          email: this.nickname,
          password: password,
        };

        const response = await axios.delete(`/api/user/${this.idx}`, {
          data: requestBody,
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("회원 탈퇴가 완료되었습니다.");
          await this.logout();
        }
        return response.data;
      } catch (error) {
        alert("회원 탈퇴에 실패하였습니다.");
        console.error(error);
      }
    },

    async checkEmailDuplicate(email) {
      try {
        const response = await axios.get(`/api/user/email/check?email=${email}`);

        return response.data;
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },

    async checkOAuthLogin() {
      try {
        const response = await axios.get(`/api/user/oauth/check`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
