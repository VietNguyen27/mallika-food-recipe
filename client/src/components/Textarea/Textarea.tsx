import Tooltip from '@components/Tooltip/Tooltip';
import { EditOff16Regular } from '@fluentui/react-icons';
import cx from 'clsx';

export enum TextareaTypes {
  TEXT = 'text',
  EMAIL = 'email',
}

export enum TextareaVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface TextareaProps {
  type?: TextareaTypes;
  variant?: TextareaVariants;
  label?: string;
  name: string;
  defaultValue?: string;
  placeholder: string;
  register?: any;
  error?: string;
  className?: string;
  readOnly?: boolean;
  rows: number;
}

const Textarea: React.FC<TextareaProps> = ({
  type = TextareaTypes.TEXT,
  variant = TextareaVariants.PRIMARY,
  label,
  name,
  placeholder,
  register,
  error,
  className,
  readOnly,
  defaultValue,
  ...otherProps
}) => {
  const formGroupClassNames = cx('relative', className);
  const textareaClassNames = cx(
    'block w-full outline-0 border-gray-300 text-sm placeholder-gray-600 resize-none',
    variant === TextareaVariants.PRIMARY && 'p-2 mb-1 border rounded-md',
    variant === TextareaVariants.SECONDARY && 'pb-1 pt-1 border-b'
  );

  return (
    <div className={formGroupClassNames}>
      {label && (
        <label className='text-sm text-gray-800 capitalize'>{label}</label>
      )}
      <textarea
        className={textareaClassNames}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        readOnly={readOnly}
        {...register}
        {...otherProps}
      >
        {defaultValue}
      </textarea>
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
    </div>
  );
};

export default Textarea;
