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

  return `${format(start, "M월 d일 HH:mm")} ~ ${format(end, "M월 d일 HH:mm")}`;
}

export function formatToMonthDay(dateString) {
  if (!dateString) return "";
  const date = parseISO(dateString);
  return format(date, "M월 d일");
}

export function formatTimeFromDate(dateString) {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}월 ${day}일 ${hours}:${minutes}`;
}
