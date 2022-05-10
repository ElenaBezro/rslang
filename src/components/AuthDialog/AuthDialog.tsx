import { useTranslation } from 'react-i18next';

import { Box, Dialog, DialogContent, Link, Typography } from '@mui/material';

import { useAppContext } from '~/contexts';

import { AuthDialogProps } from './AuthDialog.types';
import { AuthForm, FormValues } from './AuthForm';

const AuthDialog = ({ open, onClose, onRequestRegistration }: AuthDialogProps) => {
  const { t } = useTranslation();

  const { authenticate, isAuthenticating } = useAppContext();

  const onSubmit = (values: FormValues) => authenticate(values).then(onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h5" align="center">
          {t('AUTH.TITLE')}
        </Typography>
        <AuthForm onSubmit={onSubmit} loading={isAuthenticating} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ textTransform: 'none', mr: 1 }}>
            {t('AUTH.REGISTER_PROMPT')}
          </Typography>
          <Link onClick={onRequestRegistration} sx={{ cursor: 'pointer' }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'none' }}>
              {t('AUTH.REGISTER')}
            </Typography>
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { AuthDialog };
