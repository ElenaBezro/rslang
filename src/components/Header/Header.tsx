import { useTranslation } from 'react-i18next';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';

import { AuthDialog } from '~/components/AuthDialog';
import { useBoolean } from '~/hooks/useBoolean';

const Header = () => {
  const { t } = useTranslation();

  const [isAuthDialogOpen, { on: openAuthDialog, off: closeAuthDialog }] = useBoolean();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box flex="1" />
        <Button onClick={openAuthDialog} color="inherit">
          {t('HEADER.LOGIN')}
        </Button>
      </Toolbar>
      <AuthDialog open={isAuthDialogOpen} onClose={closeAuthDialog} onRequestRegistration={closeAuthDialog} />
    </AppBar>
  );
};

export { Header };
