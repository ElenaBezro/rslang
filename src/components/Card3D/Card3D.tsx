import { MouseEventHandler, useCallback, useMemo, useRef, useState } from 'react';

import { Box, Paper } from '@mui/material';

import { Card3DProps } from './Card3D.types';

const DEFAULT_BACKDROP_SIZE = 30;

const Card3D = ({ style, children, backdropSize = DEFAULT_BACKDROP_SIZE, ...other }: Card3DProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const mergedStyle = useMemo(
    () => ({
      style,
      transition: 'transform 200ms',
      transform: `perspective(400px) rotate3d(${transform.y}, ${transform.x}, 0, 3deg)`,
    }),
    [style, transform]
  );

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (boxRef.current) {
      const paperRect = boxRef.current.getBoundingClientRect();
      const xOffset = paperRect.left + paperRect.width / 2 - e.clientX;
      const x = -Math.sign(xOffset) * Math.min(1, Math.abs(xOffset) / paperRect.width / 10);

      const yOffset = paperRect.top + paperRect.height / 2 - e.clientY;
      const y = Math.sign(yOffset) * Math.min(1, Math.abs(yOffset) / paperRect.height / 10);
      setTransform({ x, y });
    }
  }, []);

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <Paper style={mergedStyle} {...other} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Box
        ref={boxRef}
        position="absolute"
        left={-backdropSize}
        top={-backdropSize}
        bottom={-backdropSize}
        right={-backdropSize}
        zIndex={-1}
      />
      {children}
    </Paper>
  );
};

export { Card3D };
