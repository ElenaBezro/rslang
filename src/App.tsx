import { Route, Routes } from 'react-router';

import { Header } from '~/components/Header';
import { AppContextProvider } from '~/contexts/App.context';
import { Home, pages } from '~/pages/home';

const App = () => (
  <main className="App">
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path={pages.HOME} element={<Home />} />
      </Routes>
    </AppContextProvider>
  </main>
);

export { App };
