import {
  MINIMUM_LOADER_DELAY,
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
  SECONDS_PER_MONTH,
  SECONDS_PER_YEAR,
} from '@config/constants';
import { lazy } from 'react';
import { forwardRef } from 'react';

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

export const lazyImportWithDelay = (importPromise: any) => {
  return lazy(async () => {
    const [moduleExports] = await Promise.all([
      importPromise,
      new Promise((resolve) => setTimeout(resolve, MINIMUM_LOADER_DELAY)),
    ]);
    return moduleExports;
  });
};

export const generateBase64Image = (image: any): string => {
  const { imageFormat, base64 } = image;

  return `data:image/${imageFormat};base64, ${base64}`;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text[0].toUpperCase() + text.substring(1);
};

export const timeSince = (date: Date): string => {
  const seconds = Math.floor((+new Date() - +date) / 1000);
  let interval = seconds / SECONDS_PER_YEAR;

  if (interval > 1) {
    return Math.floor(interval) + ' year ago';
  }

  interval = seconds / SECONDS_PER_MONTH;
  if (interval > 1) {
    return Math.floor(interval) + ' month ago';
  }

  interval = seconds / SECONDS_PER_DAY;
  if (interval > 1) {
    return Math.floor(interval) + ' day ago';
  }

  interval = seconds / SECONDS_PER_HOUR;
  if (interval > 1) {
    return Math.floor(interval) + ' hour ago';
  }

  interval = seconds / SECONDS_PER_MINUTE;
  if (interval > 1) {
    return Math.floor(interval) + ' minute ago';
  }

  return Math.floor(seconds) + ' second ago';
};
