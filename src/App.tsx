import { Stack } from '@mui/material';

import { AppRouter } from '~/components/AppRouter';
import { Header } from '~/components/Header';
import { AppContextProvider } from '~/contexts/App.context';

const App = () => (
  <main className="App">
    <AppContextProvider>
      <Header />
      <Stack sx={{ overflow: 'auto', flex: 1 }}>
        <AppRouter />
      </Stack>
    </AppContextProvider>
  </main>
);

export { App };
