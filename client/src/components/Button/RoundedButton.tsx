import { ReactChild, ReactChildren } from 'react';
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
};

const variantButton = (variant: string): string => {
  switch (variant) {
    case ButtonVariants.PRIMARY:
      return 'text-white bg-orange cursor-pointer hover:opacity-80';
    case ButtonVariants.SECONDARY:
      return 'bg-white cursor-pointer hover:bg-gray-100';
    case ButtonVariants.DISABLED:
      return 'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200';
    default:
      return '';
  }
};

const sizeButton = (size: string): string => {
  switch (size) {
    case ButtonSizes.EXTRA_LARGE:
      return 'p-4.5';
    case ButtonSizes.LARGE:
      return 'p-3.5';
    case ButtonSizes.MEDIUM:
      return 'p-2.5';
    case ButtonSizes.SMALL:
      return 'p-2';
    case ButtonSizes.EXTRA_SMALL:
      return 'p-1.5';
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
  ...otherProps
}) => {
  const defaultClassName =
    'rounded-full flex items-center justify-center transition-all';
  const allClassNames = cx(
    defaultClassName,
    className,
    sizeButton(size),
    variantButton(variant)
  );

  if (otherProps.as === ButtonAs.LINK) {
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

export default Button;
