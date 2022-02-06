import { useEffect, useState } from 'react';

// import { useTranslation } from 'react-i18next';
import { CircularProgress, Grid } from '@mui/material';

import { WordCard } from '~/components/WordCard';
import { useApi } from '~/hooks';
import { getWords } from '~/services/api';

const Dictionary = () => {
  const [group] = useState(0);
  const [page] = useState(0);

  const [readWords, { isLoading, response: words }] = useApi(getWords);

  useEffect(() => {
    readWords({ group, page });
  }, [group, page, readWords]);

  return (
    <Grid container p={2} spacing={4} overflow="hidden">
      {words?.data.map((word) => (
        <Grid key={word.id} item xs={12} sm={6} md={4} lg={3}>
          <WordCard word={word} />
        </Grid>
      ))}
      {isLoading && <CircularProgress />}
    </Grid>
  );
};

export { Dictionary };
