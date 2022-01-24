import { useState, useEffect } from 'react';

const TIME_DEBOUNCE = 500;

const useDebounce = <T>(value: T, delay: number = TIME_DEBOUNCE) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
