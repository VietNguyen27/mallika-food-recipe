import React from 'react';

export enum IconTypes {
  FILLED = '',
  OUTLINED = '-outlined',
  ROUNDED = '-round',
  SHARP = '-sharp',
  TWO_TONE = '-two-tone',
}

interface IconProps {
  type?: IconTypes;
  icon: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  type = IconTypes.ROUNDED,
  icon,
  size = 24,
}) => {
  return (
    <span
      className={`material-icons${type}`}
      style={{ fontSize: `${size}px` }}
      tabIndex={-1}
    >
      {icon}
    </span>
  );
};

export default Icon;
