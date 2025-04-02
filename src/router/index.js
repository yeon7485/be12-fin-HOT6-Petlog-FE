import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/home/LandingPage.vue";

const routes = [{ path: "/", component: LandingPage }];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
