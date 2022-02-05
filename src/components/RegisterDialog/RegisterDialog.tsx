import { useTranslation } from 'react-i18next';

import { Box, Dialog, DialogContent, Link, Typography } from '@mui/material';

import { useAppContext } from '~/contexts';

import { RegisterDialogProps } from './RegisterDialog.types';
import { FormValues, RegisterForm } from './RegisterForm';

const RegisterDialog = ({ open, onClose, onRequestAuthorization }: RegisterDialogProps) => {
  const { t } = useTranslation();

  const { register, isRegistering } = useAppContext();

  const onSubmit = (values: FormValues) => register(values).then(onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h5" align="center">
          {t('REGISTER.TITLE')}
        </Typography>
        <RegisterForm onSubmit={onSubmit} loading={isRegistering} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ textTransform: 'none', mr: 1 }}>
            {t('REGISTER.AUTHENTICATE_PROMPT')}
          </Typography>
          <Link href="javascript:;" onClick={onRequestAuthorization}>
            <Typography variant="subtitle2" sx={{ textTransform: 'none' }}>
              {t('REGISTER.AUTHENTICATE')}
            </Typography>
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { RegisterDialog };
