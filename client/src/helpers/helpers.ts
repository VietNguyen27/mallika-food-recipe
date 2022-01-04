import { MINIMUM_LOADER_DELAY } from '@config/constants';
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
