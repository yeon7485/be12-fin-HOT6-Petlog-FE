<template>
  <div>
    <!-- 모달 트리거 버튼 -->
    <button @click="openModal" class="notification-button">
      <span class="notification-icon">🔔</span>
      <span v-if="notifications.length > 0" class="notification-badge">{{ notifications.length }}</span>
    </button>

    <!-- 모달 오버레이 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal"></div>

    <!-- 알림 모달 -->
    <div v-if="isModalOpen" class="notification-modal">
      <div class="modal-header">
        <h2>알림</h2>
        <button @click="closeModal" class="close-button">&times;</button>
      </div>
      
      <div class="modal-content">
        <div v-if="notifications.length === 0" class="no-notifications">
          알림이 없습니다.
        </div>
        
        <ul v-else class="notification-list">
          <li v-for="(notification, index) in notifications" :key="index" class="notification-item">
            <div class="notification-avatar">
              <img :src="notification.avatar" :alt="notification.sender" />
            </div>
            <div class="notification-content">
              <p class="notification-text">{{ notification.message }}</p>
              <span class="notification-time">{{ notification.time }}</span>
            </div>
            <button @click="deleteNotification(index)" class="delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationModal',
  data() {
    return {
      isModalOpen: false,
      notifications: [
        {
          id: 1,
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TFDjtO43WpfRRYrW6St5ljQBzm9qPq.png', // 실제 구현 시 프로필 이미지 URL로 변경
          sender: '사용자1',
          message: '오늘은 다니어 동물병원 예약일 날 입니다! 9시까지 늦지 않게 방문 부탁 드립니다.',
          time: '1 시간 전'
        },
        {
          id: 2,
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TFDjtO43WpfRRYrW6St5ljQBzm9qPq.png', // 실제 구현 시 프로필 이미지 URL로 변경
          sender: '사용자2',
          message: '오늘은 예약하신날 예약일 날 입니다! 2시까지 늦지 않게 방문 부탁 드립니다.',
          time: '3 시간 전'
        },
        {
          id: 3,
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TFDjtO43WpfRRYrW6St5ljQBzm9qPq.png', // 실제 구현 시 프로필 이미지 URL로 변경
          sender: '사용자3',
          message: '오늘은 중간 검진 산책 문의 날 입니다! 모임 시간은 5시 참조는 중요공지 확인 입니다.',
          time: '어제'
        },
        {
          id: 4,
          avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TFDjtO43WpfRRYrW6St5ljQBzm9qPq.png', // 실제 구현 시 프로필 이미지 URL로 변경
          sender: '사용자4',
          message: '오늘은 중간 검진 산책 문의 날 입니다! 모임 시간은 5시 참조는 중요공지 확인 입니다.',
          time: '어제'
        }
      ]
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // 모달 열릴 때 배경 스크롤 방지
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = ''; // 모달 닫힐 때 배경 스크롤 복원
    },
    deleteNotification(index) {
      // 알림 삭제 확인 (선택 사항)
      if (confirm('이 알림을 삭제하시겠습니까?')) {
        this.notifications.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
/* 기본 스타일 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 알림 버튼 스타일 */
.notification-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 8px;
}

.notification-icon {
  font-size: 24px;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

/* 알림 모달 */
.notification-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  z-index: 101;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

/* 모달 콘텐츠 */
.modal-content {
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.no-notifications {
  padding: 24px;
  text-align: center;
  color: #666;
}

/* 알림 목록 */
.notification-list {
  list-style: none;
  padding: 0;
}

.notification-item {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.notification-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
  word-break: break-word;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.delete-button {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 8px;
  margin-left: 8px;
}

.delete-button:hover {
  color: #ff4757;
}

/* 반응형 스타일 */
@media (max-width: 480px) {
  .notification-modal {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
  }
}
</style>