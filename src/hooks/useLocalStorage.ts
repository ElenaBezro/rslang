import { Dispatch, useRef } from 'react';
import { SetStateAction, useCallback, useState } from 'react';

const getLocalStorageValue = <T>(key: string, defaultValue: T) => {
  const value = localStorage.getItem(key);
  return value === null ? defaultValue : JSON.parse(value) as T;
};

const setLocalStorageValue = <T>(key: string, value: T) => {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

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