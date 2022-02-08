import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import PlayIcon from '@mui/icons-material/PlayCircleRounded';
import StopIcon from '@mui/icons-material/StopCircleRounded';
import { IconButton, Tooltip } from '@mui/material';

import { SERVER_URL } from '~/config';
import { useBoolean } from '~/hooks';

import { PlayAudioIconButtonProps } from './PlayAudioIconButton.types';

const PlayAudioIconButton = ({ src, onPlay, onStop, iconProps, buttonProps }: PlayAudioIconButtonProps) => {
  const { t } = useTranslation();

  const [isPlaying, { on, off }] = useBoolean(false);

  const audio = useMemo(() => new Audio(`${SERVER_URL}/${src}`), [src]);

  const playAudio = useCallback(() => {
    audio.play();
    on();
    onPlay?.();
  }, [audio, on, onPlay]);

  const stopAudio = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.dispatchEvent(new Event('ended'));
  }, [audio]);

  useEffect(() => {
    const onEnded = () => {
      off();
      onStop?.();
    };

    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, [audio, off, onStop]);

  const onClick = isPlaying ? stopAudio : playAudio;
  const title = t(isPlaying ? 'COMMON.BUTTONS.STOP' : 'COMMON.BUTTONS.PLAY');
  const Icon = isPlaying ? StopIcon : PlayIcon;

  return (
    <IconButton {...buttonProps} onClick={onClick}>
      <Tooltip title={title}>
        <Icon fontSize="large" {...iconProps} />
      </Tooltip>
    </IconButton>
  );
};

export { PlayAudioIconButton };
