<script setup>
import { reactive, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/useUserStore";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const loginData = reactive({
  email: "",
  password: "",
});

const userStore = useUserStore();
console.log("초기 isLogin:", userStore.isLogin);

const login = async () => {
  const result = await userStore.login(loginData);
  if (result.code !== 1102) {
    alert("로그인되었습니다.");
    router.replace("/");
  }
};

const kakaoLogin = () => {
  window.location.href = window.ENV.VITE_KAKAO_LOGIN_URL;
  alert("로그인 되었습니다.");
  router.replace("/");
};
</script>

<template>
  <div class="login_container">
    <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

    <form class="login_box">
      <div class="form_group">
        <label for="email">이메일</label>
        <input
          type="email"
          id="email"
          v-model="loginData.email"
          autocomplete="username"
          placeholder="이메일을 입력해주세요."
        />
      </div>

      <div class="form_group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="loginData.password"
          autocomplete="current-password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <button type="button" class="login_btn" @click="login">로그인</button>

      <button type="button" class="kakao_btn" @click="kakaoLogin">
        <img src="/src/assets/icons/kakao.png" alt="카카오 아이콘" class="kakao_icon" />
        카카오로 로그인
      </button>

      <p class="signup_text">
        아직 회원이 아니신가요?
        <router-link to="/user/signup" class="signup_link">회원가입</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  background-color: #fdf7f1;
  padding-top: 80px;
}

.logo_img {
  height: 90px;
  margin-bottom: 30px;
  cursor: pointer;
}

.login_box {
  width: 100%;
  max-width: 400px;
  background-color: #f5e7db;
  padding: 36px 32px;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.form_group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15px;
}

input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
}

.login_btn {
  width: 100%;
  padding: 14px;
  background-color: #800000;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.login_btn:hover {
  background-color: #700000;
}

.kakao_btn {
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  background-color: #fee500;
  color: #3b1e1e;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.kakao_icon {
  width: 18px;
  height: 18px;
}

.signup_text {
  margin-top: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
}

.signup_link {
  color: #800000;
  font-weight: bold;
  text-decoration: none;
  margin-left: 6px;
  text-decoration: underline;
}
</style>
