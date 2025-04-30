<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="container">
    <img src="/src/assets/icons/delete_user.svg" alt="탈퇴한 회원" class="user_icon" />
    <h1 class="title">탈퇴한 회원입니다.</h1>
    <p class="text">다시 가입하고 싶으면 관리자에게 문의하세요.</p>
    <button
      class="home_btn"
      @click="
        {
          {
            router.replace('/');
          }
        }
      "
    >
      홈으로 돌아가기
    </button>
  </div>
</template>

<style scoped>
.container {
  background-color: #fdf7f1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.user_icon {
  width: 180px;
}

.title {
  font-family: Cafe24Ssurround;
}

.home_btn {
  text-decoration: none;
  font-family: Cafe24Ssurround;
  color: var(--main-color-brown);
  font-size: 20px;
  background-color: var(--main-color-light);
  padding: 15px 36px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: all 0.3s;
  margin-top: 30px;
}

.home_btn:hover {
  filter: brightness(0.9);
}
</style>
