export function formatToKoreanDate(dateInput) {
  const date = new Date(dateInput);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
}
