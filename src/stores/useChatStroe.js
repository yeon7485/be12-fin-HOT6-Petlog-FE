// stores/chat.js
import { defineStore } from "pinia";
import axios from "axios";

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
  }),

  actions: {
    async fetchMessages(roomId) {
      try {
        const { data } = await axios.get(`/api/chatroom/${roomId}/messages`);
        this.chatMessages = data;
      } catch (err) {
        console.error("💥 메시지 불러오기 실패:", err);
      }
    },

    async sendMessage(roomId, messageContent) {
      try {
        const { data } = await axios.post(`/api/chatroom/${roomId}/messages`, {
          message: messageContent,
        });
        this.chatMessages.push(data);
      } catch (err) {
        console.error("💥 메시지 전송 실패:", err);
      }
    },

    async loadRooms() {
      try {
        // 임시로 mock 데이터 사용
        const response = {
          data: [
            {
              idx: 1,
              title: "서울숲 산책하실 분",
              hashtags: ["햄스터", "친구", "삐약"],
              participants: 6,
            },
            {
              idx: 2,
              title: "햄스터 친구 구해요",
              hashtags: ["햄스터", "친구", "삐약"],
              participants: 6,
            },
            {
              idx: 3,
              title: "햄스터 친구 구해요",
              hashtags: ["햄스터", "친구", "삐약"],
              participants: 6,
            },
          ],
        };
        this.chatRooms = response.data;
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

    async fetchUsers(roomIdx) {
      try {
        const response = {
          data: [
            {
              idx: roomIdx,
              imageUrl: "../../assets/images/cat1.jpg",
              userName: "agdddh",
            },
            {
              idx: roomIdx,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: roomIdx,
            },
            {
              idx: roomIdx,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: roomIdx,
            },
            {
              idx: roomIdx,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
            {
              idx: 5,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
            {
              idx: 3,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
          ],
        };
        this.chatRoomUsers = response.data;
      } catch (err) {
        console.error("❌ 멤버 목록 불러오기 실패:", err);
      }
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

    selectRoom(room) {
      this.selectedRoom = room;
      this.chatMessages = [];
    },

    resetUnread() {
      this.unreadCount = 0;
    },
  },
});
