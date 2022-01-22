import React, { ReactChild, ReactChildren } from 'react';
import cx from 'clsx';

interface TagListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

export const TagList: React.FC<TagListProps> = ({ className, children }) => {
  const defaultClassName = 'flex flex-wrap gap-1.5';
  const allClassNames = cx(defaultClassName, className);

  return <div className={allClassNames}>{children}</div>;
};

interface TagProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  isActive: boolean;
  onClick: () => void;
}

export const Tag: React.FC<TagProps> = ({
  className,
  children,
  isActive,
  onClick,
}) => {
  const defaultClassName =
    'min-w-[40px] text-xs text-white text-center px-2.5 py-1 rounded-xl cursor-pointer';
  const allClassNames = cx(
    defaultClassName,
    isActive ? 'bg-orange' : 'bg-gray-800',
    className
  );

  return (
    <span className={allClassNames} onClick={onClick}>
      {children}
    </span>
  );
};
