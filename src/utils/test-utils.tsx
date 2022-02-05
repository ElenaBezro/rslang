import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';
import { RenderOptions, render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';

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

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const Providers: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
