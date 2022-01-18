import React, { ReactChild, ReactChildren } from 'react';
import cx from 'clsx';
import { getTextWidth } from '@helpers/helpers';

export enum TooltipDirection {
  TOP_LEFT = '-left-1 bottom-full mb-2 after:border-t-black after:top-full after:left-2',
  BOTTOM_LEFT = '-left-1 top-full mt-2 after:border-b-black after:bottom-full after:left-2',
  TOP_RIGHT = '-right-1 bottom-full mb-2 after:border-t-black after:top-full after:right-2',
  BOTTOM_RIGHT = '-right-1 top-full mt-2 after:border-b-black after:bottom-full after:right-2',
}

interface TooltipProps {
  direction?: TooltipDirection;
  message: string;
  children: ReactChild | ReactChildren;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  className,
  message,
  direction = TooltipDirection.TOP_RIGHT,
  children,
}) => {
  const isAbsolute = className && className.includes('absolute');
  const defaultClassName = 'group inline-flex items-center z-50';
  const allClassNames = cx(
    defaultClassName,
    className,
    !isAbsolute && 'relative'
  );
  const tooltipClassName = cx(
    'absolute bg-black text-xs text-white text-left p-2 rounded after:w-1 after:h-1 after:border-4 after:border-transparent after:absolute transition-transform opacity-0 invisible group-hover:opacity-100 group-hover:visible',
    direction,
    getTextWidth(message) > 150 ? 'w-[150px]' : 'w-auto whitespace-nowrap'
  );

  return (
    <span className={allClassNames}>
      <span className={tooltipClassName}>{message}</span>
      {children}
    </span>
  );
};

export default Tooltip;
