import { useEffect, useRef, useState } from 'react';

type TimeoutId = ReturnType<typeof setTimeout>;

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [timeoutId, setTimeoutId] = useState<TimeoutId | null>(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    setTimeoutId(newTimeoutId);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
