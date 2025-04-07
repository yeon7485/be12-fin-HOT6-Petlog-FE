<script>
export default {
  name: "QuestionRegister",
  data() {
    return {
      form: {
        title: "",
        content: "",
        tags: "",
        file: null,
      },
    };
  },
  methods: {
    handle_file_change(event) {
      this.form.file = event.target.files[0];
    },
    handle_cancel() {
      const confirmed = window.confirm('작성 중인 내용을 취소하시겠습니까?');
      if (confirmed) {
        this.$router.go(-1);
      }
    },
    handle_submit() {
      const confirmed = window.confirm('질문을 등록하시겠습니까?');
      if (confirmed) {
        alert('질문이 등록되었습니다.');
        console.log("등록된 데이터:", this.form);
      }
    },
  },
};
</script>


<template>
  <div class="qna_container">
    <h1 class="title">Q&A</h1>

    <form @submit.prevent="handle_submit" class="form">
      <div class="form_group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>

      <div class="form_group">
        <label for="content">내용</label>
        <textarea id="content" v-model="form.content" rows="10" required></textarea>
      </div>

      <div class="form_group">
        <label for="tags">태그 (1개 이상)</label>
        <input type="text" id="tags" v-model="form.tags" />
      </div>

      <div class="form_group">
        <label for="file">사진 등록</label>
        <input type="file" id="file" @change="handle_file_change" />
      </div>

      <div class="form_actions">
        <button type="button" class="cancel_button" @click="handle_cancel">취소</button>
        <button type="submit" class="submit_button">등록</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.qna_container {
  max-width: 1200px;
  margin: 0 auto 40px auto; 
  padding: 40px; 
  font-family: 'Arial', sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.title {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
}

.form_group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  width: 100%;
  padding: 6px 0;
  border: none;
  background-color: transparent;
}

textarea {
  resize: vertical;
}

.form_actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

.cancel_button,
.submit_button {
  padding: 10px 24px;
  border: 1px solid #a14f4f;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.cancel_button {
  background-color: #fff;
  color: #a14f4f;
}

.submit_button {
  background-color: #6A0104;
  color: #fff;
}
.submit_button:hover {
  background: #8b0000;
}

</style>
