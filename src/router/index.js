import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/home/LandingPage.vue";
import Chat from "../pages/chat/Chat.vue";
import ChatRoom from "../pages/chat/ChatRoom.vue";
import ChatRoomInfo from "../pages/chat/ChatRoomInfo.vue";
import ChatRoomSchecule from "../pages/chat/ChatRoomSchecule.vue";
import Mypage from "../pages/mypage/MyPage.vue";
import MypageProfile from "../pages/mypage/MypageProfile.vue";
import MypageCardList from "../pages/mypage/MypageCardList.vue";
import MypageQuestion from "../pages/mypage/MypageQuestion.vue";
import MypageAnswer from "../pages/mypage/MypageAnswer.vue";
import MypagePost from "../pages/mypage/MypagePost.vue";
import MypageComment from "../pages/mypage/MypageComment.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/chat", component: Chat },
  { path: "/chatroom/:chatroomIdx", component: ChatRoom },
  { path: "/chatroom/:chatroomIdx/chatroom-info", component: ChatRoomInfo },
  {
    path: "/chatroom/:chatroomIdx/chatroom-schedule",
    component: ChatRoomSchecule,
  },
  {
    path: "/user",
    component: { render: () => {} },
    children: [],
  },

  {
    path: "/mypage",
    component: Mypage,
    redirect: "/mypage/profile", 
    children: [
      { path: "profile", component: MypageProfile },
      { path: "card", component: MypageCardList },
      { path: "question", component: MypageQuestion },
      { path: "answer", component: MypageAnswer },
      { path: "post", component: MypagePost },
      { path: "comment", component: MypageComment },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;