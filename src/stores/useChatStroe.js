// stores/chat.js
import { defineStore } from "pinia";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatMessages: [],
    selectedRoom: null,
    chatRooms: [],
    unreadCount: 0,
    chatRoomInfo: {},
    chatRoomUsers: [],
    chatRoomScheduleList: [],
    userPets: [],
    ChatRoomScheculeDetail: [],
    myInfo: {},
    messages: [],
    stompClient: null,
    currentUserId: 2,
    myChatRooms: [],
    hasNext: true,
    lastUserId: null,
  }),

  actions: {
    async enterChatRoom(roomId) {
      // ✅ 1. 초기 메시지 로딩
      await this.loadMessages(roomId);

      // ✅ 2. WebSocket 연결 및 실시간 구독
      this.connectStomp(roomId, () => {
        console.log("📡 실시간 구독 시작!");
      });
    },

    async loadMessages(roomId) {
      try {
        const res = await axios.get(`/api/chat/chatroom/${roomId}/chat`);
        this.messages = res.data.result;
        console.log("📥 초기 메시지 로딩 완료:", res.data.result);
      } catch (e) {
        console.error("❌ 메시지 로딩 실패:", e);
      }
    },
    connectStomp(roomId, onConnectedCallback) {
      const socket = new SockJS("/ws");

      this.stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,

        onConnect: () => {
          console.log("✅ STOMP 연결 성공");

          // 채팅방 구독
          this.stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const msg = JSON.parse(message.body);
            console.log("msg");
            this.receiveMessage(msg);
          });

          if (onConnectedCallback) onConnectedCallback();
        },

        onStompError: (frame) => {
          console.error("❌ STOMP 오류 발생:", frame);
        },
      });

      this.stompClient.activate(); // 연결 시작
    },

    sendMessage(text, roomId) {
      const msg = {
        chatroomId: roomId,
        type: "text",
        text,
        timestamp: new Date().toISOString(),
      };

      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.publish({
          destination: `/app/chat/${roomId}`,
          body: JSON.stringify(msg),
        });
      } else {
        console.warn("⛔ STOMP 연결되지 않음 (테스트 메시지 추가)");
        this.messages.push({ ...msg, testMode: true });
      }
    },
    async submitScheduleParticipation(chatroomIdx, animalIds) {
      try {
        // const response = await axios.post(
        //   `/api/chatroom/${chatroomIdx}/participate`,
        //   {
        //     animalIds: animalIds,
        //   }
        // );
        console.log("참여 완료:", animalIds);
        // 필요하면 상태 업데이트
      } catch (error) {
        console.error("참여 실패:", error);
        throw error; // 에러를 밖으로 던져서 UI에서 처리하게
      }
    },
    async fetchMessages(roomId) {
      try {
        const { data } = await axios.get(`/api/chatroom/${roomId}/messages`);
        this.chatMessages = data;
      } catch (err) {
        console.error("💥 메시지 불러오기 실패:", err);
      }
    },

    async loadRooms() {
      try {
        const response = await axios.get(`/api/chat/`);
        this.chatRooms = response.data.result;
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      }
    },

    async loadMyChatRooms() {
      try {
        const response = await axios.get(`/api/chat/chatrooms/me`);
        this.chatRooms = response.data.result;
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      }
    },

    async getRoomInfo(chatroomIdx) {
      try {
        const response = {
          data: {
            idx: 1,
            title: "서울숲 산책하실 분",
            hashtags: ["햄스터", "친구", "삐약"],
            participants: 6,
          },
        };

        this.chatRoomInfo = response.data;
      } catch (error) {
        console.error("채팅방 정보 불러오기 실패:", error);
      }
    },

    async fetchUsers(chatRoomId) {
      if (!this.hasNext) return;

      const res = await axios.get(`/api/chat/chatroom/${chatRoomId}/users`, {
        params: {
          lastUserId: this.lastUserId,
          size: 20,
        },
      });

      const { content, hasNext } = res.data.result;
      this.chatRoomUsers.push(...content);
      this.hasNext = hasNext;
      if (content.length > 0) {
        this.lastUserId = content[content.length - 1].idx;
      }
    },

    resetUsers() {
      this.chatRoomUsers = [];
      this.hasNext = true;
      this.lastUserId = null;
    },

    async getChatRoomScheduleList(roomIdx) {
      try {
        const response = {
          data: [
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
            {
              idx: roomIdx,
              time: "25.04.12 11:00",
              place: "서울숲 산책",
            },
          ],
        };
        this.chatRoomScheduleList = response.data;
      } catch (err) {
        console.error("❌ 멤버 목록 불러오기 실패:", err);
      }
    },

    async getUserPets() {
      try {
        const response = {
          data: [
            {
              idx: 1,
              petName: "솜",
            },
            {
              idx: 2,
              petName: "솜",
            },
            {
              idx: 3,
              petName: "솜",
            },
            {
              idx: 4,
              petName: "솜",
            },
          ],
        };

        this.userPets = response.data;
      } catch (err) {
        console.error("실패");
      }
    },

    async getChatroomScheduleDetail(roomIdx) {
      try {
        const response = {
          data: {
            title: "병원 검진 예약",
            time: "11:00 ~ 12:00",
            place: "서울숲",
            memo: "진료 결과 다른 곳은 양호한데 과체중 진단을 받아서 다이어트가 필요하다고 하셨다.",
            participants: [
              { nickname: "agdddh", petIdx: 1 },
              { nickname: "agh", petIdx: 2 },
              { nickname: "agh", petIdx: 3 },
              { nickname: "agh", petIdx: 4 },
            ],
          },
        };

        this.ChatRoomScheculeDetail = response.data;
      } catch (err) {
        console.error(err);
      }
    },

    async getMyInfo() {
      try {
        const response = {
          data: {
            userId: 100,
            username: "petlover123",
            nickname: "짱봄맘",
            profileUrl: "...",
            roles: ["USER"],
          },
        };

        this.myInfo = response.data;
        console.log(this.myInfo);
      } catch (err) {}
    },

    receiveMessage(msg) {
      this.messages.push(msg);
    },

    selectRoom(room) {
      this.selectedRoom = room;
      this.chatMessages = [];
    },

    resetUnread() {
      this.unreadCount = 0;
    },

    async createChatRoom(title, tags) {
      const hashtags = tags
        .split("#")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const payload = {
        title: title,
        hashtags: hashtags,
      };

      await axios.post("/api/chat", payload);
    },
  },
});
