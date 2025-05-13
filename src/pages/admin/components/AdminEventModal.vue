<script setup>
import { defineEmits, reactive } from 'vue'

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  dateTime: '',
  maxParticipants: '',
})

const close = () => emit('close')
const submit = () => emit('submit', { ...form })
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h3>새 이벤트 채팅방 만들기</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>

      <div class="modal-body">
        <label>채팅방 이름</label>
        <input v-model="form.title" type="text" placeholder="채팅방 이름을 입력해주세요." />

        <div class="form-group">
          <div>
            <label>시간 설정</label>
            <input v-model="form.dateTime" type="datetime-local" />
          </div>
          <div>
            <label>인원 설정</label>
            <div class="people-input">
              <input v-model.number="form.maxParticipants" type="number" min="1" />
              <span class="unit">명</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel" @click="close">취소</button>
        <button class="confirm" @click="submit">완료</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body label {
  display: block;
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 4px;
  color: #333;
}

.modal-body input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.people-input {
  display: flex;
  align-items: center;
}

.people-input input {
  flex: 1;
}

.unit {
  margin-left: 4px;
  font-size: 14px;
  color: #333;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.cancel {
  background: white;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.confirm {
  background: #6d0d0d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>