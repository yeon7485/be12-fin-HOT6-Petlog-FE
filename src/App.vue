<script setup>
import { RouterView, useRoute } from "vue-router";
import Header from "./components/common/Header.vue";
import admin from "./pages/admin/Admin.vue";

const route = useRoute();
</script>

<template>
  <Header v-if="!route.path.startsWith('/user')" />
  <RouterView></RouterView>
</template>

<style scoped></style>
