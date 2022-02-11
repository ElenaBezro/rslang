import { Route, Routes } from 'react-router';

import { QueryParamProvider } from '~/components/QueryProvider';
import { Dictionary, Home, PAGES, Sprint } from '~/pages';

const AppRouter = () => (
  <QueryParamProvider>
    <Routes>
      <Route path={PAGES.HOME} element={<Home />} />
      <Route path={PAGES.DICTIONARY} element={<Dictionary />} />
      <Route path={PAGES.SPRINT} element={<Sprint />} />
    </Routes>
  </QueryParamProvider>
);

export { AppRouter };
