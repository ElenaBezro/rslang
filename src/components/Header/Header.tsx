import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

import { AuthDialog } from '~/components/AuthDialog';
import { useAppContext } from '~/contexts';
import { useBoolean } from '~/hooks/useBoolean';
import { PAGES } from '~/pages';

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
    <AppBar position="static" sx={{ zIndex: 1000 }}>
      <Toolbar>
        <IconButton size="large" color="inherit" component={Link} to={PAGES.HOME} sx={{ mr: 2 }}>
          <HomeIcon />
        </IconButton>
        <Button component={Link} to={PAGES.DICTIONARY} color="inherit">
          {t('HEADER.DICTIONARY')}
        </Button>
        <Button component={Link} to={PAGES.SPRINT} color="inherit">
          {t('HEADER.SPRINT')}
        </Button>
        {user && (
          <Button component={Link} to={PAGES.STATISTICS} color="inherit">
            {t('HEADER.STATISTICS')}
          </Button>
        )}
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
