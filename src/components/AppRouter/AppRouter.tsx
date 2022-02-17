import { Route, Routes } from 'react-router';

import { QueryParamProvider } from '~/components/QueryProvider';
import { CurrentUserStudyProgressContextProvider } from '~/contexts';
import { Dictionary, Home, Logoff, PAGES, Sprint, Statistics } from '~/pages';

import { RequireAuth } from './RequireAuth';

const AppRouter = () => (
  <QueryParamProvider>
    <CurrentUserStudyProgressContextProvider>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.DICTIONARY} element={<Dictionary />} />
        <Route path={PAGES.SPRINT} element={<Sprint />} />
        <Route
          path={PAGES.STATISTICS}
          element={
            <RequireAuth>
              <Statistics />
            </RequireAuth>
          }
        />
        <Route path={PAGES.LOGOFF} element={<Logoff />} />
      </Routes>
    </CurrentUserStudyProgressContextProvider>
  </QueryParamProvider>
);

export { AppRouter };
