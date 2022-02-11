import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

export enum SwitchSizes {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  EXTRA_SMALL = 'extra small',
}

const SwitchContainerSize = Object.freeze({
  [SwitchSizes.LARGE]: 'w-[52px] h-[28px]',
  [SwitchSizes.MEDIUM]: 'w-[44px] h-[24px]',
  [SwitchSizes.SMALL]: 'w-[36px] h-[20px]',
  [SwitchSizes.EXTRA_SMALL]: 'w-[28px] h-[16px]',
});

const SwitchToggleSize = Object.freeze({
  [SwitchSizes.LARGE]: 'w-[24px]',
  [SwitchSizes.MEDIUM]: 'w-[20px]',
  [SwitchSizes.SMALL]: 'w-[16px]',
  [SwitchSizes.EXTRA_SMALL]: 'w-[12px]',
});

interface SwitchProps {
  active: boolean;
  size?: SwitchSizes;
  className?: string;
  toggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({
  active = false,
  size = SwitchSizes.MEDIUM,
  className,
  toggle,
}) => {
  const defaultClassName = 'relative rounded-full cursor-pointer';
  const allClassNames = cx(
    defaultClassName,
    SwitchContainerSize[size],
    active ? 'bg-orange' : 'bg-gray-800',
    className
  );

  return (
    <div className={allClassNames} onClick={toggle}>
      <span
        className={cx(
          'absolute inset-0.5 bg-white rounded-full transition-transform',
          SwitchToggleSize[size],
          active && 'translate-x-full'
        )}
      ></span>
    </div>
  );
};

export default Switch;
