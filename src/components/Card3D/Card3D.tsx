import { MouseEventHandler, useCallback, useMemo, useRef, useState } from 'react';

import { Box, Paper, PaperProps } from '@mui/material';

const BACKDROP_SIZE = 50;

const Card3D = ({ style, children, ...other }: PaperProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const mergedStyle = useMemo(
    () => ({
      style,
      transition: 'transform 200ms',
      transform: `perspective(300px) rotate3d(${transform.y}, ${transform.x}, 0, 5deg)`,
    }),
    [style, transform]
  );

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (boxRef.current) {
      const paperRect = boxRef.current.getBoundingClientRect();
      const xOffset = paperRect.width / 2 - e.pageX;
      const x = Math.sign(xOffset) * Math.min(1, Math.abs(xOffset) / paperRect.width / 10);

      const yOffset = paperRect.height / 2 - e.pageY;
      const y = Math.sign(yOffset) * Math.min(1, Math.abs(yOffset) / paperRect.height / 10);
      setTransform({ x, y });
    }
  }, []);

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <Paper style={mergedStyle} {...other}>
      <Box
        ref={boxRef}
        position="absolute"
        left={-BACKDROP_SIZE}
        top={-BACKDROP_SIZE}
        bottom={-BACKDROP_SIZE}
        right={-BACKDROP_SIZE}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
      {children}
    </Paper>
  );
};

export { Card3D };
