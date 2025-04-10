// stores/chat.js
import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatMessages: [],
    selectedRoom: null,
    chatRooms: [],
    unreadCount: 0,
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
              title: "햄스터 친구 구해요",
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

    selectRoom(room) {
      this.selectedRoom = room;
      this.chatMessages = [];
    },

    resetUnread() {
      this.unreadCount = 0;
    },
  },
});
