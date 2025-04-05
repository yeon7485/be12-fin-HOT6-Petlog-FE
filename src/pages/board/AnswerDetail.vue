<script setup>
import { ref } from 'vue';
</script>

<template>
  <div class="wrapper">
    <div class="post_box">
      <!-- ✅ 목록으로 버튼 추가 -->
      <router-link to="/board/qna" class="list_button">목록으로</router-link>

      <!-- 질문 제목 -->
      <div class="post_title">
        <img class="icon_img" src="/src/assets/icons/question.png" alt="질문 아이콘" />
        <span class="text">강아지 중성화 수술 고민입니다.</span>
      </div>

      <!-- 사용자 정보 -->
      <div class="user_info_line">
        <div class="user_info">
          <img class="profile_img" src="/src/assets/images/dog1.png" alt="프로필 이미지" />
          <span class="nickname">닉네임</span>
          <span class="divider">ㅣ</span>
          <span class="date">24.8.10</span>
        </div>
        <div class="icons">
          <img src="/src/assets/icons/write.png" class="icon_btn" alt="수정 아이콘" />
          <img src="/src/assets/icons/x-button.png" class="icon_btn" alt="삭제 아이콘" />
        </div>
      </div>

      <hr class="divider_line" />

      <!-- 질문 본문 -->
      <div class="content_area">
        <img class="dog_img" src="/src/assets/images/dog1.png" alt="강아지 이미지" />
        <p class="description">
          저희 강아지가 말티즈(여아) 이제 1살이 되었고 주변에서 중성화 수술을 시켜야한다고 하는데 꼭 시켜야하는 건가요?
          찾아보니 가격도 만만치 않고 엄청 아파한다고 하더라구요 ㅠㅠㅠ
        </p>
        <div class="hashtags">
          <span># 강아지</span>
          <span># 강아지 중성화</span>
        </div>
      </div>

      <div class="action_area">
       <router-link to="/board/qna/answer/register" class="reply_btn">
          답변하기
        </router-link>
      </div>

      <!-- AI 답변 -->
      <div class="ai_answer_v2">
        <div class="ai_header_v2">
          <img class="ai_icon_img" src="/src/assets/icons/Ai.png" alt="전구 아이콘" />
          <div class="ai_title_v2">AI 우선 답변 - 제가 먼저 도와드릴게요!</div>
        </div>

        <div class="ai_card">
          <div class="ai_card_header">
            <div class="ai_card_left">
              <img class="ai_profile_img" src="/src/assets/icons/chatGPS.png" alt="ChatGPS 프로필" />
              <span class="ai_card_name">ChatGPS</span>
            </div>
            <div class="ai_card_date">24.8.10</div>
          </div>

          <div class="ai_card_body">
            <div class="ai_section_v2">
              <p class="emoji_title">📌 <strong>중성화 수술, 왜 필요할까?</strong></p>
              <p>첫째로, 유기동물 문제 해결을 들 수 있다. 해마다 수만 마리의 유기동물이 거리로 내몰리고 있고, 그중 상당수는 계획되지 않은 번식에서 기인한다. 중성화 수술은 이 같은 악순환을 막는 가장 직접적인 방법이다.  둘째로, 건강상의 이점도 무시할 수 없다. 암컷의 경우 자궁축농증이나 유선종양, 수컷의 경우 전립선 질환 예방에 도움이 된다는 연구들이 다수 존재한다.</p>
            </div>

            <div class="ai_section_v2">
              <p class="emoji_title">📌 <strong>그러나 윤리적 딜레마도 존재한다</strong></p>
              <p>생명체에게 인위적으로 생식 능력을 박탈한다는 점에서 동물의 자기결정권을 침해하는 행위로 보는 시각도 있다. 동물이 고통을 느끼는 존재라는 점에서, 단순히 인간의 편의를 위해 수술을 강제하는 건 동물권을 침해하는 행위일 수 있다는 것이다.
