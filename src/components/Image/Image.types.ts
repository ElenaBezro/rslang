import { BoxProps } from '@mui/material';

type ImageProps = Omit<BoxProps, 'width' | 'height'> & {
  src: string;
  width: number;
} & (
    | { height: number; ratio?: never }
    | { height?: never; ratio: number }
  )

export type { ImageProps };