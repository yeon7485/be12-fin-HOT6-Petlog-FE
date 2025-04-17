import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    type: "", // 사용자 타입 (USER / ADMIN 등)
    nickname: "", // 사용자 닉네임 또는 이메일
    userIdx: null, // 백엔드에서 받은 고유 사용자 번호
    isLogin: false, // 로그인 상태
    idx: 0, // 일부 응답 포맷 대응용
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

        const res = response.data;

        // 성공 처리 (두 가지 포맷 대응)
        const success = res.isSuccess || res.code === 200;

        if (success) {
          this.isLogin = true;
          this.nickname = res.userId ?? res.nickname ?? "";
          this.type = res.role ?? "";
          this.userIdx = res.userIdx ?? res.idx ?? 0;
          this.idx = res.idx ?? res.userIdx ?? 0;
        } else if (res.code === 1102) {
          alert((res.message ?? "인증 필요") + " 메일을 확인해주세요.");
        } else {
          alert("로그인에 실패하였습니다.");
        }

        return res;
      } catch (error) {
        if (error?.response?.status === 401) {
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

        const res = response.data.result;

        if (res.login) {
          this.isLogin = true;
          this.nickname = res.nickname ?? "";
          this.type = res.role ?? "";
          this.userIdx = res.userIdx ?? res.idx ?? 0;
          this.idx = res.idx ?? res.userIdx ?? 0;
        } else {
          this.isLogin = false;
          this.userIdx = null;
          this.idx = 0;
        }
      } catch (error) {
        this.isLogin = false;
        this.userIdx = null;
        this.idx = 0;
      }
    },

    async logout() {
      try {
        const response = await axios.post(
          "/api/user/logout",
          {},
          {
            withCredentials: true,
          }
        );

        this.nickname = "";
        this.userIdx = null;
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
  },
});
