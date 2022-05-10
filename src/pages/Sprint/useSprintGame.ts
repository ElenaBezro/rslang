import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';
import { GROUP_COUNT } from '~/config';
import { useApi } from '~/hooks';
import { getWords } from '~/services/api';
import { Word } from '~/types';
import { getRandomElement, shuffle } from '~/utils/array';

enum GameState {
  IDLE, WAITING_FOR_GROUP_SELECTION, LOADING, RUNNING, FINISHED
}

const isValidGroupNumber = (group: number | undefined | null): group is number => group !== undefined && group !== null && group >= 0 && group <= GROUP_COUNT;

const useSprintGame = ({ gameLength = 30 }: { gameLength?: number } = {}) => {
  const [group, setGroup] = useQueryParam('group', NumberParam);
  const [page] = useQueryParam('page', NumberParam);

  const [readWords] = useApi(getWords);
  const [words, setWords] = useState<Word[]>([]);

  const [gameState, setGameState] = useState(GameState.IDLE);
  const [questionIndex, setQuestionIndex] = useState(0);

  const question = useMemo(() => {
    const word = words[questionIndex];
    if (!word) {
      return undefined;
    }

    const isUsingRandomWord = Math.random() > 0.5;
    const suggestedWord = isUsingRandomWord ? getRandomElement(words, word)?.value ?? word : word;
    const isSuggestedTranslationCorrect = suggestedWord === word;

    return {
      word,
      suggestedTranslation: suggestedWord.wordTranslate,
      isSuggestedTranslationCorrect
    };

  }, [questionIndex, words]);

  const timeoutRef = useRef<NodeJS.Timeout>();


  const showNextQuestion = useCallback(() => {
    if (gameState === GameState.RUNNING && question) {
      const isLastQuestion = questionIndex === words.length - 1;
      if (isLastQuestion) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = undefined;
        }
        setGameState(GameState.FINISHED);
      } else {
        setQuestionIndex(v => v + 1);
      }
    }
  }, [gameState, words, question, questionIndex]);

  const startGame = useCallback(() => {
    if (isValidGroupNumber(group) && gameState !== GameState.LOADING && gameState !== GameState.RUNNING) {
      setGameState(GameState.LOADING);

      readWords({ group, page }).then(response => {
        if (response.status !== 200) {
          // TODO: use error boundary and error handler
          throw new Error('Oops, something went wrong');
        }
        const groupWords = response.data.filter(word => word.group === group);
        // TODO: read other pages if less than 20 words
        shuffle(groupWords);
        setWords(groupWords);
        setQuestionIndex(0);
        setGameState(GameState.RUNNING);

        timeoutRef.current = setTimeout(() => {
          setGameState(GameState.FINISHED);
        }, gameLength * 1000);
      });

    }
  }, [group, page, gameState, gameLength, readWords]);

  useEffect(() => {
    if (group === undefined || group === null || group < 0 || group > GROUP_COUNT) {
      if (gameState !== GameState.WAITING_FOR_GROUP_SELECTION) {
        setGameState(GameState.WAITING_FOR_GROUP_SELECTION);
      }
    } else if (gameState === GameState.WAITING_FOR_GROUP_SELECTION || gameState === GameState.IDLE) {
      startGame();
    }
  }, [gameState, group, startGame]);

  return { gameState, question, selectGroup: setGroup, showNextQuestion };

};

export { useSprintGame, GameState };