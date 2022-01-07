import React, { useState } from 'react';
import cx from 'clsx';

interface SwitchProps {
  className?: string;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ className, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const defaultClassNames = 'relative w-10 h-6 rounded-full cursor-pointer';
  const allClassNames = cx(
    defaultClassNames,
    isActive ? 'bg-orange' : 'bg-gray-800',
    className
  );

  const onClick = () => {
    setIsActive((prevState) => !prevState);
    onChange();
  };

  return (
    <div className={allClassNames} onClick={onClick}>
      <span
        className={cx(
          'absolute inset-0.5 w-1/2 bg-white rounded-full transition-transform',
          isActive && 'translate-x-3/4'
        )}
      ></span>
    </div>
  );
};

export default Switch;
