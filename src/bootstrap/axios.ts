import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { LOCAL_STORAGE, SERVER_URL } from '~/config';
import { PAGES } from '~/pages';
import { User } from '~/types';
import { history } from '~/utils/history';
import { getLocalStorageValue, setLocalStorageValue } from '~/utils/localStorage';

axios.defaults.baseURL = SERVER_URL;

const withAuthorization = <T>(
  config: AxiosRequestConfig<T>,
  { isRefresh = false, force = false }: { isRefresh?: boolean; force?: boolean } = {}
) => {
  config.headers ||= {};
  if (force || !config.headers.Authorization) {
    const token = getLocalStorageValue(isRefresh ? LOCAL_STORAGE.REFRESH_TOKEN : LOCAL_STORAGE.TOKEN, null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

const redirectToLogoffPage = () => history.replace(PAGES.LOGOFF);

axios.interceptors.request.use((config) => withAuthorization(config));

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error?.isAxiosError && error.response?.status === 401) {
    const user = getLocalStorageValue<User | undefined>(LOCAL_STORAGE.USER, undefined);
    if (user?.id) {
      const refreshTokenURL = `/users/${user.id}/tokens`;
      const originalRequest = error.response.config;
      if (originalRequest.url !== refreshTokenURL) {
        return axios.get(refreshTokenURL, withAuthorization({}, { isRefresh: true })).then((refreshTokenResponse) => {
          const { token, refreshToken } = refreshTokenResponse.data ?? {};
          if (token && refreshToken) {
            setLocalStorageValue(LOCAL_STORAGE.TOKEN, token);
            setLocalStorageValue(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
            // retry original request with a new token
            return axios(withAuthorization(originalRequest, { force: true }));
          }

          redirectToLogoffPage();
          return Promise.reject(error);
        });
      }
    }

    redirectToLogoffPage();
  }

  return Promise.reject(error);
});
