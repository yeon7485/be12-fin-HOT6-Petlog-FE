// stores/chat.js
import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chatMessages: [],
    selectedRoom: null,
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

    selectRoom(room) {
      this.selectedRoom = room;
      this.chatMessages = [];
    },

    resetUnread() {
      this.unreadCount = 0;
    },
  },
});
