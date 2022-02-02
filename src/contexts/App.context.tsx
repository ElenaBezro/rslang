import { ReactNode, createContext, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useSnackbar } from 'notistack';

import { useApi } from '~/hooks';
import { signIn } from '~/services/api';
import { User } from '~/types';

type AppContextShape = {
  user?: User;
  authenticate: typeof signIn;
  isAuthenticating: boolean;
};

const AppContext = createContext({} as AppContextShape);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const [authenticate, { isLoading: isAuthenticating, response: user }] = useApi(signIn);

  const { enqueueSnackbar } = useSnackbar();

  const doAuth = useCallback<typeof authenticate>(
    (payload) =>
      authenticate(payload).catch((error) => {
        enqueueSnackbar(t('ERRORS.AUTH_FAILED'));
        throw error;
      }),
    [t, authenticate, enqueueSnackbar]
  );

  return <AppContext.Provider value={{ user, authenticate: doAuth, isAuthenticating }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
export type { AppContextShape };
