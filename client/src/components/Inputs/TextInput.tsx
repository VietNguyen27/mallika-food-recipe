type TextInputProps = {
  type?: string;
  name: string;
  placeholder: string;
};

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  name,
  placeholder,
  ...otherProps
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="p-2 mt-1 border block w-full outline-0 border-gray-300 rounded-md text-sm placeholder-gray-500"
      {...otherProps}
    />
  );
};
export default TextInput;
