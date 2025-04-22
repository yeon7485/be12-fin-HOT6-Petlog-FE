<template>
  <div
    :class="[
      'chat-message',
      isMine ? 'my-message' : 'other-message',
      message.type + '-message',
    ]"
  >
    <!-- ✅ 상대방 메시지일 경우 유저 정보 표시 -->
    <template v-if="!isMine">
      <div class="user-info">
        <img
          :src="message.profileImage || defaultProfile"
          class="profile-img"
        />
        <div class="username">{{ message.nickname || "알 수 없음" }}</div>
      </div>
    </template>

    <!-- 텍스트 메시지 -->
    <template v-if="message.type === 'text'">
      <div class="chat-bubble">{{ message.content }}</div>
      <span class="chat-time">{{ formatTime(message.createdAt) }}</span>
    </template>

    <!-- 반려동물 카드 메시지 -->
    <template v-else-if="message.type === 'pet'">
      <div class="pet-chat-card" @click="$emit('show-pet', message.content)">
        <img :src="message.content.image" class="pet-chat-img" />
        <div class="pet-chat-info">
          <div class="pet-chat-name">
            {{ message.content.name }}
            <span class="gender">{{
              message.content.gender === "여" ? "♀" : "♂"
            }}</span>
          </div>
          <div class="pet-chat-detail">
            {{ message.content.breed }} / {{ message.content.age }}
          </div>
        </div>
      </div>
      <span class="chat-time">{{ formatTime(message.createdAt) }}</span>
    </template>

    <!-- 일정 카드 메시지 -->
    <template v-else-if="message.type === 'schedule'">
      <div class="schedule-chat-card">
        <div class="schedule-title">{{ message.schedule.title }}</div>
        <div class="schedule-datetime">{{ message.schedule.datetime }}</div>
        <div class="schedule-location">{{ message.schedule.location }}</div>
      </div>
      <span class="chat-time">{{ formatTime(message.timestamp) }}</span>
    </template>
  </div>
</template>

<script setup>
defineProps({
  message: Object,
  isMine: Boolean,
});
defineEmits(["show-pet"]);

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.chat-message {
  margin-bottom: 12px;
  max-width: 100%;
}

.my-message {
  display: flex;
  justify-content: flex-end;
}

.my-message .chat-bubble {
  background-color: #6a0104;
  color: #fff;
  line-height: 160%;
  border-radius: 12px;
  padding: 8px 12px;
  max-width: 60%; /* ✅ 최대 너비 제한 (줄바꿈 유도) */
  word-wrap: break-word; /* ✅ 단어 너무 길면 줄바꿈 */
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block; /* ✅ 내용 기반 width */
}

/* 상대방 말풍선 */
.user-info {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 이미지와 닉네임 사이 여백 */
  margin-bottom: 4px; /* 아래 말풍선과의 간격 */
}
.username {
  align-self: flex-end;
  margin-top: 2px;
}
/* 상대 메시지는 왼쪽 */
.other-message {
  justify-content: flex-start;
  align-items: flex-start;
}

.other-message .chat-bubble {
  background-color: #fff;
  color: #000;
  line-height: 160%;
  border-radius: 12px;
  padding: 8px 12px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.chat-time {
  font-size: 12px;
  color: #666;
  margin: 0 4px;
  align-self: flex-end;
}

.username {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.other-message .profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.pet-chat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;

  width: 30%;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
}

/* 이미지 크게 */
.pet-chat-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.pet-chat-info {
  display: flex;
  flex-direction: column;
  gap: 6px; /* ✅ 요소 간 세로 간격 */
}

/* 텍스트 크게 */
.pet-chat-name {
  font-weight: bold;
  font-size: 18px; /* ✅ 이름 크게 */
  margin-bottom: 4px;
}

.pet-chat-detail {
  font-size: 14px;
  color: #555;
}
</style>
