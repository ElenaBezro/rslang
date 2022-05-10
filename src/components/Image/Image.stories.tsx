import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Image } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Example = Template.bind({});
Example.args = {
  width: 320,
  height: 200,
  src: 'files/01_0001.jpg',
};

export const ImageNotFound = Template.bind({});
ImageNotFound.args = {
  width: 320,
  height: 200,
  src: 'dummy.jpg',
};
