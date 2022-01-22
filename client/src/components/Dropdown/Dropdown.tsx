import React, {
  Fragment,
  ReactChild,
  ReactChildren,
  useRef,
  cloneElement,
} from 'react';
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
  onClose?: () => void;
  onClick: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isShowing,
  children,
  className,
  onClose,
}) => {
  const dropdownRef = useRef(null);
  const defaultClassName =
    'w-full bg-white pb-6 rounded-t-md overflow-hidden shadow-lg';
  const dropdownClassNames = cx(
    defaultClassName,
    isShowing ? 'animate-slide-up' : 'animate-slide-down',
    className
  );

  const handleClickOutside = () => onClose();

  useOnClickOutside(dropdownRef, handleClickOutside);

  return isShowing
    ? ReactDOM.createPortal(
        <div className='absolute z-40 inset-0 bg-neutral-500/30 flex justify-center items-end'>
          <div className={dropdownClassNames} tabIndex={-1} ref={dropdownRef}>
            <div className='p-2'>
              {children instanceof Array &&
                children.map((child, index) => {
                  return (
                    <Fragment key={index}>
                      {cloneElement(child, {
                        onClose,
                      })}
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>,
        document.querySelector('main')
      )
    : null;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  onClose,
  onClick,
}) => {
  const defaultClassName =
    'flex items-center gap-3 cursor-pointer rounded px-2 py-1.5 mb-2 last:mb-0 hover:bg-gray-100 transition-colors duration-200';
  const allClassNames = cx(defaultClassName, className);

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
    onClick();
  };

  return (
    <div className={allClassNames} onClick={handleClick}>
      {children}
    </div>
  );
};
