import React from 'react';
import ReactDOM from 'react-dom';
import { selectorToast } from '@features/toast-slice';
import { useSelector } from 'react-redux';
import ToastItem from './ToastItem';

const ToastList = () => {
  const toasts = useSelector(selectorToast);

  return toasts.length
    ? ReactDOM.createPortal(
        <ul className='absolute z-50 top-8 right-0 px-3 flex flex-col items-stretch'>
          {toasts.map((toast) => (
            <ToastItem key={toast._id} {...toast} />
          ))}
        </ul>,
        document.querySelector('main')
      )
    : null;
};

export default ToastList;
