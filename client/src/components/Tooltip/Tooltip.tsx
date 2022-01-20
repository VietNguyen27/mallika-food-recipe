import React, { ReactChild, ReactChildren, useContext } from 'react';
import cx from 'clsx';
import { getTextWidth } from '@helpers/helpers';
import { useRect } from '@hooks/useRect';
import { PhoneRectContext } from '@layout/Phone/Phone';

export enum TooltipDirection {
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export enum ArrowDirection {
  TOP_LEFT = 'after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-t-black',
  BOTTOM_LEFT = 'after:left-1/2 after:top-full after:-translate-x-1/2 after:border-b-black',
  TOP_RIGHT = 'after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-t-black',
  BOTTOM_RIGHT = 'after:left-1/2 after:top-full after:-translate-x-1/2 after:border-b-black',
}

export enum TooltipMessageDirection {
  TOP_LEFT = 'bottom-full left-0 mb-2',
  BOTTOM_LEFT = 'top-full left-0 mt-2',
  TOP_RIGHT = 'bottom-full right-0 mb-2',
  BOTTOM_RIGHT = 'top-full right-0 mt-2',
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
  const [rect, ref] = useRect();
  const phoneRect: any = useContext(PhoneRectContext);
  const isAbsolute = className && className.includes('absolute');
  const defaultClassName =
    'group inline-flex items-center z-50 after:w-1 after:h-1 after:border-4 after:border-transparent after:absolute after:opacity-0 after:invisible hover:after:opacity-100 hover:after:visible';
  const allClassNames = cx(
    defaultClassName,
    className,
    ArrowDirection[direction],
    !isAbsolute && 'relative'
  );
  const tooltipClassName = cx(
    'absolute bg-black text-xs text-white text-left p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible',
    TooltipMessageDirection[direction],
    getTextWidth(message) > 150 ? 'w-[150px]' : 'w-auto whitespace-nowrap'
  );

  return (
    <span className={allClassNames}>
      <span
        className={tooltipClassName}
        ref={ref}
        style={{
          right: `${
            rect &&
            rect!.left - phoneRect.rect!.left < 0 &&
            `${rect!.left - phoneRect.rect!.left - 10}px`
          }`,
        }}
      >
        {message}
      </span>
      {children}
    </span>
  );
};

export default Tooltip;
