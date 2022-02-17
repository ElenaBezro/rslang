import React from 'react';
import ReactDOM from 'react-dom';
// see https://github.com/remix-run/react-router/issues/8264#issuecomment-1032248752
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { App } from '~/App';
import '~/bootstrap';
import { BASE_URL } from '~/config';
import { history } from '~/utils/history';

import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history} basename={BASE_URL}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
