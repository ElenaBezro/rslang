import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Word } from '~/types';

import { WordCard } from './WordCard';

export default {
  title: 'Components/WordCard',
  component: WordCard,
} as ComponentMeta<typeof WordCard>;

const Template: ComponentStory<typeof WordCard> = (args) => <WordCard {...args} />;

const boat: Word = {
  id: '5e9f5ee35eb9e72bc21af4a2',
  group: 0,
  page: 0,
  word: 'boat',
  image: 'http://localhost:5000/files/01_0005.jpg',
  audio: 'http://localhost:5000/files/01_0005.mp3',
  audioMeaning: 'files/01_0005_meaning.mp3',
  audioExample: 'files/01_0005_example.mp3',
  textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
  textExample: 'There is a small <b>boat</b> on the lake.',
  transcription: '[bout]',
  textExampleTranslate: 'На озере есть маленькая лодка',
  textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
  wordTranslate: 'лодка',
};

export const Boat = Template.bind({});
Boat.args = {
  word: boat,
};
