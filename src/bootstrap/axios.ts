import axios from 'axios';
import { LOCAL_STORAGE } from '~/config';

import { pages } from '~/pages/home';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL as string;

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
    history.replaceState(undefined, '', pages.HOME);
  }
  throw error;
});