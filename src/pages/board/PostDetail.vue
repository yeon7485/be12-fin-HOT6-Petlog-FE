<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "/src/stores/useBoardStore";
import { useCommentStore } from "/src/stores/useCommentStore";
import { useUserStore } from "/src/stores/useUserStore";
import CommentCard from "/src/pages/board/components/CommentCard.vue";
import PetCard from "/src/pages/board/components/PetCard.vue";
import PetCardDetail from "/src/pages/board/components/PetCardDetailModal.vue";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();
const commentStore = useCommentStore();
const userStore = useUserStore();

const postIdx = Number(route.params.idx);
const boardType = route.params.boardType;
const post = ref(null);

const selectedPetId = ref(null);
const isPetModalOpen = ref(false);

const isOwner = computed(
  () => userStore.nickname && post.value?.writer && userStore.nickname === post.value.writer
);

const openPetModal = (id) => {
  selectedPetId.value = id;
  isPetModalOpen.value = true;
};

onMounted(async () => {
  post.value = await boardStore.getPostDetail(postIdx);
  await commentStore.fetchComments(postIdx);
});

const goToModify = () => {
  router.push(`/board/${boardType}/post/${postIdx}/modify`);
};

const handleDelete = async () => {
  if (!confirm("현재 게시글을 삭제하시겠습니까?")) return;
  await boardStore.deletePost(postIdx);
  alert("게시글이 삭제되었습니다");
  router.push(`/board/${boardType}`);
};

const newComment = ref("");
const addComment = async () => {
  if (!newComment.value.trim()) return;
  await commentStore.addComment({
    postIdx,
    userIdx: userStore.userIdx,
    writer: userStore.nickname,
    text: newComment.value,
  });
  newComment.value = "";
};
</script>

<template>
  <div v-if="post" class="wrapper">
    <div class="post_box">
      <div class="post_title">
        <span class="text">{{ post.title }}</span>
      </div>

      <div class="user_info_line">
        <div class="user_info">
          <img
            class="profile_img"
            :src="post.profileImageUrl || '/src/assets/images/default.png'"
            alt="프로필 이미지"
          />
          <span class="nickname">{{ post.writer }}</span>
          <span class="divider">ㅣ</span>
          <span class="date">{{ post.createdAt }}</span>
        </div>
        <div class="icons" v-if="isOwner">
          <img src="/src/assets/icons/edit.svg" class="icon_btn" @click="goToModify" />
          <img src="/src/assets/icons/x_button.svg" class="icon_btn delete" @click="handleDelete" />
        </div>
      </div>

      <hr class="divider_line" />

      <div class="content_area">
        <div v-if="post.imageUrls?.length" class="image_gallery">
          <img v-for="(img, i) in post.imageUrls" :key="i" :src="img" class="content_image" />
        </div>

        <p class="description">
          {{ post.content || "게시글 내용이 없습니다." }}
        </p>

        <hr class="pet_section_divider" />

        <div v-if="post.petList?.length">
          <div class="pet_card_section">
            <h3 class="pet_card_title"></h3>
            <div class="pet_card_list">
              <PetCard
                v-for="pet in post.petList"
                :key="pet.idx"
                :pet="{
                  ...pet,
                  image: pet.profileImageUrl || '/default-profile.png',
                }"
                @click="() => openPetModal(pet.idx)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="comment_section">
    <label class="comment_label">
      <img class="label_icon" src="/src/assets/icons/comment.png" />
      댓글
    </label>

    <div class="input_area">
      <input
        type="text"
        class="comment_input"
        placeholder="댓글을 작성해주세요."
        v-model="newComment"
        :disabled="!userStore.isLogin"
      />
      <button class="submit_btn" @click="addComment" :disabled="!userStore.isLogin">등록</button>
    </div>

    <CommentCard
      v-for="comment in commentStore.comments"
      :key="comment.idx"
      :comment="comment"
      :post-idx="postIdx"
      :current-user-idx="userStore.idx"
    />
  </div>

  <PetCardDetail v-if="isPetModalOpen" :pet-id="selectedPetId" @close="isPetModalOpen = false" />
</template>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
}
.post_box {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.post_title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
}
.user_info_line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.user_info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
}
.profile_img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.date {
  color: #888;
  font-size: 13px;
}
.divider {
  margin: 0 6px;
  color: #999;
}
.icons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon_btn {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.icon_btn.delete {
  width: 14px;
  height: 14px;
}

.divider_line {
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 20px;
}
.content_area {
  margin-bottom: 20px;
}
.content_image {
  max-width: 100%;
  max-height: 260px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
  display: block;
}
.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.pet_card_section {
  margin-top: 40px;
}
.pet_card_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
.comment_section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
.comment_label {
  font-weight: bold;
  margin-bottom: 30px;
  display: block;
}
.input_area {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.comment_input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 14px;
}
.submit_btn {
  margin-left: 10px;
  background: var(--main-color-brown);
  color: white;
  border: none;
  padding: 10px 13px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}
.submit_btn:hover {
  background: #800000;
}
.label_icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
.pet_section_divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 30px 0 20px;
  opacity: 0.6;
}

.card {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  margin-top: 40px;
}

.image_gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.content_image {
  width: 200px;
  height: auto;
  object-fit: contain;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}
</style>
