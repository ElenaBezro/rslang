import { useTranslation } from 'react-i18next';

import { Box, Dialog, DialogContent, Link, Typography } from '@mui/material';

import { useAppContext } from '~/contexts';

import { AuthDialogProps } from './AuthDialog.types';
import { AuthForm, FormValues } from './AuthForm';

const AuthDialog = ({ open, onClose, onRequestRegistration }: AuthDialogProps) => {
  const { t } = useTranslation();

  const { authenticate } = useAppContext();

  const onSubmit = (values: FormValues) => authenticate(values).then(onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h5" align="center">
          {t('LOGIN_DIALOG.TITLE')}
        </Typography>
        <AuthForm onSubmit={onSubmit} />
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
