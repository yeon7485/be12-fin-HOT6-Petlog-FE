<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/useUserStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import LoadingSpinner from "../common/components/LoadingSpinner.vue";
import { nextTick } from "vue";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const userStore = useUserStore();
const loadingStore = useLoadingStore();

const signupData = reactive({
  email: "",
  password: "",
  nickname: "",
  profileImageUrl: "",
  role: "USER",
});

const agreed = ref(false);
const showPassword = ref(false);
const checkEmail = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,16}$/;

const handleCheckEmail = async () => {
  if (!signupData.email.trim()) {
    alert("이메일을 입력해주세요.");
  } else if (!emailRegex.test(signupData.email)) {
    alert("올바른 이메일 형식을 입력해주세요.");
  } else {
    const result = await userStore.checkEmailDuplicate(signupData.email);
    if (result.isSuccess) {
      if (result.result) {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("사용 가능한 이메일입니다.");
        checkEmail.value = true;
        await nextTick();
      }
    }
  }
};

// 이메일이 변경되면 checkEmail을 false로 초기화
watch(
  () => signupData.email,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      checkEmail.value = false;
    }
  }
);

const validateSignupData = () => {
  if (!agreed.value) {
    return "약관에 동의하셔야 회원가입이 가능합니다.";
  }

  if (!signupData.email.trim()) {
    return "이메일을 입력해주세요.";
  }
  if (!emailRegex.test(signupData.email)) {
    return "올바른 이메일 형식을 입력해주세요.";
  }

  if (!signupData.password) {
    return "비밀번호를 입력해주세요.";
  }
  if (!pwRegex.test(signupData.password)) {
    return "비밀번호는 영어, 숫자, 특수문자를 포함한 8~20자여야 합니다.";
  }

  if (!signupData.nickname.trim()) {
    return "닉네임을 입력해주세요.";
  }
  if (!nicknameRegex.test(signupData.nickname)) {
    return "닉네임은 2~16자의 한글, 영문, 숫자만 사용할 수 있습니다. (자음/모음, 특수문자 불가)";
  }

  if (!checkEmail.value) {
    return "이메일 중복 확인이 필요합니다.";
  }

  return null; // 모든 검증 통과
};

const handleSignup = async () => {
  const errorMsg = validateSignupData();
  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  try {
    loadingStore.isLoading = true;
    const result = await userStore.signup(signupData);
    console.log(result);

    if (result.isSuccess) {
      alert("이메일 인증 후 로그인 가능합니다. 이메일을 확인해주세요 📩");
      router.push("/");
    } else {
      alert(result.message || "회원가입에 실패했습니다.");
    }
  } catch (err) {
    console.error("회원가입 오류:", err);
    alert("서버 오류로 회원가입에 실패했습니다.");
  } finally {
    loadingStore.isLoading = false;
  }
};

const kakaoSignup = () => {
  window.location.href = window.ENV.VITE_KAKAO_LOGIN_URL;
};
</script>

<template>
  <LoadingSpinner :isLoading="loadingStore.isLoading" />
  <div class="signup_container">
    <img src="/src/assets/images/logo.png" alt="logo" class="logo_img" @click="toHome" />

    <p class="login_text">
      이미 회원이신가요?
      <router-link to="/user/login" class="login_link">로그인</router-link>
    </p>

    <form class="signup_box">
      <div class="form_group">
        <label for="email">이메일</label>
        <div class="email_box">
          <input
            class="input_box"
            type="email"
            id="email"
            autocomplete="username"
            v-model="signupData.email"
            placeholder="이메일 형식에 맞게 입력 (test@test.com)"
          />
          <button
            type="button"
            class="email_check_btn"
            :class="{ disabled_btn: checkEmail }"
            @click="handleCheckEmail"
            :disabled="checkEmail"
          >
            {{ checkEmail ? "확인 완료" : "중복 확인" }}
          </button>
        </div>
      </div>

      <div class="form_group">
        <label for="password">비밀번호</label>
        <input
          class="input_box"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          autocomplete="current-password"
          v-model="signupData.password"
          placeholder="비밀번호 입력 (영어, 숫자, 특수문자 포함 8자 이상)"
        />
        <div class="password_toggle">
          <input type="checkbox" id="showPassword" v-model="showPassword" class="checkbox" />
          <label class="show_password" for="showPassword">비밀번호 보기</label>
        </div>
      </div>

      <div class="form_group">
        <label for="nickname">닉네임</label>
        <input
          class="input_box"
          type="text"
          id="nickname"
          v-model="signupData.nickname"
          placeholder="4~16자의 한글, 영문, 숫자만 사용 (자음/모음, 특수문자 X)"
        />
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

      <button
        type="button"
        class="signup_btn"
        @click="handleSignup"
        :disabled="loadingStore.isLoading"
      >
        회원가입
      </button>

      <button
        type="button"
        class="kakao_btn"
        @click="kakaoSignup"
        :disabled="loadingStore.isLoading"
      >
        <img src="/src/assets/icons/kakao.png" alt="카카오 아이콘" class="kakao_icon" />
        카카오로 회원가입
      </button>
    </form>
  </div>
</template>

<style scoped>
.signup_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf7f1;
  padding: 60px 0;
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
  margin-bottom: 35px;
}

.form_group > label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 15px;
}

.email_box {
  display: flex;
  gap: 5px;
}

.email_check_btn {
  background: var(--main-color-brown);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  white-space: nowrap;
  padding: 5px 8px;
}

.email_check_btn:active {
  background-color: var(--main-color-hover);
}

.disabled_btn {
  background-color: var(--gray400);
  cursor: not-allowed;
}

.email_check_btn:disabled:active {
  background-color: var(--gray400);
}

.input_box {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 13px;
  background-color: #fff;
  box-sizing: border-box;
}

.show_password {
  font-size: 14px;
  margin-top: 3px;
  color: var(--gray700);
}

.password_toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
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
.signup_btn:hover {
  background-color: #700000;
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
