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
import Advertisement from "../pages/board/AdvertisementBoard.vue";
import FreeBoard from "../pages/board/FreeBoard.vue";
import InformationBoard from "../pages/board/InformationBoard.vue";
import BoardSidebar from "../pages/board/BoardSidebar.vue";
import QnaBoard from "../pages/board/QNaBoard.vue";
import AnswerDetail from "../pages/board/AnswerDetail.vue";
import BoardRegister from "../pages/board/BoardRegister.vue";
import Question from "../pages/board/QuestionRegister.vue";
import ChatRoomScheculeCreate from "../pages/chat/ChatRoomScheculeCreate.vue";
import Admin from "../pages/admin/admin.vue";
import AdminProfile from "../pages/admin/AdminProfile.vue";
import AdminCategory from "../pages/admin/AdminCategory.vue";

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
    path: "/chatroom/:chatroomIdx/chatroom-schedule/create",
    component: ChatRoomScheculeCreate,
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

  {
    path: "/board",
    component: BoardSidebar,
    redirect: "/board/free",
    children: [
      { path: "information", component: InformationBoard },
      { path: "advertisement", component: Advertisement },
      { path: "free", component: FreeBoard },
      { path: "qna", component: QnaBoard },
      { path: "qna/register", component: Question },
      { path: "qna/:id", component: AnswerDetail },
      { path: "register", component: BoardRegister },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    redirect: "/admin/profile", 
    children: [
      { path: "profile", component: AdminProfile },
      { path: "category", component: AdminCategory },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
