<script setup>
const props = defineProps({
  isLoading: Boolean,
});
console.log("loadingSpinner", props.isLoading);
</script>

<template>
  <v-overlay :model-value="props.isLoading" class="overlay" persistent>
    <v-progress-circular indeterminate size="64" color="#6A0104" />
  </v-overlay>
</template>

<style scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(0.5px);
}
</style>
