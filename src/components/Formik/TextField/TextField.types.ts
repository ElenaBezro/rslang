import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

type TextFieldProps<TValues, TName extends keyof TValues> = Omit<MUITextFieldProps, 'value' | 'onChange' | 'error' | 'helperText'> & {
  name: TValues[TName] extends string ? TName : never;
};

export type { TextFieldProps };
