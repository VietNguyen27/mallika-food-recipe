import { ChangeEvent, ReactNode, forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';
import cx from 'clsx';

interface SearchInputProps {
  name: string;
  label?: string;
  placeholder: string;
  className?: string;
  containerClassName?: string;
  value?: string;
  register?: any;
  suffix?: ReactNode;
  autoFocus?: boolean;
  onFocus?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label,
      name,
      placeholder,
      className,
      containerClassName,
      value,
      register,
      suffix,
      onFocus,
      onChange,
      onBlur,
      ...otherProps
    },
    ref
  ) => {
    const defaultClassName =
      'w-full pr-10 outline-0 rounded-2xl text-sm placeholder-gray-800';
    const allClassNames = cx(defaultClassName, className);

    return (
      <div className={cx('relative', containerClassName)}>
        <input
          type='text'
          className={allClassNames}
          name={name}
          placeholder={placeholder}
          autoComplete='off'
          ref={ref}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          {...otherProps}
        />
        {suffix && suffix}
      </div>
    );
  }
);

export default SearchInput;
