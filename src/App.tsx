import { AppRouter } from '~/components/AppRouter';
import { Header } from '~/components/Header';
import { AppContextProvider } from '~/contexts/App.context';

const App = () => (
  <main className="App">
    <AppContextProvider>
      <Header />
      <AppRouter />
    </AppContextProvider>
  </main>
);

export { App };
