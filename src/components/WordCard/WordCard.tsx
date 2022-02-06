import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Card3D } from '../Card3D';
import { Image } from '../Image';
import { WordCardProps } from './WordCard.types';

const WordCard = ({ word }: WordCardProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setsize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { clientWidth: width, clientHeight: height } = boxRef.current;
      setsize({ width, height });
    }
  }, []);

  useEffect(() => {
    const resizeListener = () => {
      if (boxRef.current) {
        const { clientWidth: width, clientHeight: height } = boxRef.current;
        setsize({ width, height });
      }
    };

    resizeListener();

    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return (
    <Card3D sx={{ padding: 2 }} elevation={3}>
      <Box ref={boxRef} display="flex" flexDirection="column">
        <Image src={word.image} width={size.width} ratio={0.8} />
        <Typography variant="subtitle1" align="center" mt={1}>
          {word.word}
        </Typography>
        <Typography variant="subtitle2" align="center">
          {word.transcription}
        </Typography>
        <Typography variant="body2" mt={1} minHeight={40} textAlign="center">
          <span dangerouslySetInnerHTML={{ __html: word.textExample }} />
        </Typography>
      </Box>
    </Card3D>
  );
};

export { WordCard };
