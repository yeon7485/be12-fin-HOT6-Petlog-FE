<script setup>
import { ref, reactive } from "vue";
import { useScheduleStore } from "../../../stores/useScheduleStore";
const props = defineProps({
  onClose: Function,
  item: Object,
});

const scheduleStore = useScheduleStore();
const deleteSuccess = ref(false);

const delteItem = reactive({});
Object.assign(delteItem, props.item);

const handleDeleteClick = async () => {
  await scheduleStore.deleteSchedule(delteItem.idx, delteItem.petIdx);
  // item 삭제
  deleteSuccess.value = true;
};
</script>

<template>
  <div class="modal_overlay">
    <div class="modal_content">
      <div class="modal_header">
        <img
          class="close_btn"
          src="/src/assets/icons/cancel.png"
          alt="close"
          @click="props.onClose()"
        />
      </div>
      <div class="modal_body">
        <div v-if="!deleteSuccess">
          <p class="text">삭제하시겠습니까?</p>
          <div class="btn_box">
            <button class="btn cancel" @click="props.onClose()">취소</button>
            <button class="btn delete" @click="handleDeleteClick">확인</button>
          </div>
        </div>
        <div v-else>
          <p class="text">삭제되었습니다.</p>
          <div class="btn_box">
            <button class="btn delete" @click="props.onClose()">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal_content {
  background-color: var(--background-color);
  padding: 25px;
  width: 350px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.modal_header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5px;
}

.close_btn {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.modal_body {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.text {
  font-size: 18px;
  margin-bottom: 40px;
  text-align: center;
}

.btn_box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  padding: 12px 18px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s;
}

.cancel {
  border-color: var(--gray600);
  color: var(--gray600);
}

.cancel:hover {
  background-color: var(--gray300);
}

.delete {
  background-color: var(--main-color-brown);
  border-color: var(--main-color-brown);
  color: #fff;
}

.delete:hover {
  background-color: var(--main-color-hover);
  border-color: var(--main-color-hover);
}
</style>
