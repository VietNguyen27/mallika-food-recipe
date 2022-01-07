import { useState } from 'react';
import { EyeHide20Regular, EyeShow20Regular } from '@fluentui/react-icons';

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
};

const PasswordInput = ({
  name,
  placeholder,
  register,
  error,
  ...otherProps
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='relative'>
      <input
        type={showPassword ? 'text' : 'password'}
        className='p-2 mb-1 block w-full border outline-0 border-gray-300 rounded-md text-sm placeholder-gray-600'
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        {...otherProps}
        {...register}
      />
      <button
        type='button'
        className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
        onClick={() => setShowPassword((prevState) => !prevState)}
        tabIndex={-1}
      >
        {showPassword ? <EyeHide20Regular /> : <EyeShow20Regular />}
      </button>
      {error && (
        <span className='absolute top-full left-0 text-xs text-red-500'>
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
