import {
  MINIMUM_AUTH_DELAY,
  MINIMUM_LOADER_DELAY,
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
  SECONDS_PER_MONTH,
  SECONDS_PER_YEAR,
} from '@config/constants';
import { lazy } from 'react';

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

export const convertBase64 = (file): Promise<any> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const resizeImage = (
  base64Str: string,
  maxWidth = 400,
  maxHeight = 400
): Promise<string> => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (maxWidth === maxHeight) {
        width = MAX_WIDTH;
        height = MAX_HEIGHT;
      } else if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
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

export const uuid = (): number => {
  const time = new Date().getTime();
  const array = time.toString().split('');
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return Number(array.join(''));
};

export const slowLoading = async (): Promise<void> => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, MINIMUM_AUTH_DELAY);
  });
};

export const getTextWidth = (text: string, font = 'Cera Pro') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx!.font = font;
  return ctx!.measureText(text).width;
};

export const isNumberValid = (val: string): boolean => {
  const regexp = /^[0-9]+$/;

  if (!regexp.test(val)) {
    return false;
  }

  const number = Number(val);

  if (!Number.isInteger(number) || Number.isNaN(number)) {
    return false;
  }

  return true;
};
