<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  post: Object,
  boardType: String,
  index: Number
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/board/${props.boardType}/post/${props.post.idx}`)
}
</script>

<template>
  <tr class="post_row" @click="goToDetail">
    <td>{{ index }}</td>
    <td>{{ post.category }}</td>
    <td>
      <span class="post_title">
        {{ post.title }}
        <img
          v-if="post.imageUrl"
          src="/src/assets/icons/image.png"
          alt="image"
          class="image_icon"
        />
      </span>
    </td>
    <td>{{ post.writer }}</td>
    <td>{{ post.created_at }}</td>
  </tr>
</template>

<style scoped>
.post_row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.post_row:hover {
  background-color: #f5f5f5;
}
.post_title {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
}
.image_icon {
  width: 10px;
  height: 10px;
  margin-left: 4px;
}
td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}
</style>
