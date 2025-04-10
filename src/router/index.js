import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../pages/common/LandingPage.vue";
import Chat from "../pages/chat/Chat.vue";
import ChatRoom from "../pages/chat/ChatRoom.vue";
import ChatRoomInfo from "../pages/chat/ChatRoomInfo.vue";
import ChatRoomSchecule from "../pages/chat/ChatRoomSchecule.vue";
import ChatRoomScheculeCreate from "../pages/chat/ChatRoomScheduleCreate2.vue";
import Schedule from "../pages/schedule/Schedule.vue";

import Mypage from "../pages/mypage/MyPage.vue";
import MypageProfile from "../pages/mypage/MypageProfile.vue";
import MypageCardList from "../pages/mypage/MypageCardList.vue";
import MypageCardCreate from "../pages/mypage/MypageCardCreate.vue";
import MypageQuestion from "../pages/mypage/MypageQuestion.vue";
import MypageAnswer from "../pages/mypage/MypageAnswer.vue";
import MypagePost from "../pages/mypage/MypagePost.vue";
import MypageComment from "../pages/mypage/MypageComment.vue";
import CardDetail from "../pages/mypage/MypageCardDetail.vue";
import MypageCardChange from "../pages/mypage/ModifyMypageCard.vue";

import FreeBoard from "../pages/board/FreeBoard.vue";
import InformationBoard from "../pages/board/InformationBoard.vue";
import BoardSidebar from "../pages/board/BoardSidebar.vue";
import QnaBoard from "../pages/board/QnaBoard.vue";
import QuestionDetail from "../pages/board/QuestionDetail.vue";
import PostRegister from "../pages/board/PostRegister.vue";
import PostDetail from "../pages/board/PostDetail.vue";
import QuestionRegister from "../pages/board/QuestionRegister.vue";
import AnswerRegister from "../pages/board/AnswerRegister.vue";

import Admin from "../pages/admin/Admin.vue";
import AdminProfile from "../pages/admin/AdminProfile.vue";
import AdminCategory from "../pages/admin/AdminCategory.vue";
import ScheduleCategory from "../pages/admin/ScheduleCategory.vue";
import UpdateScheduleCategory from "../pages/admin/ModifyScheduleCategory.vue";
import Record from "../pages/admin/RecordCategory.vue";
import RecordFix from "../pages/admin/ModifyRecordCategory.vue";
import Board from "../pages/admin/BoardCategory.Vue";
import BoardFix from "../pages/admin/ModifyBoardCategory.vue";

import Login from "../pages/user/Login.vue";
import Signup from "../pages/user/Signup.vue";
import PlaceSidebar from "../pages/place/PlaceSidebar.vue";
import Hospital from "../pages/place/SearchHospital.vue";
import Beauty from "../pages/place/SearchBeauty.vue";
import ChatRoomScheduleDetail from "../pages/chat/ChatRoomScheduleDetail.vue";
import UserLayout from "../pages/user/UserLayout.vue";

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
    component: UserLayout,
    children: [
      { path: "login", component: Login },
      { path: "signup", component: Signup },
    ],
  },

  {
    path: "/mypage",
    component: Mypage,
    redirect: "/mypage/profile",
    children: [
      { path: "profile", component: MypageProfile },
      { path: "cardlist", component: MypageCardList },
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
    path: "/schedule",
    component: Schedule,
    children: [],
  },

  {
    path: "/board",
    component: BoardSidebar,
    redirect: "/board/free",
    children: [
      { path: "information", component: InformationBoard },
      { path: "free", component: FreeBoard },
      { path: ":boardType/post/:id/modify", component: PostRegister },
      { path: ":boardType/register", component: PostRegister },
      { path: ":boardType/post/:id", component: PostDetail },

      { path: "qna", component: QnaBoard },
      { path: "qna/register", component: QuestionRegister },
      { path: "qna/:id/modify", component: QuestionRegister },
      { path: "qna/:id", component: QuestionDetail },

      { path: "qna/answer/register", component: AnswerRegister },
      { path: "qna/:questionId/answer/:id/modify", component: AnswerRegister,},
    ],
  },

  {
    path: "/admin",
    component: Admin,
    redirect: "/admin/profile",
    children: [
      { path: "profile", component: AdminProfile },
      { path: "category", component: AdminCategory },
      { path: "category/schedule", component: ScheduleCategory },
      { path: "category/schedule/fix", component: UpdateScheduleCategory },
      { path: "category/record", component: Record },
      { path: "category/record/fix", component: RecordFix },
      { path: "category/board", component: Board },
      { path: "category/board/fix", component: BoardFix },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
