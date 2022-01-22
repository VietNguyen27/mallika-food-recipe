import React from 'react';
import cx from 'clsx';

export enum IconTypes {
  FILLED = '',
  OUTLINED = '-outlined',
  ROUNDED = '-round',
  SHARP = '-sharp',
  TWO_TONE = '-two-tone',
}

interface IconProps {
  className?: string;
  type?: IconTypes;
  icon: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  className,
  type = IconTypes.ROUNDED,
  icon,
  size = 24,
}) => {
  const defaultClassName = `material-icons${type}`;
  const allClassNames = cx(defaultClassName, className);

  return (
    <span
      className={allClassNames}
      style={{ fontSize: `${size}px` }}
      tabIndex={-1}
    >
      {icon}
    </span>
  );
};

export default Icon;
