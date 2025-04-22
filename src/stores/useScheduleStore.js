import axios from "axios";
import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    currentDate: new Date(),
    type: "SCHEDULE",
    currentPet: null,
    plans: [],
    records: [],
    planDetail: {
      idx: 2,
      title: "병원 검진 예약 병원 검진 예약",
      color: "#00C9CD",
      category: "병원",
      fromChat: false,
      recurring: true,
      repeatCycle: "일",
      repeatCount: 3,
      repeatEndAt: "2025-04-07T12:00:00",
      startAt: "2025-04-07T11:00:00",
      endAt: "2025-04-07T12:00:00",
      placeId: "api_place_id",
      placeName: "서울멍냥병원",
      memo: "정기검진",
    },
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
        const response = await axios.get(`/api/schedule/date/${year}/${month}/${day}`);

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getRecordsByDate(year, month, day) {
      try {
        const response = await axios.get(`/api/daily-record/date/${year}/${month}/${day}`);

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getSchedulesByPet(petIdx) {
      try {
        const response = await axios.get(`/api/schedule/pet/${petIdx}`);
        this.plans = response.data.result;
        console.log(this.plans);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
