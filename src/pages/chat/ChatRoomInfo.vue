<template>
  <div class="chatroom-info-container">
    <!-- 뒤로가기 -->
    <ChatHeader title="서울숲에서 같이 멍멍이 산책시킬 사람 !!" />

    <div class="schedule-wrapper">
      <router-link to="/chatroom/1/chatroom-schedule">
        <button class="schedule-button">
          <img src="../../assets/images/calendar-icon.svg" />
          채팅방 일정 조회
        </button>
      </router-link>
    </div>

    <!-- 채팅방 정보 -->
    <div class="room-info-section">
      <h3 class="section-title">채팅방 정보</h3>

      <label class="input-label">채팅방 이름</label>
      <input
        type="text"
        class="room-input"
        :value="title"
        :readonly="!isEditing"
      />

      <label class="input-label">해시태그</label>
      <textarea
        v-model="hashtagsText"
        class="room-textarea"
        placeholder="#산책 #멍멍 #서울숲"
        :readonly="!isEditing"
      />

      <div v-if="isEditing" class="edit-actions">
        <button class="cancel-button" @click="cancel">취소</button>
        <button class="save-button" @click="save">저장</button>
      </div>
      <div v-else class="edit-actions">
        <button class="update-button" @click="isEditing = true">
          채팅방 수정
        </button>
      </div>
    </div>

    <!-- 대화상대 -->
    <div class="members-section">
      <h3 class="section-title">
        대화상대 {{ chatStore.chatRoomUsers.length }}
      </h3>
      <div class="member-list" ref="scrollContainer" @scroll="handleScroll">
        <UserCard
          v-for="user in chatStore.chatRoomUsers"
          :key="user.idx"
          :userName="user.userName"
          :imageUrl="user.imageUrl"
        />
      </div>
    </div>

    <!-- 나가기 버튼 -->
    <div class="chatroom-leave-wrapper">
      <img src="../../assets/images/mdi_logout.svg" />
      <button class="leave-button">나가기</button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onMounted, readonly, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ChatHeader from "./ChatHeader.vue";
import UserCard from "./components/UserCard.vue";
import { useChatStore } from "../../stores/useChatStroe";
const chatStore = useChatStore();

const route = useRoute();

const isEditing = ref(false); // ✨ 수정 모드 여부

const chatroomIdx = route.params.chatroomIdx;

const title = ref("");
const hashtagsText = ref("");
const scrollContainer = ref(null);

const handleScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    chatStore.fetchUsers(chatroomIdx);
  }
};

// 저장 버튼 클릭 시
const save = async () => {
  const hashtags = hashtagsText.value
    .trim()
    .split(/\s+/)
    .map((tag) => tag.replace(/^#/, ""));

  await chatStore.updateRoom({
    title: title.value,
    hashtags,
  });
  isEditing.value = false;
};

// 취소 버튼 클릭 시 → 원래 데이터 복원
const cancel = () => {
  title.value = chatStore.chatRoomInfo.title;
  hashtagsText.value = chatStore.chatRoomInfo.hashtags
    .map((t) => `#${t}`)
    .join(" ");
  isEditing.value = false;
};
onMounted(() => {
  chatStore.resetUsers();
  chatStore.fetchUsers(chatroomIdx);
  chatStore.getRoomInfo(chatroomIdx);
  title.value = chatStore.chatRoomInfo.title;
  const tags = chatStore.chatRoomInfo.hashtags;
  hashtagsText.value = tags
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");
});
</script>

<style>
@import "./chat-base.css";
/* 전체 컨테이너 */
.chatroom-info-container {
  width: 100%;
  max-width: 720px;
  margin: 40px auto;
  background-color: #f4eee7;
  border-radius: 20px;
  padding: 32px 0; /* ✅ 상하만 여백 */
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc; /* ✅ 얇은 회색 선 */
  margin-bottom: 12px; /* ✅ 아래 요소와 간격 */
}
.room-title {
  color: #000;

  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

/* 일정 버튼: 입력영역과 오른쪽 정렬 맞춤 */
.schedule-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}

/* 일정 버튼 스타일 */
.schedule-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #6a0104;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
}

/* 채팅방 정보 섹션 */
.room-info-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}
.room-info-section .input-label {
  /* color: var(--gray700, #616161); */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.room-input,
.room-textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  background-color: #fff;
}

.room-textarea {
  resize: none;
  height: 80px;
}

.update-button {
  align-self: center; /* ✅ 가운데 정렬 */
  background: white;
  border: 1px solid #aaa;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

/* 멤버 섹션 */
.members-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 130px; /* ✅ 여기 좌우 여백 */
}

.member-list {
  border: 1px solid #ccc;
  border-radius: 12px;
  background: white;
  padding: 12px;
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 160px; /* ✅ 높이 제한 */
  overflow-y: auto; /* ✅ 세로 스크롤 자동 */
}

.chatroom-leave-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
}

.leave-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}

.edit-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.cancel-button,
.save-button {
  background: white;
  border: 1px solid #aaa;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>
