import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';
import * as Yup from 'yup';

import { Form, Formik, TextField, ValidationSchemaBulder, useValidationSchema } from '~/components/Formik';

type FormValues = {
  email: string;
  password: string;
};

const INITIAL_VALUES: FormValues = { email: '', password: '' };

const valdiationSchemaBulder: ValidationSchemaBulder<FormValues> = (t) =>
  Yup.object().shape({
    email: Yup.string().email(t('COMMON.FORMS.INVALID_EMAIL')).required(t('COMMON.FORMS.FIELD_IS_REQUIRED')),
    password: Yup.string().required(t('COMMON.FORMS.FIELD_IS_REQUIRED')),
  });

const AuthForm = ({ onSubmit }: { onSubmit: Dispatch<FormValues> }) => {
  const { t } = useTranslation();

  const validationSchema = useValidationSchema(valdiationSchemaBulder);

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <Box
          sx={{
            marginTop: 2,
            '& .MuiTextField-root': { mb: 3 },
          }}
          display="flex"
          flexDirection="column"
        >
          <TextField<FormValues, 'email'> name="email" label={t('LOGIN_DIALOG.EMAIL')} />
          <TextField<FormValues, 'password'> name="password" label={t('LOGIN_DIALOG.PASSWORD')} type="password" />
        </Box>
        <Button type="submit" sx={{ mb: 2 }} fullWidth variant="contained">
          {t('COMMON.BUTTONS.OK')}
        </Button>
      </Form>
    </Formik>
  );
};

export { AuthForm };
export type { FormValues };
