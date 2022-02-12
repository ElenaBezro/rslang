import { useEffect, useState } from 'react';

// import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { ScrollToTop } from '~/components/ScrollToTop';
import { WordCard } from '~/components/WordCard';
import { PAGES_PER_GROUP_COUNT } from '~/config';
import { useApi } from '~/hooks';
import { getWords } from '~/services/api';

const SKELETON_DATA = new Array<undefined>(PAGES_PER_GROUP_COUNT).fill(undefined);

const Dictionary = () => {
  const [group] = useState(0);
  const [page] = useState(0);

  const [readWords, { isLoading, response: words }] = useApi(getWords);

  useEffect(() => {
    readWords({ group, page });
  }, [group, page, readWords]);

  return (
    <>
      <Grid container p={2} spacing={4} sx={{ overflowX: 'hidden' }}>
        {(isLoading ? SKELETON_DATA : words?.data || []).map((word, index) => (
          <Grid key={word?.id ?? index} item xs={12} sm={6} md={4} lg={3}>
            <WordCard word={word} />
          </Grid>
        ))}
      </Grid>
      <ScrollToTop />
    </>
  );
};

export { Dictionary };
