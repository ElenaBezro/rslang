import axios from 'axios';
import { LOCAL_STORAGE, SERVER_URL } from '~/config';

import { PAGES } from '~/pages';

axios.defaults.baseURL = SERVER_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  if (token) {
    config.headers ||= {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  if (error.status === 401) {
    // redirect user to home page when not signed in
    history.replaceState(undefined, '', PAGES.HOME);
  }
  throw error;
});