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
    ChatRoomScheculeDetail: [],
    myInfo: {},
  }),

  actions: {
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
              idx: 1,
              imageUrl: "../../assets/images/cat1.jpg",
              userName: "agdddh",
            },
            {
              idx: 2,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: roomIdx,
            },
            {
              idx: 3,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: roomIdx,
            },
            {
              idx: 4,
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
            {
              idx: 3,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
            {
              idx: 3,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
            {
              idx: 3,
              imageUrl: "srcassetsimagescat1.jpg",
              userName: "agh",
            },
            {
              idx: 3,
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

    selectRoom(room) {
      this.selectedRoom = room;
      this.chatMessages = [];
    },

    resetUnread() {
      this.unreadCount = 0;
    },
  },
});
