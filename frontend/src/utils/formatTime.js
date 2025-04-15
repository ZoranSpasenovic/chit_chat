const formatTime = (createdAt) => {
  const msgTime = new Date(createdAt);
  const currentTime = new Date();

  const isToday =
    msgTime.getFullYear() === currentTime.getFullYear() &&
    msgTime.getMonth() === currentTime.getMonth() &&
    msgTime.getDate() === currentTime.getDate();
  return isToday
    ? msgTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : msgTime.toLocaleDateString("sr-RS", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
};

export default formatTime;
