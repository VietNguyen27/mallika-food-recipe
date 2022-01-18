import { ReactNode, forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';
import cx from 'clsx';

interface SearchInputProps {
  name: string;
  label?: string;
  placeholder: string;
  className?: string;
  register?: any;
  suffix?: ReactNode;
  autoFocus?: boolean;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label,
      name,
      placeholder,
      className,
      register,
      suffix,
      onChange,
      onBlur,
      ...otherProps
    },
    ref
  ) => {
    const defaultClassName =
      'w-full outline-0 rounded-2xl text-sm placeholder-gray-800';
    const allClassNames = cx(defaultClassName, className);

    return (
      <div className='relative'>
        <input
          type='text'
          className={allClassNames}
          name={name}
          placeholder={placeholder}
          autoComplete='off'
          ref={ref}
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
