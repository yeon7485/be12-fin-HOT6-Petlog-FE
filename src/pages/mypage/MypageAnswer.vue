<template>
  <div class="container">
    <h2 class="title">나의 답변</h2>
    <div class="answer-card">
      <div class="profile">
        <img src="/src/assets/images/dog1.png" alt="profile" class="profile-img" />
        <div class="user-info">
          <span class="username">구름님</span>
          <span class="date">24.8.10</span>
        </div>
      </div>
      <div class="answer-content">
        <p class="answer-text">
          중성화는 여러 가지 장점도 하나, 수명 연장을 직접적으로 보장 가능성이 매우 큽니다. 
          보고서에 따르면 중성화된 암컷 개는 자궁축농증 같은 심각한 감염을 예방할 수 있으며, 난소와 자궁 관련 질병의 위험이 줄어듭니다.
          또한, 중성화된 수컷 개는 전립선 비대와 일부 형태의 암 발생 위험을 낮출 수 있습니다. 
          물론, 중성화에 대한 반대 의견도 존재합니다. 일부 견주는 강아지가 자연스러운 생리 과정을 경험하는 것이 중요하다고 믿으며, 
          수술 자체가 스트레스를 유발할 수 있다는 점을 우려하기도 합니다. 
          하지만 전문가들은 강아지의 건강을 최우선으로 고려할 때, 중성화가 장기적으로 유익하다고 조언합니다.
          특히, 원치 않는 번식을 막고 보호소에 유기되는 강아지 수를 줄이는 데도 기여할 수 있습니다.
        </p>
      </div>
      <div class="footer">
        <a href="#" class="toggle-reply">← 강아지는 중성화를 꼭 해야 하나요? (자세히 보기)</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerCard",
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin: 20px;
  position: absolute;
  left: 500px; 
  margin-top: 0px;
}

.answer-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #f5f5f5;
  margin-top: 70px;
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
}

.date {
  font-size: 12px;
  color: #888;
}

.answer-content {
  margin-bottom: 12px;
}

.answer-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.footer {
  margin-top: 10px;
  text-align: right;
}

.toggle-reply {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-block;
}

</style>