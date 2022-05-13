export function displayAt(value: Date) {
  const today = new Date();
  const timeValue = new Date(value);
  const minutes = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (minutes < 1) return `방금 전`;
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  else return `${timeValue.getFullYear()}. ${timeValue.getMonth() + 1}. ${timeValue.getDate()}`;
  // const weeks = Math.floor(days / 7);
  // if (weeks < 5) return `${weeks}주 전`;
  // const months = Math.floor(days / 30);
  // if (months < 12) return `${months}개월 전`;
  // const years = Math.floor(days / 365);
  // return `${years}년 전`;
}

export function renameDate(value: Date) {
  const timeValue = new Date(value);
  return `${timeValue.getFullYear()}. ${timeValue.getMonth() + 1}. ${timeValue.getDate()}`;
}
