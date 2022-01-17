import { ReactNode } from 'react';
import Tooltip from '@components/Tooltip/Tooltip';
import { EditOff16Regular } from '@fluentui/react-icons';
import cx from 'clsx';

export enum InputTypes {
  TEXT = 'text',
  EMAIL = 'email',
}

export enum InputVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface TextInputProps {
  type?: InputTypes;
  variant?: InputVariants;
  label?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  register?: any;
  error?: string;
  className?: string;
  inputClassName?: string;
  readOnly?: boolean;
  suffix?: ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  type = InputTypes.TEXT,
  variant = InputVariants.PRIMARY,
  label,
  name,
  placeholder,
  register,
  error,
  className,
  inputClassName,
  readOnly,
  suffix,
  ...otherProps
}) => {
  const formGroupClassNames = cx('relative', className);
  const inputClassNames = cx(
    'block w-full outline-0 border-gray-300 text-sm placeholder-gray-600',
    inputClassName,
    variant === InputVariants.PRIMARY && 'p-2 mb-1 border rounded-md',
    variant === InputVariants.SECONDARY && 'pb-1 pt-1 border-b'
  );

  return (
    <div className={formGroupClassNames}>
      {label && (
        <label className='text-sm text-gray-800 capitalize'>{label}</label>
      )}
      <input
        className={inputClassNames}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        readOnly={readOnly}
        {...register}
        {...otherProps}
      />
      {readOnly && (
        <Tooltip
          message='This field cannot be edited'
          className='absolute top-1/2 right-2 -translate-y-1/2'
        >
          <EditOff16Regular />
        </Tooltip>
      )}
      {error && (
        <span className='absolute top-full left-0 text-xs text-red-500'>
          {error}
        </span>
      )}
      {suffix && suffix}
    </div>
  );
};

export default TextInput;
