import { useCallback, useReducer } from 'react';
import { Word } from '~/types';

type GameStatistics = {
  correctWords: Word[];
  incorrectWords: Word[];
  correctAnswersInARow: number;
}

type Action = { type: 'captureCorrectWord' | 'captureIncorrectWord', word: Word } | { type: 'reset' };

const initialState: GameStatistics = {
  correctAnswersInARow: 0,
  correctWords: [],
  incorrectWords: []
};

const reducer = (previousState: GameStatistics, action: Action): GameStatistics => {
  switch (action.type) {
    case 'captureCorrectWord':
      return {
        ...previousState,
        correctAnswersInARow: previousState.correctAnswersInARow + 1,
        correctWords: [...previousState.correctWords, action.word]
      };

    case 'captureIncorrectWord':
      return {
        ...previousState,
        correctAnswersInARow: 0,
        incorrectWords: [...previousState.incorrectWords, action.word]
      };

    case 'reset':
      return initialState;
  }
};

const useGameStatistics = () => {
  const [statistics, dispatch] = useReducer(reducer, initialState);

  const captureAnswer = useCallback((word: Word, isCorrect: boolean) => {
    dispatch({ type: isCorrect ? 'captureCorrectWord' : 'captureIncorrectWord', word });
  }, []);

  const resetStatistics = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  return { statistics, captureAnswer, resetStatistics };
};

export type { GameStatistics };
export { useGameStatistics };