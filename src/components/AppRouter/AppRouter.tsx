import { Route, Routes } from 'react-router';

import { Dictionary, Home, pages } from '~/pages';

const AppRouter = () => (
  <Routes>
    <Route path={pages.HOME} element={<Home />} />
    <Route path={pages.DICTIONARY} element={<Dictionary />} />
  </Routes>
);

export { AppRouter };
