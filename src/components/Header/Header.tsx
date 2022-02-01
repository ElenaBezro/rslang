import { useTranslation } from 'react-i18next';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

const Header = () => {
  const { t } = useTranslation();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Button color="inherit">{t('HEADER.LOGIN')}</Button>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
