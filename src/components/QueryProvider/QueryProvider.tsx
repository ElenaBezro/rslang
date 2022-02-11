import { FC, useMemo } from 'react';
import { Location, To, useLocation, useNavigate } from 'react-router';

import { QueryParamProvider as OriginalQueryParamProvider } from 'use-query-params';

const RouteAdapter: FC<{
  children: React.FunctionComponent<{
    history: {
      replace(location: Location): void;
      push(location: Location): void;
    };
    location: Location;
  }>;
}> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(location: To) {
        navigate(location, { replace: true });
      },
      push(location: To) {
        navigate(location, { replace: false });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

const QueryParamProvider: FC = ({ children }) => (
  <OriginalQueryParamProvider ReactRouterRoute={RouteAdapter as FC}>{children}</OriginalQueryParamProvider>
);

export { QueryParamProvider };
