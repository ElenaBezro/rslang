import { Route, Routes } from 'react-router';

import { Dictionary, Home, pages } from '~/pages';

import { RequireAuth } from './RequireAuth';

const AppRouter = () => (
  <Routes>
    <Route path={pages.HOME} element={<Home />} />
    <Route
      path={pages.DICTIONARY}
      element={
        <RequireAuth>
          <Dictionary />
        </RequireAuth>
      }
    />
  </Routes>
);

export { AppRouter };
