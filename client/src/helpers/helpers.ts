export const getTime = (hour: Number, minute: Number) => {
  const hourFormatted = hour >= 10 ? hour : '0' + hour;
  const minuteFormatted = minute >= 10 ? minute : '0' + minute;

  return `${hourFormatted}:${minuteFormatted}`;
};

export const getErrorFromJoiMessage = (error: object[]): object => {
  interface Error {
    context?: object | any;
    message?: string;
  }

  return error.reduce((acc, curr) => {
    const { context, message }: Error = curr;

    return {
      ...acc,
      [context.label]: message,
    };
  }, {});
};
