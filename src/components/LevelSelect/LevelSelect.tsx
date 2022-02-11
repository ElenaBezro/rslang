import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { LevelSelectProps } from '.';

const LevelSelect = ({ onLevelSelected }: LevelSelectProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');

  const onChange = useCallback(
    (e: SelectChangeEvent) => {
      const newValue = e.target.value;
      setValue(newValue);
      onLevelSelected?.(Number(newValue));
    },
    [onLevelSelected]
  );

  const label = t('LEVEL_SELECTION.SELECT_LEVEL');

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select fullWidth onChange={onChange} value={value} label={label}>
        <MenuItem value={0}>1</MenuItem>
        <MenuItem value={1}>2</MenuItem>
        <MenuItem value={2}>3</MenuItem>
        <MenuItem value={3}>4</MenuItem>
        <MenuItem value={4}>5</MenuItem>
        <MenuItem value={5}>6</MenuItem>
      </Select>
    </FormControl>
  );
};

export { LevelSelect };
