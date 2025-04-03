import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/home/LandingPage.vue";
import Chat from "../pages/chat/Chat.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/chat", component: Chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
