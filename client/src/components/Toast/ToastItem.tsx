import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { ToastItemState } from '@features/toast-slice';
import {
  CheckmarkCircle20Filled,
  Warning20Filled,
  ErrorCircle20Filled,
  Info20Filled,
} from '@fluentui/react-icons';
import { TOAST_VISIBLE_TIME } from '@config/constants';

export enum ToastTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

const ToastColor = Object.freeze({
  [ToastTypes.SUCCESS]: 'bg-green-100 after:bg-green-600',
  [ToastTypes.WARNING]: 'bg-amber-100 after:bg-amber-500',
  [ToastTypes.ERROR]: 'bg-red-100 after:bg-red-500',
  [ToastTypes.INFO]: 'bg-blue-100 after:bg-blue-600',
});

const ToastIcons = Object.freeze({
  [ToastTypes.SUCCESS]: <CheckmarkCircle20Filled />,
  [ToastTypes.WARNING]: <Warning20Filled />,
  [ToastTypes.ERROR]: <ErrorCircle20Filled />,
  [ToastTypes.INFO]: <Info20Filled />,
});

const ToastTitle = Object.freeze({
  [ToastTypes.SUCCESS]: 'Success',
  [ToastTypes.WARNING]: 'Warning',
  [ToastTypes.ERROR]: 'Error',
  [ToastTypes.INFO]: 'Info',
});

const ToastIconColors = Object.freeze({
  [ToastTypes.SUCCESS]: 'text-green-600',
  [ToastTypes.WARNING]: 'text-amber-500',
  [ToastTypes.ERROR]: 'text-red-500',
  [ToastTypes.INFO]: 'text-blue-600',
});

const ToastItem: React.FC<ToastItemState> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const defaultClassNames =
    'relative py-2 pr-2 pl-8 rounded-md mb-2 text-xs max-w-[200px] overflow-hidden animate-slide-in after:absolute after:inset-y-0 after:left-0 after:w-1';
  const allClassNames = cx(
    defaultClassNames,
    ToastColor[type],
    !isVisible && 'animate-slide-out'
  );
  const iconClassNames = cx('absolute top-2 left-2', ToastIconColors[type]);

  useEffect(() => {
    setTimeout(() => setIsVisible(false), TOAST_VISIBLE_TIME);
  }, []);

  return (
    <li className={allClassNames}>
      <span className='font-semibold'>{ToastTitle[type]}</span>
      <p>{message}</p>
      <span className={iconClassNames}>{ToastIcons[type]}</span>
    </li>
  );
};

export default ToastItem;
