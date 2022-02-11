import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { Word } from '~/types';

import { GameStatisticsProps } from '.';
import { PlayAudioIconButton } from '../PlayAudioIconButton';

const WordSummary = ({ word }: { word: Word }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <PlayAudioIconButton src={word.audio} />
    <Typography variant="h6">
      {word.word} - {word.wordTranslate}
    </Typography>
  </Box>
);

const GameStatistics = ({ statistics: { correctWords, incorrectWords } }: GameStatisticsProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4">{t('GAME_STATISTICS.CORRECT_WORDS')}</Typography>
      {correctWords.map((word) => (
        <WordSummary key={word.id} word={word} />
      ))}

      <Typography variant="h4">{t('GAME_STATISTICS.INCORRECT_WORDS')}</Typography>
      {incorrectWords.map((word) => (
        <WordSummary key={word.id} word={word} />
      ))}
    </Box>
  );
};

export { GameStatistics };
