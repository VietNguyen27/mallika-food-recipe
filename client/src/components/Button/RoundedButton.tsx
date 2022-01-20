import { ReactChild, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import cx from 'clsx';

export enum RoundedButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum RoundedButtonAs {
  BUTTON = 'button',
  LINK = 'link',
}

export enum RoundedButtonVariants {
  PRIMARY = 'text-white bg-orange cursor-pointer hover:opacity-80',
  SECONDARY = 'bg-white cursor-pointer hover:bg-gray-100',
  DISABLED = 'bg-gray-300 text-black cursor-not-allowed hover:bg-gray-200',
}

export enum RoundedButtonSizes {
  EXTRA_LARGE = 'p-4.5',
  LARGE = 'p-3.5',
  MEDIUM = 'p-2.5',
  SMALL = 'p-2',
  EXTRA_SMALL = 'p-1.5',
}

export enum RoundedButtonShape {
  FULL = 'rounded-full',
  EXTRA_LARGE = 'rounded-xl',
  LARGE = 'rounded-lg',
  MEDIUM = 'rounded-md',
  SMALL = 'rounded-sm',
}

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
    as?: RoundedButtonAs.BUTTON;
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: RoundedButtonAs.LINK;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const RoundedButton: React.FC<ButtonProps> = ({
  children,
  className,
  variant = RoundedButtonVariants.PRIMARY,
  type = RoundedButtonTypes.BUTTON,
  size = RoundedButtonSizes.MEDIUM,
  rounded = RoundedButtonShape.FULL,
  ...otherProps
}) => {
  const defaultClassName = 'flex items-center justify-center transition-all';
  const allClassNames = cx(defaultClassName, className, rounded, size, variant);

  if (otherProps.as === RoundedButtonAs.LINK) {
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
