import axios from "axios";
import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    currentDate: new Date(),
    type: "SCHEDULE",
    currentPet: null,
    plans: [],
    records: [],
    todaySchedules: [], // ✅ 오늘 일정 저장용
    planDetail: {},
  }),

  persist: {
    storage: sessionStorage,
    paths: ["currentDate", "currentPet"],
  },

  actions: {
    setCurrentDate(date) {
      this.currentDate = new Date(date);
    },
    setItemDetail(data) {
      this.planDetail = data;
    },
    getItemDetail(idx) {
      console.log(idx);
      return this.planDetail;
    },

    async createSchedule(petIdx, planData) {
      try {
        const response = await axios.post(`/api/schedule/pet/${petIdx}`, planData);
        return response.data;
      } catch (err) {
        alert("일정 등록에 실패했습니다.");
        console.log(err);
      }
    },

    async updateSchedule(scheduleIdx, petIdx, scheduleUpdateData) {
      try {
        const response = await axios.put(
          `/api/schedule/pet/${petIdx}/schedule/${scheduleIdx}`,
          scheduleUpdateData
        );
        return response.data;
      } catch (err) {
        alert("일정 수정에 실패했습니다.");
        console.error(err);
      }
    },

    async getAllSchedule() {
      try {
        const response = await axios.get("/api/schedule/pet");
        this.plans = response.data.result;
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async createRecord(petIdx, recordData) {
      try {
        const response = await axios.post(`/api/daily-record/pet/${petIdx}`, recordData);
        return response.data;
      } catch (err) {
        alert("기록 등록에 실패했습니다.");
        console.log(err);
      }
    },

    async getSchedulesByDate(year, month, day) {
      try {
        const response =
          this.currentPet?.idx == null
            ? await axios.get(`/api/schedule/date/${year}/${month}/${day}`)
            : await axios.get(
                `/api/schedule/pet/${this.currentPet.idx}/date/${year}/${month}/${day}`
              );
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getRecordsByDate(year, month, day) {
      try {
        const response =
          this.currentPet?.idx == null
            ? await axios.get(`/api/daily-record/date/${year}/${month}/${day}`)
            : await axios.get(
                `/api/daily-record/pet/${this.currentPet.idx}/date/${year}/${month}/${day}`
              );
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getSchedulesByPet(petIdx) {
      try {
        const response = await axios.get(`/api/schedule/pet/${petIdx}`);
        this.plans = response.data.result;
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getScheduleDetail(scheduleIdx) {
      try {
        const response = await axios.get(`/api/schedule/${scheduleIdx}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getRecordDetail(recordIdx) {
      try {
        const response = await axios.get(`/api/daily-record/${recordIdx}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async loadTodaySchedules() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        const response = await this.getSchedulesByDate(year, month, day);
        console.log("오늘 일정 응답:", response.result);
        this.todaySchedules = response.result.slice(0, 3);
      } catch (err) {
        console.error("오늘 일정 불러오기 실패", err);
        this.todaySchedules = [];
      }
    },
  },
});
