export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours} : ${minutes}`; // bisa juga `${hours}:${minutes}:${seconds}` kalau mau detik
};
