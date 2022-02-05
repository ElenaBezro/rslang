import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '~/contexts';
import { pages } from '~/pages/home';

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to={pages.HOME} />;
};

export { ProtectedPage };
