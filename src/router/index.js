import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/home/LandingPage.vue";
import Chat from "../pages/chat/Chat.vue";
import ChatRoom from "../pages/chat/ChatRoom.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/chat", component: Chat },
  { path: "/chatroom/:chatroomIdx", component: ChatRoom },
  {
    path: "/user",
    component: { render: () => {} },
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
