import MUITextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import { TextFieldProps } from '.';

const TextField = <TValues, TName extends keyof TValues>(props: TextFieldProps<TValues, TName>) => {
  const { name } = props;

  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<TValues>();

  return (
    <MUITextField
      {...props}
      value={values[name]}
      error={!!errors[name]}
      helperText={touched[name] && errors[name]}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { TextField };
