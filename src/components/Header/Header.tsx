import { useTranslation } from 'react-i18next';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

import { AuthDialog } from '~/components/AuthDialog';
import { useAppContext } from '~/contexts';
import { useBoolean } from '~/hooks/useBoolean';

import { RegisterDialog } from '../RegisterDialog';

const Header = () => {
  const { t } = useTranslation();

  const { user } = useAppContext();

  const [isAuthDialogOpen, { on: openAuthDialog, off: closeAuthDialog }] = useBoolean();
  const [isRegisterDialogOpen, { on: openRegisterDialog, off: closeRegisterDialog }] = useBoolean();

  const onRequestRegistration = () => {
    closeAuthDialog();
    openRegisterDialog();
  };

  const onRequestAuthorization = () => {
    closeRegisterDialog();
    openAuthDialog();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box flex="1" />
        {user ? (
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            <AccountCircle />
            <Typography>{user.name}</Typography>
          </Box>
        ) : (
          <Button onClick={openAuthDialog} color="inherit">
            {t('HEADER.LOGIN')}
          </Button>
        )}
      </Toolbar>
      <AuthDialog open={isAuthDialogOpen} onClose={closeAuthDialog} onRequestRegistration={onRequestRegistration} />
      <RegisterDialog
        open={isRegisterDialogOpen}
        onClose={closeRegisterDialog}
        onRequestAuthorization={onRequestAuthorization}
      />
    </AppBar>
  );
};

export { Header };
