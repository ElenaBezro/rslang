import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import { Word } from '~/types';

import { GameStatisticsProps } from '.';
import { PlayAudioIconButton } from '../PlayAudioIconButton';

const WordSummary = ({ word }: { word: Word }) => (
  <Grid item sx={{ display: 'flex', alignItems: 'center' }} md={4} sm={6} xs={12}>
    <PlayAudioIconButton src={word.audio} />
    <Typography variant="h6">
      {word.word} - {word.wordTranslate}
    </Typography>
  </Grid>
);

const WordsBlock = ({ words, title, color }: { words: Word[]; title: string; color: string }) => (
  <Box
    sx={{
      borderColor: color,
      borderRadius: 2,
      borderWidth: 1,
      borderStyle: 'solid',
      overflow: 'hidden',
      mb: 2,
    }}
  >
    <Typography
      variant="h4"
      align="center"
      sx={(theme) => ({
        backgroundColor: color,
        color: theme.palette.secondary.light,
      })}
    >
      {title}
    </Typography>
    <Grid container sx={{ mb: 2 }}>
      {words.map((word) => (
        <WordSummary key={word.id} word={word} />
      ))}
    </Grid>
  </Box>
);

const GameStatistics = ({ statistics: { correctWords, incorrectWords } }: GameStatisticsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box>
      {correctWords.length > 0 && (
        <WordsBlock
          words={correctWords}
          title={t('GAME_STATISTICS.CORRECT_WORDS')}
          color={theme.palette.success.main}
        />
      )}

      {incorrectWords.length > 0 && (
        <WordsBlock
          words={incorrectWords}
          title={t('GAME_STATISTICS.INCORRECT_WORDS')}
          color={theme.palette.error.main}
        />
      )}
    </Box>
  );
};

export { GameStatistics };
