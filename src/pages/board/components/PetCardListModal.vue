<script setup>
import { onMounted, ref } from "vue";
import { usePetStore } from "/src/stores/usePetStore";
import { useUserStore } from "/src/stores/useUserStore";

const petStore = usePetStore();
const userStore = useUserStore();
const pets = ref([]);
const selectedIdx = ref(null);

const emits = defineEmits(["close", "select"]);

onMounted(async () => {
  if (userStore.idx) {
    await petStore.fetchPetList(userStore.idx);
    pets.value = petStore.petList;
  }
});

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const selectPet = (pet) => {
  selectedIdx.value = pet.idx;
  emits("select", pet);
};

const closeModal = () => {
  emits("close");
};
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>반려동물 목록</h3>
        <img src="/src/assets/icons/cancel.png" alt="close" class="close_btn" @click="closeModal" />
      </div>

      <div class="scrollable pet-list-scroll">
        <div
          v-for="pet in pets"
          :key="pet.idx"
          class="pet-card"
          :class="{ selected: pet.idx === selectedIdx }"
          @click="selectPet(pet)"
        >
          <img :src="pet.profileImageUrl || '/default-profile.png'" class="pet-img" />
          <div class="pet-info">
            <div class="pet-name">{{ pet.name }}</div>
            <div class="pet-detail">{{ pet.breed }} / {{ calculateAge(pet.birthDate) }}살</div>
          </div>
        </div>
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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 500px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-content h3 {
  font-size: 18px;
  font-weight: bold;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.close_btn {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.scrollable.pet-list-scroll {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 2px solid transparent;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.pet-card:hover {
  background-color: #f9f5f0;
}

.pet-card.selected {
  border-color: #6a0104;
  background-color: #fbeee7;
  box-shadow: 0 0 0 2px #6a0104;
}

.pet-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.pet-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pet-name {
  font-weight: bold;
}

.pet-detail {
  font-size: 12px;
  color: #666;
}

.modal-close {
  align-self: flex-end;
  padding: 6px 12px;
  border: none;
  background-color: #6a0104;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
