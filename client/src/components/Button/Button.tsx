import { ReactChild, ReactChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export enum ButtonAs {
  Button = 'button',
  Link = 'link',
}

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonSizes {
  ExtraLarge = 'xl',
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
  ExtraSmall = 'xs',
}

type BaseProps = {
  children: ReactChild | ReactChildren;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: ButtonSizes;
  fluid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

const variantButton = (variant: string): string => {
  switch (variant) {
    case ButtonVariants.Primary:
      return 'border-transparent text-white bg-orange hover:opacity-75';
    case ButtonVariants.Secondary:
      return 'border-gray-300 bg-white hover:bg-gray-100';
    default:
      return '';
  }
};

const sizeButton = (size: string): string => {
  switch (size) {
    case ButtonSizes.ExtraLarge:
      return 'px-5 py-2 rounded-lg text-lg';
    case ButtonSizes.Large:
      return 'px-4 py-2 rounded-lg text-base';
    case ButtonSizes.Medium:
      return 'px-3 py-2 rounded-md text-sm';
    case ButtonSizes.Small:
      return 'px-2 py-1 rounded-md text-sm';
    case ButtonSizes.ExtraSmall:
      return 'px-2 py-1 rounded-sm text-xs';
    default:
      return '';
  }
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: ButtonAs.Button;
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: ButtonAs.Link;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariants.Primary,
  type = ButtonTypes.Button,
  size = ButtonSizes.Medium,
  fluid,
  prefix,
  suffix,
  ...otherProps
}) => {
  const allClassNames = `inline-flex justify-center items-center px-3 py-2 rounded-md text-sm border shadow-sm font-medium transition-all ${sizeButton(
    size
  )} ${variantButton(variant)} ${fluid ? 'w-full' : 'w-auto'}`;

  if (otherProps.as === ButtonAs.Link) {
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
