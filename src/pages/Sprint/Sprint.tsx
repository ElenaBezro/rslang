import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import NoIcon from '@mui/icons-material/Cancel';
import YesIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Button, Container, Paper, Stack, Typography, colors } from '@mui/material';

import { GameStatistics } from '~/components/GameStatistics';
import { LevelSelect } from '~/components/LevelSelect';
import { SPRINT_GAME_LENGTH } from '~/config';
import { useGameStatistics } from '~/hooks/useGameStatistics';

import { PAGES } from '..';
import { GameState, useSprintGame } from './useSprintGame';

const Sprint = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { gameState, question, group, selectGroup, showNextQuestion } = useSprintGame({
    gameLength: SPRINT_GAME_LENGTH,
  });

  const { captureAnswer, statistics, resetStatistics } = useGameStatistics();

  const onLevelSelected = useCallback(
    (level: number) => {
      resetStatistics();
      selectGroup(level);
    },
    [resetStatistics, selectGroup]
  );

  const answerQuestion = useCallback(
    (answer: boolean) => {
      if (!question) {
        return;
      }

      const isCorrect = answer === question?.isSuggestedTranslationCorrect;
      captureAnswer(question.word, isCorrect);
      showNextQuestion();
    },
    [captureAnswer, question, showNextQuestion]
  );

  const showlevelSelect = gameState === GameState.WAITING_FOR_GROUP_SELECTION;

  return (
    <Stack
      flex="1"
      justifyContent="center"
      alignItems="center"
      pt={3}
      pb={3}
      sx={{
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          bgcolor: colors.grey[300],
        },
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          width: 500,
          height: 96,
          top: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          pointerEvents: showlevelSelect ? 'all' : 'none',
          zIndex: showlevelSelect ? 0 : -1,
        }}
      >
        <LevelSelect onLevelSelected={onLevelSelected} selectedLevel={group} />
      </Paper>
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        {gameState === GameState.RUNNING && question && (
          <Paper sx={(theme) => ({ minWidth: 448, p: 3, bgcolor: theme.palette.background.paper })}>
            <Typography variant="h3" align="center" sx={{ ':first-letter': { textTransform: 'capitalize' } }}>
              {question.word.word}
            </Typography>
            <Typography variant="h4" align="center" sx={{ mt: 2, ':first-letter': { textTransform: 'capitalize' } }}>
              {question.suggestedTranslation}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                startIcon={<NoIcon />}
                onClick={() => answerQuestion(false)}
                color="error"
                size="large"
                variant="outlined"
              >
                <Typography variant="h6">{t('COMMON.BUTTONS.NO')}</Typography>
              </Button>
              <Button
                startIcon={<YesIcon />}
                onClick={() => answerQuestion(true)}
                color="success"
                size="large"
                variant="outlined"
                sx={{ ml: 1 }}
              >
                <Typography variant="h6">{t('COMMON.BUTTONS.YES')}</Typography>
              </Button>
            </Box>
          </Paper>
        )}
        {gameState === GameState.FINISHED && (
          <>
            <GameStatistics statistics={statistics} />
            <Button variant="contained" size="large" onClick={() => navigate(PAGES.SPRINT)}>
              {t('COMMON.BUTTONS.PLAY_AGAIN')}
            </Button>
          </>
        )}
      </Container>
    </Stack>
  );
};

export { Sprint };
