import { useState } from 'react';

const useToggle = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = (): void => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
};

export default useToggle;
