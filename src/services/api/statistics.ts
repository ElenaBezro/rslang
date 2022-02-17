import axios from 'axios';
import { User } from '~/types';
import { StudyProgress } from '~/types/statistics';

type StatisticsAPIObject = {
  learnedWords: StudyProgress['learnedWords'];
  optional: StudyProgress['dailyStatistics'];
}

const getStatistics = (userId: User['id']) => axios.get<StatisticsAPIObject>(`/users/${userId}/statistics`);

const updateStatistics = (userId: User['id'], studyProgress: StudyProgress) => axios.put(`/users/${userId}/statistics`, {
  learnedWords: studyProgress.learnedWords,
  optional: studyProgress.dailyStatistics
});

export { getStatistics, updateStatistics };