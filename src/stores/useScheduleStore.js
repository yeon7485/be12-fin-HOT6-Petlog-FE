import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    currentDate: "",
    type: "PLAN",
    plans: [
      {
        date: "2025-04-05T11:00:00",
        title: "산책 가기",
        color: "#65924D",
        category: "산책",
        fromChat: true,
      },
      {
        date: "2025-04-07T11:00:00",
        title: "병원 검진 예약 병원 검진 예약",
        color: "#00C9CD",
        category: "병원",
        fromChat: false,
      },
      {
        date: "2025-03-27T17:00:00",
        title: "미용 예약",
        color: "#E6B0BD",
        category: "미용",
        fromChat: false,
      },
    ],
    records: [
      {
        date: "2025-04-10T11:00:00",
        title: "체중 체크",
        color: "#FB615D",
        category: "체중",
        memo: "2.5kg",
        image: null,
      },
      {
        date: "2025-04-10T12:00:00",
        title: "밥 주기",
        color: "#FFA264",
        category: "식사량",
        memo: `사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! 
        사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! 
        사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! 사료 한 그릇 다 먹음! `,
        image: null,
      },
      {
        date: "2025-04-10T17:00:00",
        title: "누워서 나를 쳐다보는 빙봉이",
        color: "#00C9CD",
        category: "오늘의 사진",
        memo: "냥냥펀치 맞기 전",
        image: "/src/assets/images/cat2.jpg",
      },
    ],
  }),

  actions: {
    setCurrentDate(date) {
      this.currentDate = date;
    },
  },
});
