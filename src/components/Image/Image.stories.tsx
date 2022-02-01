import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Image } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  width: 320,
  height: 200,
  src: 'http://localhost:5000/files/01_0001.jpg',
};
