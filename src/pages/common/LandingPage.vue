<script setup>
import { onMounted, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../../stores/useUserStore";
import logo from "/src/assets/images/logo.png";

const userStore = useUserStore();
const router = useRouter();
onMounted(async () => {
  await userStore.loginCheck();
});

watchEffect(() => {
  console.log(userStore.isLogin);
  if (userStore.isLogin) {
    router.replace("/home");
  }
});
</script>

<template>
  <div class="container">
    <img src="/src/assets/images/main_image.png" alt="background" class="background_img" />
    <div class="intro_box">
      <img :src="logo" alt="logo" class="logo_img" />
      <div class="text_box">
        <p>
          일정 관리부터 커뮤니티까지, <br />
          반려생활을 더 편리하게!
        </p>
      </div>
      <router-link to="/user/login" class="start_btn">지금 시작하기</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 700px;
  position: relative;
  background-color: #fff9f2;
}

.background_img {
  position: absolute; /* 이미지 고정 위치 */
  bottom: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
}

.intro_box {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 40px 0;
  position: relative;
}

.logo_img {
  width: 470px;
  height: 169px;
  object-fit: contain;
}

.text_box > p {
  text-align: center;
  line-height: 160%;
  font-family: Cafe24Ssurround;
  font-size: 20px;
  padding: 20px 0 40px;
}

.start_btn {
  text-decoration: none;
  font-family: Cafe24Ssurround;
  color: var(--main-color-brown);
  font-size: 20px;
  background-color: var(--main-color-light);
  padding: 15px 36px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: all 0.3s;
}

.start_btn:hover {
  filter: brightness(0.9);
}
</style>
