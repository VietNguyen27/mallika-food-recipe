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
  PRIMARY = 'text-white bg-orange cursor-pointer hover:opacity-80',
  SECONDARY = 'bg-white cursor-pointer hover:bg-gray-100',
  DISABLED = 'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200',
}

export enum ButtonSizes {
  EXTRA_LARGE = 'p-4.5',
  LARGE = 'p-3.5',
  MEDIUM = 'p-2.5',
  SMALL = 'p-2',
  EXTRA_SMALL = 'p-1.5',
}

export enum ButtonRoundShape {
  FULL = 'rounded-full',
  EXTRA_LARGE = 'rounded-xl',
  LARGE = 'rounded-lg',
  MEDIUM = 'rounded-md',
  SMALL = 'rounded-sm',
}

type BaseProps = {
  children: ReactChild | ReactChildren;
  className?: string;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: ButtonSizes;
  rounded?: ButtonRoundShape;
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

const RoundedButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant = ButtonVariants.PRIMARY,
  type = ButtonTypes.BUTTON,
  size = ButtonSizes.MEDIUM,
  rounded = ButtonRoundShape.FULL,
  ...otherProps
}) => {
  const defaultClassName = 'flex items-center justify-center transition-all';
  const allClassNames = cx(defaultClassName, className, rounded, size, variant);

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

export default RoundedButton;
