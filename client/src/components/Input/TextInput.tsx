export enum InputTypes {
  Text = 'text',
  Email = 'email',
}

interface TextInputProps {
  type?: InputTypes;
  name: string;
  placeholder: string;
  register: any;
  error?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  type = InputTypes.Text,
  name,
  placeholder,
  register,
  error,
  ...otherProps
}) => {
  return (
    <div className="relative">
      <input
      className='p-2 mt-[10px] border block w-full outline-0 border-gray-300 rounded-md text-sm placeholder-gray-500'
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete='off'
      {...register}
      {...otherProps}
    />
      {error && <span className="absolute top-full left-0 text-xs text-red-500">{error}</span>}
    </div>
  );
};
export default TextInput;
