<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const email = ref("");
const password = ref("");
const nickname = ref("");
const agreed = ref(false);

const handleSignup = () => {
  if (!agreed.value) {
    alert("약관에 동의하셔야 회원가입이 가능합니다.");
    return;
  }
  alert("회원가입이 완료되었습니다.");
};
</script>

<template>
  <div class="signup_container">
    <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

    <p class="login_text">
      이미 회원이신가요?
      <router-link to="/login" class="login_link">로그인</router-link>
    </p>

    <div class="signup_box">
      <div class="form_group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" placeholder="이메일을 입력해주세요." />
      </div>

      <div class="form_group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요." />
      </div>

      <div class="form_group">
        <label for="nickname">닉네임</label>
        <input type="text" id="nickname" v-model="nickname" placeholder="닉네임을 입력해주세요." />
      </div>

      <div class="agree">
        <input type="checkbox" id="agree" v-model="agreed" class="checkbox" />
        <label for="agree">
          <span class="check_text">
            <span class="bold_red">개인정보처리방침</span> 및
            <span class="bold_red">이용약관</span>에 동의합니다.
          </span>
        </label>
      </div>

      <button class="signup_btn" @click="handleSignup">회원가입</button>

      <button class="kakao_btn">
        <img src="/src/assets/icons/kakao.png" alt="카카오 아이콘" class="kakao_icon" />
        카카오로 회원가입
      </button>
    </div>
  </div>
</template>

<style scoped>
.signup_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf7f1;
  height: 100vh;
  padding-top: 60px;
}

.logo_img {
  height: 90px;
  margin-bottom: 10px;
  cursor: pointer;
}

.login_text {
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
}

.login_link {
  color: #800000;
  font-weight: bold;
  margin-left: 4px;
  text-decoration: underline;
}

.signup_box {
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

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
}

.agree {
  display: flex;
  align-items: flex-start; /* 위 정렬 */
  margin-bottom: 10px;
  font-size: 13px;
}

.checkbox {
  margin-top: 2px;
  width: 16px;
  height: 16px;
  accent-color: #800000;
  cursor: pointer;
}

.check_text {
  position: relative;
  top: 2px; /* 👈 아래로 미세하게 조정 */
  margin-left: 8px;
  color: #333;
  line-height: 1.4;
}

.bold_red {
  color: #800000;
  font-weight: bold;
  text-decoration: underline;
}

.signup_btn {
  width: 100%;
  padding: 14px;
  background-color: #800000;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kakao_btn {
  width: 100%;
  padding: 14px;
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
</style>