또한 수술 이후의 행동 변화나 호르몬 불균형으로 인한 부작용도 간과해선 안 된다. 특히 어릴 때 수술할 경우 성장판 폐쇄 지연 등의 문제가 보인다. 중성화 수술은 단순히 '우리 집 반려동물을 위한 선택'을 넘어서, 전체 반려동물 생태계를 위한 책임 있는 결정이기도 하다. 불필요한 번식을 줄이고, 유기와 안락사로 이어지는 고리를 끊는 것은 단순 한 동정심이 아니라 시민으로서의 의무일 수 있다. 하지만 이 결정은 강요되어서는 안 된다. 국가와 지자체의 지원 정책, 수의학적 정보 제공, 그리고 시민들의 인식 개선이 균형 있게 이루어질 때, 중성화 수술은 보다 건강한 사회적 합의를 통해 자리 잡을 수 있다.</p>
            </div>

            <div class="ai_section_v2">
              <p class="emoji_title">✅ <strong>결론</strong></p>
              <p>중성화 수술은 선택이자 책임이다. 우리는 반려동물을 사랑한다면, 그들의 삶의 질과 사회 전체 동물 복지의 관점에서 신중히 판단하고 행동해야 한다. 개인의 감정에만 치우치기보다는, 생명에 대한 책임 있는 자세가 필요한 시점이다.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 사용자 답변 -->
      <div class="answer_wrapper">
        <div class="answer_count">
          <img src="/src/assets/icons/answer.png" class="answer_icon" alt="답변 아이콘" />
          2개 답변
        </div>

        <div class="answer_card selected">
          <div class="user_header">
            <div class="left_info">
              <img class="profile_img" src="/src/assets/images/dog2.jpeg" alt="유저 이미지" />
              <span class="nickname">구름봄맘</span>
              <span class="date">24.8.10</span>
            </div>
            <div class="selected_badge">
              <img src="/src/assets/icons/select.png" class="badge_icon" alt="채택 아이콘" />
              <span class="selected_text">질문자가 채택한 답변</span>
            </div>
          </div>
          <div class="comment_body">
            중성화 안 하면 자궁축농증이나 유선종양 등 질병에 걸릴 가능성이 아주 큽니다...
          </div>
        </div>

        <div class="answer_card">
          <div class="user_header">
            <div class="left_info">
              <img class="profile_img" src="/src/assets/images/dog2.jpeg" alt="유저 이미지" />
              <span class="nickname">눈가을맘</span>
              <span class="date">24.8.10</span>
            </div>
          </div>
            <div class="comment_body">
            <!-- ✅ 여기에 이미지 삽입 -->
            <img class="answer_img" src="/src/assets/images/dog1.png" alt="답변 이미지" />
            중성화는 명백한 동물학대입니다!!!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
}
.post_box {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* ✅ 목록 버튼 스타일 */
.list_button {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.list_button:hover {
  background: #e0e0e0;
}

.post_title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
}
.icon_img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}
.nickname {
  font-weight: 600;
  color: #333;
}
.divider {
  margin: 0 6px;
  color: #999;
}
.date,
.ai_card_date {
  color: #888;
  font-size: 13px;
}
.icons {
  display: flex;
  gap: 15px;
}
.icon_btn {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.divider_line {
  border-top: 1px solid #e0e0e0;
  margin: 10px 0 20px;
}
.content_area {
  margin-bottom: 20px;
}
.dog_img {
  width: 260px;
  border-radius: 6px;
  margin-bottom: 12px;
}
.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}
.hashtags span {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}
.action_area {
  display: flex;
  justify-content: flex-end;
}
.reply_btn {
  background: white;
  color: #800000;
  border: 1px solid #800000;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.ai_answer_v2 {
  margin-top: 30px;
  border-top: 2px dashed #ccc;
  padding-top: 24px;
}
.ai_header_v2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
}
.ai_icon_img {
  width: 50px;
  height: 50px;
}
.ai_title_v2 {
  font-size: 20px;
}
.ai_card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.ai_card_header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-bottom: 14px;
  align-items: center;
}
.ai_card_left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ai_profile_img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.ai_card_name {
  font-weight: 600;
  color: #333;
}
.ai_card_body {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}
.ai_section_v2 {
  margin-bottom: 20px;
}
.emoji_title {
  font-weight: bold;
  margin-bottom: 6px;
  color: #d00;
}

.answer_wrapper {
  margin-top: 40px;
}
.answer_count {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}
.answer_icon {
  width: 50px;
  height: 50px;
  margin-right: 18px;
}
.answer_card {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
}
.answer_card.selected {
  border-left: 5px solid #4caf50;
}
.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.left_info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.selected_badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4caf50;
  font-weight: 500;
}
.badge_icon {
  width: 25px;
  height: 25px;
}
.comment_body {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}

.answer_img {
  width: 100%;
  max-width: 120px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: block;
}
</style>
