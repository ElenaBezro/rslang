import { Dispatch, useRef, SetStateAction, useCallback, useState } from 'react';

import { getLocalStorageValue, setLocalStorageValue } from '~/utils/localStorage';

const useLocalStorage = <T>(localStorageKey: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => getLocalStorageValue(localStorageKey, initialValue));

  const storedValueRef = useRef<T>(value);

  const updateValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
    const newValue = value instanceof Function ? value(storedValueRef.current) : value;
    storedValueRef.current = newValue;
    setLocalStorageValue(localStorageKey, newValue);
    setValue(newValue);
  }, [localStorageKey]);

  return [value, updateValue] as const;
};

export { useLocalStorage };