import { useEffect, useState } from 'react';

import UpIcon from '@mui/icons-material/ArrowCircleUp';
import { IconButton, SxProps } from '@mui/material';
import { keyframes } from '@mui/system';

const RIPPLE = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
    background-color: #bbb;
  }
  5% {
    transform: scale(0.5);
    opacity: 0.5;
    background-color: #ccc;
  }
  10% {
    transform: scale(1);
    opacity: 0.5;
    background-color: #eee;
  }
  100% {
    transform: scale(2.25);
    opacity: 0;
    background-color: #ccc;
  }
`;

const STYLE_BASE: SxProps = {
  position: 'fixed',
  left: 50,
  top: 50,
  transition: 'opacity 200ms',
};

const STYLE_VISIBLE: SxProps = {
  ...STYLE_BASE,
  opacity: 1,
  ':before': {
    content: '""',
    position: 'absolute',
    width: '50%',
    height: '50%',
    animation: `${RIPPLE} 2s infinite`,
    borderRadius: '50%',
    zIndex: -1,
  },
};

const STYLE_INVISIBLE: SxProps = {
  ...STYLE_BASE,
  opacity: 0,
  pointerEvents: 'none',
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <IconButton
      sx={isVisible ? STYLE_VISIBLE : STYLE_INVISIBLE}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <UpIcon fontSize="large" />
    </IconButton>
  );
};

export { ScrollToTop };
