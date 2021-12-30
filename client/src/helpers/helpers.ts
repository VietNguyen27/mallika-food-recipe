export const getTime = (hour: Number, minute: Number) => {
  const hourFormatted = hour >= 10 ? hour : '0' + hour;
  const minuteFormatted = minute >= 10 ? minute : '0' + minute;

  return `${hourFormatted}:${minuteFormatted}`;
};
