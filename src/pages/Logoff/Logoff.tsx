import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Container } from '@mui/material';

import { useAppContext } from '~/contexts';

import { PAGES } from '..';

const Logoff = () => {
  const navigate = useNavigate();
  const { logoff } = useAppContext();

  useEffect(() => {
    logoff();
    navigate(PAGES.HOME);
  }, [logoff, navigate]);

  return <Container>:(</Container>;
};

export { Logoff };
