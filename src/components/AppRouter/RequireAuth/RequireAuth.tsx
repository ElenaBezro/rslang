import { Navigate } from 'react-router-dom';

import { useAppContext } from '~/contexts';
import { pages } from '~/pages';

import { RequireAuthProps } from './RequireAuth.types';

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to={pages.HOME} />;
  }
  return children;
};

export { RequireAuth };
