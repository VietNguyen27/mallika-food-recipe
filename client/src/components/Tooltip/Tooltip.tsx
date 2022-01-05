import React, { ReactChild, ReactChildren } from 'react';
import cx from 'clsx';

export enum TooltipDirection {
  TopLeft = '-left-1 bottom-full mb-2 after:border-t-black after:top-full after:left-2',
  BottomLeft = '-left-1 top-full mt-2 after:border-b-black after:bottom-full after:left-2',
  TopRight = '-right-1 bottom-full mb-2 after:border-t-black after:top-full after:right-2',
  BottomRight = '-right-1 top-full mt-2 after:border-b-black after:bottom-full after:right-2',
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
  direction = TooltipDirection.TopRight,
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
    'absolute max-w-[200px] bg-black text-xs text-white whitespace-nowrap p-2 rounded-sm after:w-1 after:h-1 after:border-4 after:border-transparent after:absolute transition-transform opacity-0 invisible group-hover:opacity-100 group-hover:visible',
    direction
  );

  return (
    <span className={allClassNames}>
      <span className={tooltipClassName}>{message}</span>
      {children}
    </span>
  );
};

export default Tooltip;
