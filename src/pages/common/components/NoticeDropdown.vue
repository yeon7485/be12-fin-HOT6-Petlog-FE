<script setup>
import { ref } from 'vue'

// 알림 데이터 배열
const notifications = ref([
  {
    id: 1,
    title: "오늘은 다나아 동물병원 예약한 날 입니다!",
    content: "9시 까지 늦지 않게 방문 부탁 드립니다.",
    time: "1 시간 전"
  },
  {
    id: 2,
    title: "오늘은 댕댕미용실 예약한 날 입니다!",
    content: "2시 까지 늦지 않게 방문 부탁 드립니다.",
    time: "3 시간 전"
  },
  {
    id: 3,
    title: "오늘은 중앙 공원 산책 모임 날 입니다!",
    content: "모임 시간은 5시 장소는 중앙공원 벤치 앞입니다.",
    time: "하루 전"
  }
])

const removeNotification = (index) => {
  notifications.value.splice(index, 1)
}

const handleTitleClick = (notification) => {
  alert(`${notification.title}\n\n${notification.content}`)
}
</script>

<template>
  <div class="notification-container">
    <h1 class="notification-title">알림</h1>
    <div class="divider"></div>

    <div
      class="notification-item"
      v-for="(n, index) in notifications"
      :key="n.id"
    >
      <div class="notification-content">
        <img
          src="/src/assets/images/dog1.png"
          alt="프로필 이미지"
          class="profile-image"
        />
        <div class="notification-text">
          <p class="notification-message clickable" @click="handleTitleClick(n)">
            {{ n.title }}
          </p>
          <p class="notification-submessage">{{ n.content }}</p>
          <p class="notification-time">{{ n.time }}</p>
        </div>
      </div>
      <button class="delete-button" @click="removeNotification(index)">
        <svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
}

.notification-title {
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
  padding: 0 16px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 8px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f5f5f5;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.notification-text {
  flex: 1;
}

.notification-message {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.notification-submessage {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.notification-time {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #888;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trash-icon {
  width: 20px;
  height: 20px;
}

/* 클릭 가능한 제목 스타일 */
.clickable {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.clickable:hover {
  opacity: 0.7;
}
</style>
