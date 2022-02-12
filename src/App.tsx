import { Box } from '@mui/material';

import { AppRouter } from '~/components/AppRouter';
import { Header } from '~/components/Header';
import { AppContextProvider } from '~/contexts/App.context';

const App = () => (
  <main className="App">
    <AppContextProvider>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', flex: 1 }}>
        <AppRouter />
      </Box>
    </AppContextProvider>
  </main>
);

export { App };
