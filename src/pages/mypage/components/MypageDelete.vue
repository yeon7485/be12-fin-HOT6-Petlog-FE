<script setup>
import { ref } from 'vue'

const emit = defineEmits(['confirm', 'cancel'])
const password = ref('')

const confirmDelete = () => {
  if (password.value.trim() === '') {
    alert('비밀번호를 입력해주세요.')
    return
  }
  emit('confirm', password.value)
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>회원탈퇴 확인</h3>
      <p>비밀번호를 입력하세요.</p>
      <input
        type="password"
        v-model="password"
        placeholder="비밀번호"
        class="password-input"
      />
      <div class="btns">
        <button @click="$emit('cancel')">취소</button>
        <button @click="confirmDelete">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal h3 {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.modal p {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.password-input {
  margin-bottom: 16px;
  padding: 10px 12px;
  width: 80%;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.password-input:focus {
  outline: none;
  border-color: #8a0206;
  box-shadow: 0 0 0 2px rgba(138, 2, 6, 0.2);
}

.btns {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: none;
}

/* 취소 버튼 (왼쪽) */
button:first-child {
  background-color: #e0e0e0;
  color: #333;
}

button:first-child:hover {
  background-color: #c6c6c6;
}

/* 확인 버튼 (오른쪽) */
button:last-child {
  background-color: #8a0206;
  color: white;
}

button:last-child:hover {
  background-color: #6e0105;
}

</style>

