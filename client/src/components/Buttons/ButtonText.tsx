import { ReactChild, ReactChildren } from "react";

export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
  React = 'reset',
}

type CustomButtonProps = {
  children: ReactChild | ReactChildren;
  type?: ButtonTypes;
  fluid: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type = 'button',
  fluid,
  ...otherProps
}) => {
  return (
    <button
      className={`py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange ${
        fluid ? "w-full" : "w-auto"
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default CustomButton;
