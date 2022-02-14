import React, { useState } from 'react';

const useToggle = (defaultValue = false) => {
  const [isShowing, setIsShowing] = useState<boolean>(defaultValue);

  const toggle = (): void => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
};

export default useToggle;
