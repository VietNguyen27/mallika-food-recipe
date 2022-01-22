import React from 'react';
import cx from 'clsx';

interface LoadingProps {
  className?: string;
}

interface SpinnerProps {
  className?: string;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  const defaultClassName =
    'absolute z-50 top-0 bottom-0 w-full flex justify-center items-center';
  const allClassNames = cx(defaultClassName, className);

  return (
    <div className={allClassNames}>
      <div className='relative w-20 h-20 -translate-y-1/2'>
        <span className='absolute opacity-100 border-4 border-orange rounded-full animate-ripple-loading'></span>
        <span className='absolute opacity-0 border-4 border-orange rounded-full animate-ripple-loading animation-delay-negative-1000'></span>
      </div>
    </div>
  );
};

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  color = 'white',
}) => {
  const defaultClassName = 'animate-rotate-loading w-7 h-7 -mt-1 -mb-1';
  const allClassNames = cx(defaultClassName, className);

  return (
    <svg className={allClassNames} viewBox='0 0 50 50'>
      <circle
        className='animate-dash-loading'
        cx='25'
        cy='25'
        r='20'
        fill='none'
        stroke={color}
        strokeWidth='5'
        strokeLinecap='round'
      ></circle>
    </svg>
  );
};
