import axios from 'axios';

import { pages } from '~/pages/home';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL as string;

axios.interceptors.response.use(undefined, (error) => {
  if (error.status === 401) {
    // redirect user to home page when not signed in
    history.replaceState(undefined, '', pages.HOME);
  }
});