import { Route, Routes } from 'react-router';

import '~/bootstrap';
import { Header } from '~/components/Header';
import { Home, pages } from '~/pages/home';

import { AppContextProvider } from './App.context';

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
