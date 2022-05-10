import { useCallback, useState } from 'react';

const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  return [value, { toggle, on, off }] as const;
};

export { useBoolean };