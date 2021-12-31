import React from 'react';

export enum IconTypes {
  Filled = '',
  Outlined = '-outlined',
  Rounded = '-round',
  Sharp = '-sharp',
  TwoTone = '-two-tone',
}

interface IconProps {
  type?: IconTypes;
  icon: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  type = IconTypes.Rounded,
  icon,
  size = 24,
}) => {
  return (
    <span className={`material-icons${type}`} style={{ fontSize: `${size}px` }}>
      {icon}
    </span>
  );
};

export default Icon;
