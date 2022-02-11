import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import NoIcon from '@mui/icons-material/Cancel';
import YesIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Button, Container, Typography } from '@mui/material';

import { GameStatistics } from '~/components/GameStatistics';
import { LevelSelect } from '~/components/LevelSelect';
import { SPRINT_GAME_LENGTH } from '~/config';
import { useGameStatistics } from '~/hooks/useGameStatistics';

import { PAGES } from '..';
import { GameState, useSprintGame } from './useSprintGame';

const Sprint = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { gameState, question, selectGroup, showNextQuestion } = useSprintGame({ gameLength: SPRINT_GAME_LENGTH });
  const { captureAnswer, statistics } = useGameStatistics();

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

  return (
    <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" align="center">
        {t('SPRINT.TITLE')}
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 300, mb: 10 }}>
        {gameState === GameState.WAITING_FOR_GROUP_SELECTION && <LevelSelect onLevelSelected={selectGroup} />}
        {gameState === GameState.RUNNING && question && (
          <>
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
          </>
        )}
        {gameState === GameState.FINISHED && (
          <>
            <GameStatistics statistics={statistics} />
            <Button variant="contained" size="large" onClick={() => navigate(PAGES.SPRINT)}>
              {t('COMMON.BUTTONS.PLAY_AGAIN')}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export { Sprint };
