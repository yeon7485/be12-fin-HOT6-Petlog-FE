import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../pages/home/LandingPage.vue";
import Chat from "../pages/chat/Chat.vue";
import ChatRoom from "../pages/chat/ChatRoom.vue";
import ChatRoomInfo from "../pages/chat/ChatRoomInfo.vue";
import ChatRoomSchecule from "../pages/chat/ChatRoomSchecule.vue";
import ChatRoomScheculeCreate from "../pages/chat/ChatRoomScheduleCreate2.vue";

import Mypage from "../pages/mypage/MyPage.vue";
import MypageProfile from "../pages/mypage/MypageProfile.vue";
import MypageCardList from "../pages/mypage/MypageCardList.vue";
import MypageCardCreate from "../pages/mypage/MypageCardCreate.vue";
import MypageQuestion from "../pages/mypage/MypageQuestion.vue";
import MypageAnswer from "../pages/mypage/MypageAnswer.vue";
import MypagePost from "../pages/mypage/MypagePost.vue";
import MypageComment from "../pages/mypage/MypageComment.vue";
import CardDetail from "../pages/mypage/MypageCardDetail.vue";
import MypageCardChange from "../pages/mypage/MypageCardChange.vue";

import FreeBoard from "../pages/board/FreeBoard.vue";
import InformationBoard from "../pages/board/InformationBoard.vue";
import BoardSidebar from "../pages/board/BoardSidebar.vue";
import QnaBoard from "../pages/board/QNaBoard.vue";
import AnswerDetail from "../pages/board/AnswerDetail.vue";
import AnswerModify from "../pages/board/AnswerModify.vue";
import PostRegister from "../pages/board/PostRegister.vue";
import PostDetail from "../pages/board/PostDetail.vue";
import PostModify from "../pages/board/PostModify.vue";
import Question from "../pages/board/QuestionRegister.vue";
import QuestionModify from "../pages/board/QuestionModify.vue";
import Answer from "../pages/board/AnswerRegister.vue";

import Admin from "../pages/admin/admin.vue";
import AdminProfile from "../pages/admin/AdminProfile.vue";
import AdminCategory from "../pages/admin/AdminCategory.vue";
import Schedule from "../pages/admin/Schedule.vue";
import ScheduleFix from "../pages/admin/ScheduleFix.vue";
import Record from "../pages/admin/Record.vue";
import RecordFix from "../pages/admin/RecordFix.vue";
import Board from "../pages/admin/BoardCategory.Vue";
import BoardFix from "../pages/admin/BoardCategoryFix.vue";

import Login from "../pages/user/Login.vue";
import Signup from "../pages/user/Signup.vue";
import PlaceSidebar from "../pages/place/PlaceSidebar.vue";
import Hospital from "../pages/place/SearchHospital.vue";
import Beauty from "../pages/place/SearchBeauty.vue";
import ChatRoomScheduleDetail from "../pages/chat/ChatRoomScheduleDetail.vue";

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
    path: "/chatroom/:chatroomIdx/chatroom-schedule/:scheduleIdx",
    component: ChatRoomScheduleDetail,
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
      { path: "card/create", component: MypageCardCreate },
      {
        path: "card/detail",
        name: "MypageCardDetail",
        component: CardDetail,
      },
      {
        path: "card/change",
        name: "MypageCardChange",
        component: MypageCardChange,
      },
      { path: "question", component: MypageQuestion },
      { path: "answer", component: MypageAnswer },
      { path: "post", component: MypagePost },
      { path: "comment", component: MypageComment },
    ],
  },

  {
    path: "/place",
    component: PlaceSidebar,
    redirect: "/place/hospital",
    children: [
      { path: "hospital", component: Hospital },
      { path: "beauty", component: Beauty },
    ],
  },

  {
    path: "/board",
    component: BoardSidebar,
    redirect: "/board/free",
    children: [
      { path: "information", component: InformationBoard },
      { path: "free", component: FreeBoard },
      { path: "qna", component: QnaBoard },
      { path: "qna/register", component: Question },
      { path: "qna/:id", component: AnswerDetail },
      { path: "register", component: PostRegister },
      { path: "qna/answer/register", component: Answer },
      { path: "post/:id", component: PostDetail },
      { path: "post/modify", component: PostModify },
      { path: "question/modify", component: QuestionModify },
      { path: "qna/answer/modify", component: AnswerModify },
    ],
  },

  {
    path: "/admin",
    component: Admin,
    redirect: "/admin/profile",
    children: [
      { path: "profile", component: AdminProfile },
      { path: "category", component: AdminCategory },
      { path: "category/schedule", component: Schedule },
      { path: "category/schedule/fix", component: ScheduleFix },
      { path: "category/record", component: Record },
      { path: "category/record/fix", component: RecordFix },
      { path: "category/board", component: Board },
      { path: "category/board/fix", component: BoardFix },
    ],
  },

  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
