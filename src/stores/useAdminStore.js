import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    deletedUsers: [],
    adminChatRooms: [],
  }),

  actions: {
    async fetchDeletedUsers() {
      try {
        const response = await axios.get('/api/admin/deletedUsers');
        this.deletedUsers = response.data.result;
      } catch (error) {
        console.error("삭제된 사용자 목록을 불러오는 데 실패했습니다.", error);
      }
    },

    async restoreUser(userId) {
      try {
        await axios.put(`/api/admin/restoreUser/${userId}`);
        this.fetchDeletedUsers();
        alert("사용자가 복구되었습니다.");
      } catch (error) {
        alert("사용자 복구에 실패했습니다.");
        console.error(error);
      }
    },

    async fetchAdminChatRooms() {
      try {
        const response = await axios.get('/api/admin/chatroom');  
        this.adminChatRooms = response.data;  
      } catch (error) {
        console.error("❌ ADMIN 채팅방 목록 불러오기 실패:", error);
        this.adminChatRooms = [];
      }
    },

    async createEventChatRoom(payload) {
      try {
        await axios.post('/api/chat', payload); // 채팅방 생성 API 호출
        alert('✅ 이벤트 채팅방이 생성되었습니다.');
      } catch (error) {
        console.error('❌ 이벤트 채팅방 생성 실패', error);
        alert('이벤트 채팅방 생성 실패');
      }
    }
  },
});
