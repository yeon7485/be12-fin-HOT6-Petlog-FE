<template>
  <div class="member">
    <img :src="imageUrl" class="profile-img" />
    <span>{{ userName }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  imageUrl: String,
  userName: String,
});
</script>
<style scoped>
.member {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.profile-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
</style>
