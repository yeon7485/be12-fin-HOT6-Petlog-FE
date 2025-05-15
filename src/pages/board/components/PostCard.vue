<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  post: Object,
  boardType: String,
  index: Number,
});

const router = useRouter();

const goToDetail = () => {
  router.push(`/board/${props.boardType}/post/${props.post.idx}`);
};
</script>

<template>
  <tr class="post_row" @click="goToDetail">
    <td>{{ index }}</td>
    <td>{{ post.category }}</td>
    <td>
      <span class="post_title_wrap">
        <span class="post_title">{{ post.title }}</span>
        <img
          v-if="post.imageUrls && post.imageUrls.length > 0"
          src="/src/assets/icons/image.png"
          alt="image"
          class="image_icon"
        />
      </span>
    </td>
    <td>{{ post.writer }}</td>
    <td>{{ post.createdAt }}</td>
  </tr>
</template>

<style scoped>
.post_row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.post_row:hover {
  background-color: #efebe9;
}

.post_title_wrap {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.post_title {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 20px);
  color: #5d4037;
}

.image_icon {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  flex-shrink: 0;
}

td:nth-child(1) { width: 8%; }
td:nth-child(2) { width: 18%; }
td:nth-child(3) {
  width: 40%;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}
td:nth-child(4) { width: 17%; }
td:nth-child(5) { width: 17%; }

td {
  padding: 10px 6px;
  text-align: center;
  border-bottom: 1px solid #d7ccc8;
  font-size: 14px;
  color: #4e342e;
}

.board_table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-top: 20px;
  animation: fadeSlideUp 0.5s ease-out;
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
