import { useState } from 'react';
import Icon, { IconTypes } from '@components/Icon/Icon';

type PasswordInputProps = {
  name: string;
  placeholder?: string;
};

const PasswordInput = ({
  name,
  placeholder,
  ...otherProps
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='relative w-full'>
      <input
        type={showPassword ? 'text' : 'password'}
        className='p-2 mt-1 block w-full border outline-0 border-gray-300 rounded-md text-sm placeholder-gray-500'
        {...otherProps}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
      />
      <button
        type='button'
        className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
        onClick={() => setShowPassword((prevState) => !prevState)}
      >
        <Icon
          type={IconTypes.Outlined}
          size={20}
          icon={showPassword ? 'visibility_off' : 'visibility'}
        />
      </button>
    </div>
  );
};

export default PasswordInput;
