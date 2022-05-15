import { ReactChild, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import cx from 'clsx';

type RoundedButtonTypes = 'button' | 'submit' | 'reset';

type RoundedButtonAs = 'button' | 'link';

type RoundedButtonVariants = 'primary' | 'secondary' | 'disabled';

type RoundedButtonSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type RoundedButtonShape = 'full' | 'xl' | 'lg' | 'md' | 'sm';

type BaseProps = {
  children: ReactChild | ReactChildren;
  className?: string;
  variant?: RoundedButtonVariants;
  type?: RoundedButtonTypes;
  size?: RoundedButtonSizes;
  rounded?: RoundedButtonShape;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'link';
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const buttonVariantStyles = {
  primary: 'text-white bg-orange cursor-pointer hover:opacity-80',
  secondary: 'bg-white cursor-pointer hover:bg-gray-100',
  disabled: 'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200',
};

const buttonSizeStyles = {
  xl: 'p-4.5',
  lg: 'p-3.5',
  md: 'p-2.5',
  sm: 'p-2',
  xs: 'p-1.5',
};

const buttonRoundedStyles = {
  full: 'rounded-full',
  xl: 'rounded-xl',
  lg: 'rounded-lg',
  md: 'rounded-md',
  sm: 'rounded-sm',
};

const RoundedButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  type = 'button',
  size = 'md',
  rounded = 'full',
  ...otherProps
}) => {
  const defaultClassName = 'flex items-center justify-center transition-all';
  const allClassNames = cx(
    defaultClassName,
    className,
    buttonRoundedStyles[rounded],
    buttonSizeStyles[size],
    buttonVariantStyles[variant]
  );

  if (otherProps.as === 'link') {
    return (
      <Link className={allClassNames} {...otherProps}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={allClassNames} {...otherProps}>
      {children}
    </button>
  );
};

export default RoundedButton;
