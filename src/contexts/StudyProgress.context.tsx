import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useApi } from '~/hooks';
import { getStatistics } from '~/services/api/statistics';
import { StudyProgress } from '~/types/statistics';

type StudyProgressContextShape = StudyProgress & {
  isLoading: boolean;
};

const StudyProgressContext = createContext({} as StudyProgressContextShape);

const INTITIAL_STATE: StudyProgress = { learnedWords: 0, dailyStatistics: {} };

const StudyProgressContextProvider = ({ userId, children }: { userId?: string; children: ReactNode }) => {
  const [studyProgress, setStudyProgress] = useState<StudyProgress>(INTITIAL_STATE);

  const [loadStatistics, { isLoading }] = useApi(getStatistics);

  useEffect(() => {
    if (userId) {
      loadStatistics(userId).then((response) => {
        const { learnedWords, optional: dailyStatistics } = response.data;
        setStudyProgress({ dailyStatistics, learnedWords });
      });
    } else {
      setStudyProgress(INTITIAL_STATE);
    }
  }, [loadStatistics, userId]);

  const value: StudyProgressContextShape = useMemo(
    () => ({
      isLoading,
      ...studyProgress,
    }),
    [isLoading, studyProgress]
  );

  return <StudyProgressContext.Provider value={value}>{children}</StudyProgressContext.Provider>;
};

const useStudyProgress = () => useContext(StudyProgressContext);

export { StudyProgressContextProvider, useStudyProgress };
export type { StudyProgressContextShape };
