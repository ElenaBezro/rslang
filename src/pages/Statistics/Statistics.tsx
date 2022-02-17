import { Container } from '@mui/material';

import { useStudyProgress } from '~/contexts';

const Statistics = () => {
  const { learnedWords } = useStudyProgress();

  return <Container>{learnedWords}</Container>;
};

export { Statistics };
