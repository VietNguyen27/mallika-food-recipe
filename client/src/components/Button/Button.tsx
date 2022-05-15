import { ReactChild, ReactChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import cx from 'clsx';

type ButtonTypes = 'button' | 'submit' | 'reset';

type ButtonAs = 'button' | 'link';

type ButtonVariants = 'primary' | 'secondary' | 'disabled';

type ButtonSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type BaseProps = {
  children: ReactChild | ReactChildren;
  className?: string;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: ButtonSizes;
  fluid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
  primary:
    'border-transparent text-white bg-orange cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-yellow',
  secondary:
    'border-gray-300 bg-white cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-gray-200',
  disabled:
    'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200 focus:ring-2 focus:ring-gray-200',
};

const buttonSizeStyles = {
  xl: 'px-5 py-2 rounded-lg text-lg',
  lg: 'px-4 py-2 rounded-lg text-base',
  md: 'px-3 py-2 rounded-md text-sm',
  sm: 'px-2 py-1 rounded-md text-sm',
  xs: 'px-2 py-1 rounded-sm text-xs',
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  type = 'button',
  size = 'md',
  fluid,
  prefix,
  suffix,
  ...otherProps
}) => {
  const defaultClassName =
    'inline-flex justify-center items-center border outline-none shadow-sm font-medium transition-all';
  const allClassNames = cx(
    defaultClassName,
    className,
    fluid ? 'w-full' : 'w-auto',
    buttonSizeStyles[size],
    buttonVariantStyles[variant]
  );

  if (otherProps.as === 'link') {
    return (
      <Link className={allClassNames} {...otherProps}>
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </Link>
    );
  }

  return (
    <button type={type} className={allClassNames} {...otherProps}>
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </button>
  );
};

export default Button;
