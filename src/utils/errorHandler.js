// src/utils/errorHandler.js
export function handleChatRoomError(error, router) {
  const code = error.response?.data?.code;

  switch (code) {
    case 2001:
      alert("🚫 이 채팅방에 참여하고 있지 않습니다.");
      // 예: 참여 유도, 홈으로 이동, 모달 띄우기 등
      router.push("/chat");
      break;

    default:
      alert("⚠️ 알 수 없는 오류가 발생했습니다.");
  }
}
