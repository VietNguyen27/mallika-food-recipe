import React, { ReactChild, ReactChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import cx from 'clsx';
import useOnClickOutside from '@hooks/useOnClickOutside';

interface ModalProps {
  isShowing: boolean;
  title?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isShowing,
  title,
  children,
  className,
  onClose,
}) => {
  const modalRef = useRef(null);
  const defaultClassName =
    'w-3/4 bg-white rounded-md overflow-hidden shadow-lg animate-zoom-in';
  const modalClassNames = cx(defaultClassName, className);
  const handleClickOutside = () => onClose();

  useOnClickOutside(modalRef, handleClickOutside);

  return isShowing
    ? ReactDOM.createPortal(
        <div className='absolute z-40 inset-0 bg-neutral-500/30 scale-110 flex justify-center items-center'>
          <div className={modalClassNames} tabIndex={-1} ref={modalRef}>
            <div className='relative px-3 py-2'>
              {title && <h3 className='text-md text-center'>{title}</h3>}
              {children}
            </div>
          </div>
        </div>,
        document.querySelector('main')
      )
    : null;
};

export default Modal;
