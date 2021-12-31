import CIcon from "@coreui/icons-react";
import { useState } from "react";
import { cilLowVision, cilEyedropper } from "@coreui/icons";

type PasswordInputProps = {
  fluid: string;
  placeholder: string;
  name: string;
};

const PasswordInput = ({
  name,
  placeholder,
  fluid,
  ...otherProps
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${fluid ? "w-full" : "w-auto"}`}>
      <input
        type={showPassword ? "text" : "password"}
        className="p-2 mt-1 block w-full border outline-0 border-gray-300 rounded-md text-sm placeholder-gray-500"
        {...otherProps}
        name={name}
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
        {showPassword ? (
          <CIcon
            icon={cilLowVision}
            height={16}
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        ) : (
          <CIcon
            icon={cilEyedropper}
            height={16}
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
