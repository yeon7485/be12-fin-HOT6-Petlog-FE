<script setup>
import { ref } from "vue";
import { useMypageCard } from "../../stores/useMypageCard.js";
const emit = defineEmits(["close"]);

const petStore = useMypageCard(); 

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");


const changePassword = async () => {

  if (newPassword.value !== confirmNewPassword.value) {
    alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  try {
    await petStore.changePassword(currentPassword.value, newPassword.value);
    
    alert("비밀번호가 성공적으로 변경되었습니다.");
    emit("close"); 
  } catch (error) {
    console.error("Error:", error); 
    alert(error.response?.data || "비밀번호 변경 실패");
  }
};
</script>


<template>
  <div class="password-overlay">
    <div class="password">
      <div class="password-header">
        <h2>비밀번호 변경</h2>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </div>

      <div class="password-body">
        <div class="input-group">
          <label>현재 비밀번호</label>
          <input type="password" v-model="currentPassword" placeholder="현재 비밀번호를 입력해주세요." />
        </div>

        <div class="input-group">
          <label>새 비밀번호</label>
          <input type="password" v-model="newPassword" placeholder="새 비밀번호를 입력해주세요." />
        </div>

        <div class="input-group">
          <label>새 비밀번호 확인</label>
          <input type="password" v-model="confirmNewPassword" placeholder="새 비밀번호를 입력해주세요." />
        </div>
      </div>

      <div class="password-footer">
        <button class="cancel-btn" @click="$emit('close')">취소</button>
        <button class="save-btn" @click="changePassword">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.password {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.password-header h2 {
  font-size: 18px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  /* ✅ 추가 */
  box-sizing: border-box;
}

.password-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.cancel-btn {
  background: #eee;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.save-btn {
  background: #6A0104;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.save-btn:hover {
  background: #8a0206;
}
</style>
