import { defineStore } from 'pinia'
import { ref } from 'vue'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const stompClient = ref(null)

  const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}')
  const currentUserId = ref(storedUser.idx || null)

  const connectWebSocket = () => {
    if (!currentUserId.value) {
      console.warn('⛔ 로그인 유저 ID 없음')
      return
    }

    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('✅ 알림 WebSocket 연결됨')

        client.subscribe(`/topic/alerts/${currentUserId.value}`, (msg) => {
          const data = JSON.parse(msg.body)
          console.log('📬 알림 수신:', data)

          notifications.value.unshift({
            id: Date.now(),
            title: '새 알림',
            content: data.message,
            time: '방금 전'
          })
        })
      },

      onStompError: (frame) => {
        console.error('❌ WebSocket 오류:', frame)
      }
    })

    client.activate()
    stompClient.value = client
  }

  const removeNotification = (index) => {
    notifications.value.splice(index, 1)
  }

  return {
    notifications,
    currentUserId,
    connectWebSocket,
    removeNotification
  }
})