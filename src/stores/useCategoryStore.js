import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    scheduleCategories: [],
    recordCategories: [],
    boardTypes: [],
    boardCategories: [],
  }),

  actions: {
    // ✅ 카테고리 추가
    async addCategory(type, { name, color = null }) {
      const payload = {
        name,
        description: "",
        type,
      };

      // color는 BOARD_CATEGORY 등에서 null일 수 있으므로 조건부로 추가
      if (color !== null) {
        payload.color = color;
      }

      console.log("📦 전송 payload 확인:", payload);
      await axios.post("/api/category/register", payload);
      await this.fetchCategories(type);
    },

    // ✅ 카테고리 목록 조회
    async fetchCategories(type) {
      try {
        const response = await axios.get(`/api/category/list`, {
          params: { categoryType: type },
        });

        console.log("📥 받아온 카테고리 목록:", response.data);

        switch (type) {
          case "SCHEDULE":
            this.scheduleCategories = response.data;
            break;
          case "DAILY_RECORD":
            this.recordCategories = response.data;
            break;
          case "BOARD_TYPE":
            this.boardTypes = response.data;
            break;
          case "BOARD":
            this.boardCategories = response.data;
            break;
          default:
            console.warn("⚠️ 알 수 없는 타입:", type);
        }

        return response.data;
      } catch (error) {
        console.error("❌ 카테고리 목록 조회 실패:", error);
      }
    },

    // ✅ 카테고리 수정
    async updateCategory(type, { idx, name, color = null, description = "" }) {
      const payload = {
        categoryId: idx,
        name,
        description,
      };

      // color가 null이 아니면 포함
      if (color !== null) {
        payload.color = color;
      }

      console.log("✏️ 수정 payload 확인:", payload);
      await axios.put(`/api/category/${idx}`, payload);
      await this.fetchCategories(type);
    },

    // ✅ 카테고리 삭제
    async deleteCategory(type, { idx }) {
      console.log(`🗑️ 카테고리 삭제 요청: ${idx}`);
      await axios.delete(`/api/category/${idx}`);
      await this.fetchCategories(type);
    },
  },
});
