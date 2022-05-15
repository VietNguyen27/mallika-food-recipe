import React from 'react';
import cx from 'clsx';

type SwitchSizes = 'lg' | 'md' | 'sm' | 'xs';

const switchContainerSize = {
  lg: 'w-[52px] h-[28px]',
  md: 'w-[44px] h-[24px]',
  sm: 'w-[36px] h-[20px]',
  xs: 'w-[28px] h-[16px]',
};

const switchToggleSize = {
  lg: 'w-[24px]',
  md: 'w-[20px]',
  sm: 'w-[16px]',
  xs: 'w-[12px]',
};

interface SwitchProps {
  active: boolean;
  size?: SwitchSizes;
  className?: string;
  toggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({
  active = false,
  size = 'md',
  className,
  toggle,
}) => {
  const defaultClassName = 'relative rounded-full cursor-pointer';
  const allClassNames = cx(
    defaultClassName,
    switchContainerSize[size],
    active ? 'bg-orange' : 'bg-gray-800',
    className
  );

  return (
    <div className={allClassNames} onClick={toggle}>
      <span
        className={cx(
          'absolute inset-0.5 bg-white rounded-full transition-transform',
          switchToggleSize[size],
          active && 'translate-x-full'
        )}
      ></span>
    </div>
  );
};

export default Switch;
