import axios from 'axios';

import { Word } from '~/types';

const getWords = (params: { group: number; page: number }) => axios.get<Word[]>('/words', { params });

export { getWords };