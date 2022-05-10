import { ReactNode } from 'react';

import { useAppContext } from '.';
import { StudyProgressContextProvider } from './StudyProgress.context';

const CurrentUserStudyProgressContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext();

  return <StudyProgressContextProvider userId={user?.id}>{children}</StudyProgressContextProvider>;
};

export { CurrentUserStudyProgressContextProvider };
