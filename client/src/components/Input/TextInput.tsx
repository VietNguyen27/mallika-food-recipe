import { forwardRef, ReactNode } from 'react';
import { ChangeHandler } from 'react-hook-form';
import cx from 'clsx';
import { Tooltip } from '@components/Tooltip';
import { EditOff16Regular } from '@fluentui/react-icons';
import { isNumberValid } from '@helpers/helpers';

type InputTypes = 'text' | 'email';

type InputVariants = 'primary' | 'secondary' | 'tertiary';

interface TextInputProps {
  type?: InputTypes;
  variant?: InputVariants;
  label?: string;
  name?: string;
  defaultValue?: string | number;
  placeholder?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  readOnly?: boolean;
  suffix?: ReactNode;
  onlyNumber?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  onFocus?: () => void;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}

const inputVariantStyles = {
  primary: 'p-2 mb-1 border rounded-md',
  secondary: 'pb-1 pt-1 border-b',
  tertiary: 'px-4 py-2 bg-gray-100 rounded-3xl',
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      variant = 'primary',
      label,
      name,
      placeholder,
      onFocus,
      onChange,
      onBlur,
      error,
      className,
      inputClassName,
      readOnly,
      maxLength,
      onlyNumber,
      suffix,
      ...otherProps
    },
    ref
  ) => {
    const formGroupClassNames = cx('relative', className);
    const inputClassNames = cx(
      'block w-full outline-0 border-gray-300 text-sm placeholder-gray-600',
      inputClassName,
      inputVariantStyles[variant]
    );

    const onKeyPress = (e) => {
      if (maxLength && e.target.value.length >= maxLength) {
        e.preventDefault();
      }

      if (onlyNumber && !isNumberValid(e.key)) {
        e.preventDefault();
      }
    };

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
          ref={ref}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
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
          <span
            className={cx(
              'absolute top-full left-0 text-xs text-red-500',
              variant === 'tertiary' && 'pl-3'
            )}
          >
            {error}
          </span>
        )}
        {suffix && suffix}
      </div>
    );
  }
);

export default TextInput;
