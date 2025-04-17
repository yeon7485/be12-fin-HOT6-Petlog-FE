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

.post_title {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: #5D4037;
}

td:nth-child(3) {
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(1) { width: 10%; }       
td:nth-child(2) { width: 20%; }       
td:nth-child(3) { width: 35%; }       
td:nth-child(4) { width: 20%; }      
td:nth-child(5) { width: 20%; }   

.image_icon {
  width: 10px;
  height: 10px;
  margin-left: 4px;
}

td {
  padding: 10px 6px;
  text-align: left;
  border-bottom: 1px solid #d7ccc8;
  font-size: 14px;
  color: #4E342E;
}
</style>




