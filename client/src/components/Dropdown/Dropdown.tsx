import React, { ReactChild, ReactChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from '@hooks/useOnClickOutside';
import cx from 'clsx';

interface DropdownProps {
  isShowing: boolean;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  onClose: () => void;
}

interface DropdownItemProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  onClick: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isShowing,
  children,
  className,
  onClose,
}) => {
  const dropdownRef = useRef(null);
  const defaultClassNames =
    'w-full bg-white pb-6 rounded-t-md overflow-hidden shadow-lg animate-slide-up';
  const dropdownClassNames = cx(defaultClassNames, className);
  const handleClickOutside = () => onClose();

  useOnClickOutside(dropdownRef, handleClickOutside);

  return isShowing
    ? ReactDOM.createPortal(
        <div className='absolute z-40 inset-0 bg-neutral-500/30  flex justify-center items-end'>
          <div className={dropdownClassNames} tabIndex={-1} ref={dropdownRef}>
            <ul className='p-2'>{children}</ul>
          </div>
        </div>,
        document.querySelector('main')
      )
    : null;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  onClick,
}) => {
  const defaultClassNames =
    'flex items-center gap-3 cursor-pointer rounded px-2 py-1.5 mb-2 last:mb-0 hover:bg-gray-100 transition-colors duration-200';
  const allClassNames = cx(defaultClassNames, className);

  return (
    <li className={allClassNames} onClick={onClick}>
      {children}
    </li>
  );
};
