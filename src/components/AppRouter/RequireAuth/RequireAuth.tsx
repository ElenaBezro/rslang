import { Navigate } from 'react-router-dom';

import { useAppContext } from '~/contexts';
import { PAGES } from '~/pages';

import { RequireAuthProps } from './RequireAuth.types';

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to={PAGES.HOME} />;
  }
  return children;
};

export { RequireAuth };
