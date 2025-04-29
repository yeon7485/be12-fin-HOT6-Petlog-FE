import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    deletedUsers: [], 
    isLoading: false, 
  }),

  actions: {
    async fetchDeletedUsers() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/admin/deletedUsers');
        this.deletedUsers = response.data;  
      } catch (error) {
        console.error("삭제된 사용자 목록을 불러오는 데 실패했습니다.", error);
      } finally {
        this.isLoading = false;
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
  },
});
