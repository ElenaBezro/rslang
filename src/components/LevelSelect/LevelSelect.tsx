import { Dispatch, useCallback, useEffect, useMemo, useRef } from 'react';

import { Box, Button, Stack, SxProps, Typography } from '@mui/material';

import { LevelSelectProps } from '.';
import { DROP, LEVEL_COLORS } from './LevelSelect.constants';

const Level = ({ level, onClick, isSelected }: { level: number; onClick?: Dispatch<number>; isSelected: boolean }) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const animatedElementRef = useRef<HTMLElement>(null);

  const containerSx = useMemo<SxProps>(
    () => ({
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center',
      width: 64,
      height: 64,
      borderRadius: '50%',
      cursor: onClick ? 'pointer' : 'default',
      userSelect: 'none',
      transition: 'all 300ms',
      ...(isSelected
        ? {
            animation: `${DROP} 300ms forwards`,
            bgcolor: LEVEL_COLORS[level][600],
          }
        : {
            bgcolor: LEVEL_COLORS[level][400],
          }),
      '&:hover': {
        transform: 'scale(1.15)',
        bgcolor: LEVEL_COLORS[level][600],
      },
    }),
    [level, isSelected, onClick]
  );

  const updateAnimatedElementStyles = useCallback(() => {
    if (containerRef.current && animatedElementRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      animatedElementRef.current.style.clipPath = `circle(${isSelected ? 'calc(150%)' : '0px'} at ${
        containerRect.left + containerRect.width / 4
      }px ${containerRect.top + containerRect.height / 2}px)`;

      animatedElementRef.current.style.transitionDelay = isSelected ? '300ms' : '0ms';
    }
  }, [isSelected]);

  useEffect(() => {
    if (containerRef.current && animatedElementRef.current) {
      window.addEventListener('resize', updateAnimatedElementStyles);

      return () => window.removeEventListener('resize', updateAnimatedElementStyles);
    }
  }, [updateAnimatedElementStyles]);

  useEffect(() => {
    updateAnimatedElementStyles();
  }, [updateAnimatedElementStyles]);

  const handleClick = useCallback(() => {
    onClick?.(level);
  }, [onClick, level]);

  const label = (
    <Typography
      variant="h3"
      color="white"
      lineHeight="64px"
      sx={{ transition: 'opacity 300ms', pointerEvent: isSelected ? 'none' : 'all' }}
    >
      {level + 1}
    </Typography>
  );

  return (
    <>
      <Button sx={containerSx} onClick={handleClick} ref={containerRef}>
        {label}
      </Button>
      <Box
        ref={animatedElementRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          m: '0 !important',
          transition: 'clip-path 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          pointerEvents: 'none',
          zIndex: -1,
          background: `linear-gradient(135deg, ${LEVEL_COLORS[level][700]}, ${LEVEL_COLORS[level][300]})`,
        }}
      />
    </>
  );
};

const LevelSelect = ({ selectedLevel, onLevelSelected }: LevelSelectProps) => {
  const levels = useMemo(() => [...Array(6)].map((_, index) => index), []);

  return (
    <Stack spacing={2} direction="row">
      {levels.map((level) => (
        <Level key={level} level={level} onClick={onLevelSelected} isSelected={selectedLevel === level} />
      ))}
    </Stack>
  );
};

export { LevelSelect };
