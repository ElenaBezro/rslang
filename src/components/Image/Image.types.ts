import { BoxProps } from '@mui/material';

type ImageProps = Omit<BoxProps, 'width' | 'height'> & {
  src: string;
  width: number;
  height: number;
}

export type { ImageProps };