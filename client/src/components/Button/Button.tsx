import { ReactChild, ReactChildren, ReactNode } from 'react';

export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
}

type ButtonProps = {
  children: ReactChild | ReactChildren;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  fluid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

const variantButton = (variant: string): string => {
  switch (variant) {
    case 'primary':
      return 'border-transparent text-white bg-orange';
    case 'secondary':
      return 'border-gray-300 bg-white hover:bg-gray-100';
    default:
      return '';
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariants.Primary,
  type = ButtonTypes.Button,
  fluid,
  prefix,
  suffix,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={`inline-flex justify-center items-center py-2 border shadow-sm text-sm font-medium rounded-md transition-colors ${variantButton(
        variant
      )} ${fluid ? 'w-full' : 'w-auto'}`}
      {...otherProps}
    >
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </button>
  );
};

export default Button;
