import React, {
  useState,
  ReactChild,
  ReactChildren,
  useRef,
  Fragment,
  cloneElement,
} from 'react';
import cx from 'clsx';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { Checkmark16Filled, ChevronDown20Regular } from '@fluentui/react-icons';

export enum SelectVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface SelectProps {
  variant?: SelectVariants;
  name: string;
  label: string;
  defaultValue?: string | number;
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  onChange: (name: string, value: string | number) => void;
}

interface OptionProps {
  value: string | number;
  children: ReactChild | ReactChildren;
  selectedOption?: string | number;
  onChangeOption?: (value: string | number) => void;
}

export const Select: React.FC<SelectProps> = ({
  variant = SelectVariants.SECONDARY,
  name,
  label,
  defaultValue,
  className,
  children,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const selectContainerRef = useRef(null);
  const selectClassNames = cx(
    'block w-full outline-0 border-gray-300 text-sm placeholder-gray-600',
    variant === SelectVariants.PRIMARY && 'p-2 mb-1 border rounded-md',
    variant === SelectVariants.SECONDARY && 'pb-1 pt-1 border-b'
  );

  const handleClickOutside = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, handleClickOutside);

  const onChangeOption = (value: string) => {
    setSelectedOption(value);
    setShowDropdown(false);
    onChange(name, value);
  };

  return (
    <div className={className}>
      {label && (
        <label className='text-sm text-gray-800 capitalize'>{label}</label>
      )}
      <div className='relative'>
        <span
          className={selectClassNames}
          onClick={() => setShowDropdown((prevState) => !prevState)}
        >
          {children instanceof Array &&
            children.map((child) => {
              if (child.props.value === selectedOption) {
                return child.props.children;
              }
            })}
        </span>
        <span className='absolute top-1/2 right-1 -translate-y-1/2 pointer-events-none'>
          <ChevronDown20Regular />
        </span>
      </div>
      <div
        className={cx(
          'absolute z-50 inset-0 bg-neutral-500/30 scale-110 flex justify-center items-center',
          showDropdown ? 'block' : 'hidden'
        )}
      >
        <div
          className='w-7/12 bg-white -translate-y-8 rounded-md shadow-lg overflow-hidden animate-zoom-in'
          ref={selectContainerRef}
        >
          <p className='text-sm font-semibold px-3 pt-2 pb-1'>
            Choose <span className='lowercase'>{label}:</span>
          </p>
          <ul className='flex flex-col items-stretch'>
            {children instanceof Array &&
              children.map((child, index) => {
                return (
                  <Fragment key={index}>
                    {cloneElement(child, {
                      selectedOption,
                      onChangeOption,
                    })}
                  </Fragment>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Option: React.FC<OptionProps> = ({
  value,
  children,
  selectedOption,
  onChangeOption,
}) => {
  const handleChange = () => {
    if (onChangeOption) {
      onChangeOption(value);
    }
  };
  return (
    <li
      className={cx(
        'relative text-sm px-3 py-1.5 cursor-pointer transition-colors',
        selectedOption === value ? 'bg-orange text-white' : 'hover:bg-gray-100'
      )}
      onClick={() => handleChange()}
    >
      {children}
      {selectedOption === value && (
        <span className='absolute top-1/2 right-2 -translate-y-1/2'>
          <Checkmark16Filled />{' '}
        </span>
      )}
    </li>
  );
};
