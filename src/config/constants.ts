const SNACKBAR_AUTOHIDE_DURATION = 5000;

const LOCAL_STORAGE = {
  USER: 'rs-lang-user',
  TOKEN: 'rs-lang-token',
  REFRESH_TOKEN: 'rs-lang-refresh-token',
};

const GROUP_COUNT = 6;
const PAGES_PER_GROUP_COUNT = 20;

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export { SNACKBAR_AUTOHIDE_DURATION, LOCAL_STORAGE, GROUP_COUNT, PAGES_PER_GROUP_COUNT, SERVER_URL };