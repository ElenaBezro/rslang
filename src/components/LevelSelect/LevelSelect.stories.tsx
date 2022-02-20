import { useCallback, useState } from 'react';

import { Container, colors } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LevelSelect } from './LevelSelect';

export default {
  title: 'Components/LevelSelect',
  component: LevelSelect,
} as ComponentMeta<typeof LevelSelect>;

const Template: ComponentStory<typeof LevelSelect> = (args) => {
  const [level, setLevel] = useState<number | undefined>();

  const onLevelSelected = useCallback((level: number) => {
    setLevel((prev) => (prev === level ? undefined : level));
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 10, display: 'flex', justifyContent: 'center', bgcolor: colors.grey[200], borderRadius: 4, p: 2 }}
    >
      <LevelSelect selectedLevel={args.selectedLevel ?? level} onLevelSelected={onLevelSelected} />
    </Container>
  );
};

export const Example = Template.bind({});
