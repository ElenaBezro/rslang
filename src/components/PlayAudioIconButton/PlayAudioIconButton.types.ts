import { IconButtonProps, SvgIconTypeMap } from '@mui/material';

export type PlayAudioIconButtonProps = {
  src: string;
  iconProps?: Omit<SvgIconTypeMap['props'], 'children'>;
  buttonProps?: Omit<IconButtonProps, 'onClick'>;
  onPlay?: () => void;
  onStop?: () => void;
}