<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="login_container">
    <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

    <div class="login_box">
      <div class="form_group">
        <label for="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력해주세요." />
      </div>

      <div class="form_group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요." />
      </div>

      <button class="login_btn">로그인</button>

      <button class="kakao_btn">
        <img
          src="/src/assets/icons/kakao.png"
          alt="카카오 아이콘"
          class="kakao_icon"
        />
        카카오로 로그인
      </button>

      <p class="register_text">
        아직 회원이 아니신가요?
        <a href="#" class="register_link">회원가입</a>
      </p>
    </div>
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
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 17px;
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

.register_text {
  margin-top: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
}

.register_link {
  color: #800000;
  font-weight: bold;
  text-decoration: none;
  margin-left: 6px;
}
</style>
