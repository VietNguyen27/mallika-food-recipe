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
  className?: string;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: ButtonSizes;
};

const variantButton = (variant: string): string => {
  switch (variant) {
    case ButtonVariants.Primary:
      return 'text-white bg-orange hover:opacity-80';
    case ButtonVariants.Secondary:
      return 'bg-white hover:bg-gray-100';
    default:
      return '';
  }
};

const sizeButton = (size: string): string => {
  switch (size) {
    case ButtonSizes.ExtraLarge:
      return 'p-4.5';
    case ButtonSizes.Large:
      return 'p-3.5';
    case ButtonSizes.Medium:
      return 'p-2.5';
    case ButtonSizes.Small:
      return 'p-2';
    case ButtonSizes.ExtraSmall:
      return 'p-1.5';
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
  className,
  variant = ButtonVariants.Primary,
  type = ButtonTypes.Button,
  size = ButtonSizes.Medium,
  ...otherProps
}) => {
  const allClassNames = `rounded-full flex items-center justify-center transition-all ${
    className ? className : ''
  } ${sizeButton(size)} ${variantButton(variant)}`;

  if (otherProps.as === ButtonAs.Link) {
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
