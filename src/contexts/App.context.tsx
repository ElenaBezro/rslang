import { ReactNode, createContext, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useSnackbar } from 'notistack';

import { LOCAL_STORAGE } from '~/config';
import { useApi, useLocalStorage } from '~/hooks';
import { createUser, signIn } from '~/services/api';
import { User } from '~/types';

type AppContextShape = {
  user?: User;
  authenticate: typeof signIn;
  register: typeof createUser;
  isAuthenticating: boolean;
  isRegistering: boolean;
};

const AppContext = createContext({} as AppContextShape);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const [user, setUser] = useLocalStorage<User | undefined>(LOCAL_STORAGE.USER, undefined);
  const [, setToken] = useLocalStorage(LOCAL_STORAGE.TOKEN, '');
  const [, setRefreshToken] = useLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, '');

  const [sendAuthRequest, { isLoading: isAuthenticating }] = useApi(signIn);

  const [sendRegisterRequest, { isLoading: isRegistering }] = useApi(createUser);

  const { enqueueSnackbar } = useSnackbar();

  const authenticate = useCallback<typeof sendAuthRequest>(
    (payload) =>
      sendAuthRequest(payload)
        .then((response) => {
          const [user, token, refreshToken] = response;
          setUser(user);
          setToken(token);
          setRefreshToken(refreshToken);
          return response;
        })
        .catch((error) => {
          enqueueSnackbar(t('ERRORS.AUTH_FAILED'));
          throw error;
        }),
    [t, enqueueSnackbar, sendAuthRequest, setRefreshToken, setToken, setUser]
  );

  const register = useCallback<typeof sendRegisterRequest>(
    (payload) =>
      sendRegisterRequest(payload)
        .then(async (response) => {
          await authenticate(payload);
          return response;
        })
        .catch((error) => {
          enqueueSnackbar(t('ERRORS.REGISTER_FAILED'));
          throw error;
        }),
    [authenticate, enqueueSnackbar, sendRegisterRequest, t]
  );

  return (
    <AppContext.Provider value={{ user, authenticate, register, isAuthenticating, isRegistering }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
export type { AppContextShape };
