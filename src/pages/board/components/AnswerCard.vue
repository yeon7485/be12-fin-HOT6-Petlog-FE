<script setup>
import { useRouter } from "vue-router";
import { useAnswerStore } from "/src/stores/useAnswerStore";
import { useQuestionStore } from "/src/stores/useQuestionStore";
import { useUserStore } from "/src/stores/useUserStore";

const emit = defineEmits(["modify", "delete", "select", "selected"]);

const props = defineProps({
  answer: Object,
  questionIdx: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();
const userStore = useUserStore();

const confirmAndSelect = async () => {
  const confirmed = window.confirm("이 답변을 채택하시겠습니까?");
  if (!confirmed) return;

  try {
    await answerStore.selectAnswer(props.answer.idx);
    await questionStore.refreshQuestionStatus(props.questionIdx);

    alert("채택이 완료되었습니다.");
    emit("selected");
    router.push("/board/qna");
  } catch (e) {
    alert("채택 실패");
    console.error(e);
  }
};

const goToQuestionDetail = () => {
  router.push(`/board/qna/${props.questionIdx}`);
};
</script>

<template>
  <div class="answer_card" :class="{ selected: answer.selected }" @click="goToQuestionDetail">
    <div class="user_header">
      <div class="left_info">
        <img
          class="profile_img"
          :src="
            answer.userType === 'AI'
              ? '/src/assets/icons/chatGPS.png'
              : answer.profileImageUrl || '/src/assets/images/default.png'
          "
          alt="유저 이미지"
        />
        <span class="nickname">{{ answer.userType === "AI" ? "ChatGPS" : answer.writer }}</span>
        <span class="divider">ㅣ</span>
        <span class="date">{{ answer.createdAt }}</span>
      </div>

      <div class="icons">
        <template v-if="answer.selected">
          <div class="selected_badge">
            <img src="/src/assets/icons/check_circle.svg" class="badge_icon" alt="채택 아이콘" />
            <span class="selected_text">질문자가 채택한 답변</span>
          </div>
        </template>

        <template
          v-if="
            answer.userType !== 'AI' &&
            answer.writer === userStore.nickname &&
            !answer.selected &&
            !answerStore.answers.some((a) => a.selected && a.writer !== userStore.nickname)
          "
        >
          <img
            src="/src/assets/icons/edit.svg"
            class="icon_btn"
            alt="수정 아이콘"
            @click.stop="emit('modify', answer.idx)"
          />
          <img
            src="/src/assets/icons/x_button.svg"
            class="icon_btn"
            alt="삭제 아이콘"
            @click.stop="emit('delete', answer.idx)"
          />
        </template>
      </div>
    </div>

    <div class="comment_body">
      <div v-if="answer.imageUrls && answer.imageUrls.length">
        <img
          v-for="(url, index) in answer.imageUrls"
          :key="index"
          class="answer_img"
          :src="url"
          alt="답변 이미지"
        />
      </div>
      {{ answer.content }}
    </div>

    <div
      v-if="
        userStore.isLogin &&
        answer.userType !== 'AI' &&
        !answer.selected &&
        !answerStore.answers.some((a) => a.selected) &&
        userStore.nickname !== answer.writer
      "
      class="select_btn_area"
    >
      <button class="select_btn" @click.stop="confirmAndSelect">채택하기</button>
    </div>
  </div>
</template>

<style scoped>
.answer_card {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 20px 24px;
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
.nickname {
  font-weight: bold;
}
.divider {
  color: #aaa;
}
.date {
  color: #888;
  font-size: 13px;
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
  width: 20px;
  height: 20px;
}
.comment_body {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}

.comment_body > div {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.answer_img {
  width: 100%;
  max-width: 120px;
  border-radius: 8px;
  margin-top: 10px;
  display: block;
}

.icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon_btn {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.icon_btn:nth-child(2) {
  width: 14px;
  height: 14px;
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
