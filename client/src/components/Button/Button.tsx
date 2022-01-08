import { ReactChild, ReactChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import cx from 'clsx';

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum ButtonAs {
  BUTTON = 'button',
  LINK = 'link',
}

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DISABLED = 'disabled',
}

export enum ButtonSizes {
  EXTRA_LARGE = 'xl',
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
  EXTRA_SMALL = 'xs',
}

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

const variantButton = (variant: string): string => {
  switch (variant) {
    case ButtonVariants.PRIMARY:
      return 'border-transparent text-white bg-orange cursor-pointer hover:opacity-80';
    case ButtonVariants.SECONDARY:
      return 'border-gray-300 bg-white cursor-pointer hover:bg-gray-100';
    case ButtonVariants.DISABLED:
      return 'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200';
    default:
      return '';
  }
};

const sizeButton = (size: string): string => {
  switch (size) {
    case ButtonSizes.EXTRA_LARGE:
      return 'px-5 py-2 rounded-lg text-lg';
    case ButtonSizes.LARGE:
      return 'px-4 py-2 rounded-lg text-base';
    case ButtonSizes.MEDIUM:
      return 'px-3 py-2 rounded-md text-sm';
    case ButtonSizes.SMALL:
      return 'px-2 py-1 rounded-md text-sm';
    case ButtonSizes.EXTRA_SMALL:
      return 'px-2 py-1 rounded-sm text-xs';
    default:
      return '';
  }
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: ButtonAs.BUTTON;
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: ButtonAs.LINK;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = ButtonVariants.PRIMARY,
  type = ButtonTypes.BUTTON,
  size = ButtonSizes.MEDIUM,
  fluid,
  prefix,
  suffix,
  ...otherProps
}) => {
  const defaultClassName =
    'inline-flex justify-center items-center px-3 py-2 rounded-md text-sm border outline-none shadow-sm font-medium transition-all';
  const allClassNames = cx(
    defaultClassName,
    className,
    fluid ? 'w-full' : 'w-auto',
    sizeButton(size),
    variantButton(variant)
  );

  if (otherProps.as === ButtonAs.LINK) {
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
