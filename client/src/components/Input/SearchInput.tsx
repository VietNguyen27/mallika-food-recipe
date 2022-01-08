import clsx from 'clsx';
import { ReactNode } from 'react';

interface SearchInputProps {
  name: string;
  placeholder: string;
  className?: string;
  register?: any;
  suffix?: ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder,
  children,
  className,
  register,
  suffix,
  ...otherProps
}) => {
  const defaultClassName =
    'w-full outline-0 rounded-2xl text-sm placeholder-gray-800';
  const allClassNames = clsx(defaultClassName, className);

  return (
    <div className='relative'>
      <input
        type='text'
        className={allClassNames}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        {...register}
        {...otherProps}
      />
      {children}
      {suffix && suffix}
    </div>
  );
};

export default SearchInput;
