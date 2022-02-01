import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material';

import { User } from '~/types';

type AppContextShape = {
  user?: User;
};

const AppContext = createContext({} as AppContextShape);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState();

  const value = {
    user,
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#0052cc',
          },
          secondary: {
            main: '#edf2ff',
          },
        },
      }),
    []
  );

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
export type { AppContextShape };
