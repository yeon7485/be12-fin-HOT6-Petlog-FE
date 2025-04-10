<script setup>
defineProps({ answer: Object })
defineEmits(['select', 'modify', 'delete'])
</script>

<template>
  <div class="answer_card" :class="{ selected: answer.selected }">
    <div class="user_header">
      <div class="left_info">
        <img class="profile_img" :src="answer.profileImage" alt="유저 이미지" />
        <span class="nickname">{{ answer.writer }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ answer.date }}</span>
      </div>
      <div v-if="answer.selected" class="selected_badge">
        <img src="/src/assets/icons/select.png" class="badge_icon" alt="채택 아이콘" />
        <span class="selected_text">질문자가 채택한 답변</span>
      </div>
      <div v-else class="icons">
        <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정 아이콘" @click="$emit('modify', answer.id)" />
        <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제 아이콘" @click="$emit('delete', answer.id)" />
      </div>
    </div>  

    <div class="comment_body">
      <img v-if="answer.image" class="answer_img" :src="answer.image" alt="답변 이미지" />
      {{ answer.contents }}
    </div>

    <div v-if="!answer.selected" class="select_btn_area">
      <button class="select_btn" @click="$emit('select', answer.id)">채택하기</button>
    </div>
  </div>
</template>

<style scoped>
.answer_card {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
}
.answer_card.selected {
  border-left: 5px solid #4caf50;
}
.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.left_info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile_img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.selected_badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4caf50;
  font-weight: 500;
}
.badge_icon {
  width: 25px;
  height: 25px;
}
.comment_body {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}
.answer_img {
  width: 100%;
  max-width: 120px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: block;
}
.icons {
  display: flex;
  gap: 15px;
}
.icon_btn {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.select_btn_area {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
.select_btn {
  background: #6a0104;
  border: 2px solid #6a0104;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.select_btn:hover {
  background-color: #800000;
}
</style>
