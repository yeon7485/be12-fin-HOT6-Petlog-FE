<template>
  <div class="chatroom-info-container">
    <ChatHeader title="서울숲" />
    <div class="schedule-create-container">
      <div class="schedule-create-card">
        <div class="content_header">
          <!-- 카테고리 선택 드롭다운 -->
          <div class="category_box">
            <div class="cate_dropdown_btn" @click.stop="toggleCategory">
              <div class="selected_cate">
                <div v-if="selectedCate.name" class="cate_item">
                  <div
                    class="color_box"
                    :style="{ backgroundColor: selectedCate.color }"
                  ></div>
                  <span>{{ selectedCate.name }}</span>
                </div>
                <div v-else class="placeholder">카테고리 선택</div>
              </div>
              <img
                src="../../assets/icons/Ai.png"
                alt="down"
                class="dropdown_icon"
              />
            </div>

            <!-- 카테고리 드롭다운 메뉴 (옵션들) -->
            <div
              v-if="isCateDropdownOpen"
              class="cate_dropdown_menu"
              @click.stop
            >
              <ul>
                <li
                  v-for="option in planCategories"
                  :key="option.name"
                  @click="selectCate(option)"
                >
                  <div class="cate_item">
                    <div
                      class="color_box"
                      :style="{ backgroundColor: option.color }"
                    ></div>
                    <span>{{ option.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 입력 폼 -->
        <div class="form-section">
          <input
            type="text"
            class="input-title"
            placeholder="제목을 입력해주세요."
          />

          <label class="input-label">시작 시간</label>
          <input type="datetime-local" class="input-box" />

          <label class="input-label">종료 시간</label>
          <input type="datetime-local" class="input-box" />

          <label class="input-label">장소</label>
          <input type="text" class="input-box" />

          <label class="input-label">메모</label>
          <textarea class="memo-box" rows="5"></textarea>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="cancel-button" @click="goBack">취소</button>
      <button class="confirm-button" @click="goComplete">저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ChatHeader from "./ChatHeader.vue";

//url 에서 idx 값 가져오기
const route = useRoute();
const router = useRouter();

const chatroomIdx = route.params.chatroomIdx; // 👉 '1'이 들어옵니다

const goComplete = () => {
  router.push(`/chatroom/${chatroomIdx}/chatroom-schedule`); // 이동할 경로로 바꿔주세요
};

const isCateDropdownOpen = ref(false);
const selectedCate = ref({});
const planCategories = ref([
  { color: "#00C9CD", name: "병원" },
  { color: "#E6B0BD", name: "미용실" },
  { color: "#65924D", name: "산책" },
  { color: "#BDBDBD", name: "기타" },
]);

const toggleCategory = () => {
  isCateDropdownOpen.value = !isCateDropdownOpen.value;
};

const selectCate = (category) => {
  selectedCate.value = category;
  isCateDropdownOpen.value = false;
};

// 뒤로 가기
const goBack = () => {
  router.go(-1); // 또는 window.history.back()
};
</script>

<style scoped>
@import "./chat-base.css";

.room-title {
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.back-icon {
  cursor: pointer;
  width: 24px; /* 원하는 크기로 조절 */
  height: 24px;
}

.schedule-create-container {
  display: flex;
  justify-content: center; /* ✅ 자식들을 수평 가운데로 */
}

.schedule-create-card {
  width: 100%;
  max-width: 500px; /* ✅ 가운데 정렬되도록 제한 폭 추가 */
  background-color: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag-wrapper {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.tag-blue {
  background-color: #d1f2f9;
  color: #007b9e;
}

.tag-pink {
  background-color: #fce3e3;
  color: #c24c4c;
}
.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-title {
  font-size: 16px;
  padding: 10px 12px;
  border: none;
  border-bottom: 1px solid #ccc;
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.input-box {
  width: 200px; /* ✅ 이미지 기준 너비 */
  height: 44px; /* ✅ 높이 맞춤 */
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.memo-box {
  padding: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  resize: none;
}

/* 카테고리 선택 드롭다운 */
.category_box {
  width: 120px;
}

.cate_dropdown_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 13px;
  border: 1px solid var(--gray300);
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  height: 30px;
  box-sizing: border-box;
}

.cate_dropdown_btn > span {
  flex-shrink: 0;
}

.dropdown_icon {
  width: 12px;
  height: 12px;
}

.cate_item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
}

.color_box {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.placeholder {
  color: var(--gray500);
  font-size: 13px;
}

.cate_dropdown_menu {
  position: absolute;
  width: 120px;
  max-height: 280px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #fff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
}

.cate_dropdown_menu li {
  display: flex;
  align-items: center;
  padding: 7px;
  cursor: pointer;
  border-radius: 4px;
}
.cate_dropdown_menu li:hover {
  background-color: var(--gray200);
}
</style>
