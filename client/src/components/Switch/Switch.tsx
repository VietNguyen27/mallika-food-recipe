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
  name: string;
  size?: SwitchSizes;
  className?: string;
  triggerReset?: boolean;
  onChange: UseFormSetValue<FieldValues>;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  size = SwitchSizes.MEDIUM,
  className,
  triggerReset,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const defaultClassName = 'relative rounded-full cursor-pointer';
  const allClassNames = cx(
    defaultClassName,
    SwitchContainerSize[size],
    isActive ? 'bg-orange' : 'bg-gray-800',
    className
  );

  useEffect(() => {
    if (triggerReset) {
      setIsActive(false);
      onChange(name, false);
    }
  }, [triggerReset]);

  const onClick = () => {
    setIsActive((prevState) => !prevState);
    onChange(name, !isActive);
  };

  return (
    <div className={allClassNames} onClick={onClick}>
      <span
        className={cx(
          'absolute inset-0.5 bg-white rounded-full transition-transform',
          SwitchToggleSize[size],
          isActive && 'translate-x-full'
        )}
      ></span>
    </div>
  );
};

export default Switch;
