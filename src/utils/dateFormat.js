import { format, isSameDay, parseISO } from "date-fns";

export function formatToKoreanDate(dateInput) {
  const date = new Date(dateInput);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

export function formatTimeRange(startAt, endAt) {
  const start = parseISO(startAt);
  const end = parseISO(endAt);
  const isSame = isSameDay(start, end);

  if (isSame) {
    return `${format(start, "HH:mm")} ~ ${format(end, "HH:mm")}`;
  } else {
    return `${format(start, "M월 d일 HH:mm")} ~ ${format(end, "M월 d일 HH:mm")}`;
  }
}
