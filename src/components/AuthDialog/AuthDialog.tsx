import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Dialog, DialogContent, Link, TextField, Typography } from '@mui/material';

import { useAppContext } from '~/contexts';

import { AuthDialogProps } from './AuthDialog.types';

const AuthDialog = ({ open, onClose, onRequestRegistration }: AuthDialogProps) => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>();

  const [isFormValid, setIsFormValid] = useState(false);
  const { authenticate } = useAppContext();

  const onChange = useCallback(() => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
    }
  }, []);

  const submitForm = useCallback(() => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      if (email && password) {
        authenticate({ email, password }).then(onClose);
      }
    }
  }, [authenticate, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h5" align="center">
          {t('LOGIN_DIALOG.TITLE')}
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            marginTop: 2,
            '& .MuiTextField-root': { mb: 3 },
          }}
          display="flex"
          flexDirection="column"
          ref={formRef}
          onChange={onChange}
        >
          <TextField name="email" label={t('LOGIN_DIALOG.EMAIL')} required />
          <TextField name="password" label={t('LOGIN_DIALOG.PASSWORD')} type="password" required />
        </Box>
        <Button sx={{ mb: 2 }} fullWidth variant="contained" disabled={!isFormValid} onClick={submitForm}>
          {t('COMMON.BUTTONS.OK')}
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ textTransform: 'none', mr: 1 }}>
            {t('LOGIN_DIALOG.REGISTER_PROMPT')}
          </Typography>
          <Link href="javascript:;" onClick={onRequestRegistration}>
            <Typography variant="subtitle2" sx={{ textTransform: 'none' }}>
              {t('LOGIN_DIALOG.REGISTER')}
            </Typography>
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { AuthDialog };
