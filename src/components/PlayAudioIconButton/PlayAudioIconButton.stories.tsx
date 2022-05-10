import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PlayAudioIconButton } from './PlayAudioIconButton';

export default {
  title: 'Components/PlayAudioIconButton',
  component: PlayAudioIconButton,
} as ComponentMeta<typeof PlayAudioIconButton>;

const Template: ComponentStory<typeof PlayAudioIconButton> = (args) => <PlayAudioIconButton {...args} />;

export const IAteEggsForBreakfast = Template.bind({});
IAteEggsForBreakfast.args = {
  src: 'files/01_0006_example.mp3',
};
