import { keyframes } from '@mui/system';
import { colors } from '@mui/material';

// TODO: pick better colors
const LEVEL_COLORS = [colors.blue, colors.indigo, colors.deepPurple, colors.pink, colors.red, colors.deepOrange];

const DROP = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1.15);
  }
`;

export { LEVEL_COLORS, DROP };
