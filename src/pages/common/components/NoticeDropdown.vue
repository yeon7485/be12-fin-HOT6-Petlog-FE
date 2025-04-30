<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../../../stores/useNoticeStore'
import axios from 'axios'

const store = useNotificationStore()
const router = useRouter()

onMounted(() => {
  store.connectWebSocket()
  store.fetchNotificationsFromServer()
})

const deleteNotification = async (idx, index) => {
  try {
    await axios.delete(`/api/notification/${idx}`)
    store.removeNotification(index)
  } catch (err) {
    console.error('❌ 알림 삭제 실패:', err)
  }
}

const handleClick = (n) => {

  if (n.scheduleId) {
    console.log(`📌 이동할 스케줄 ID: ${n.scheduleId}`)
    router.push({ path: `/schedule/detail/${n.scheduleId}` })
  } else {
    console.warn("⚠️ scheduleId가 없습니다.")
  }
}
</script>

<template>
  <div class="notification-dropdown">
    <h2>🔔 알림</h2>
    <div v-if="store.notifications.length === 0">알림이 없습니다.</div>
    <ul>
      <li v-for="(n, index) in store.notifications" :key="n.idx">
        <div @click="handleClick(n)">
          <strong>{{ n.title }}</strong>
          <p>{{ n.content }}</p>
          <small>{{ n.time }}</small>
        </div>
        <button @click="deleteNotification(n.idx, index)">❌</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notification-dropdown {
  font-family: 'Segoe UI', Roboto, sans-serif;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  padding: 16px;
  transition: all 0.3s ease;
}

.notification-dropdown h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.notification-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-dropdown li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
}

.notification-dropdown li:hover {
  background-color: #f0f0f0;
}

.notification-dropdown li div {
  flex: 1;
  cursor: pointer;
}

.notification-dropdown strong {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #222;
}

.notification-dropdown p {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

.notification-dropdown small {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.notification-dropdown button {
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  padding: 4px;
  cursor: pointer;
  align-self: flex-start;
}

.notification-dropdown button:hover {
  color: red;
}
</style>
