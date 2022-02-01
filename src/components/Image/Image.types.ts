import { BoxProps } from '@mui/material';

type ImageProps = BoxProps & {
  src: string;
  width: number;
  height: number;
}

export type { ImageProps };