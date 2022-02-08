import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Card3D } from '../Card3D';
import { Image } from '../Image';
import { PlayAudioIconButton } from '../PlayAudioIconButton';
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
      <Box ref={boxRef} display="grid" flexDirection="column">
        <Image src={word.image} width={size.width} ratio={0.8} />
        <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" mt={1}>
          <Typography variant="h6" textTransform="capitalize">
            {word.word}
          </Typography>
          <Typography variant="h6" ml={1}>
            {word.transcription}
          </Typography>
          <PlayAudioIconButton src={word.audio} />
        </Box>
        <Typography variant="body2" mt={1} minHeight={40} textAlign="center">
          <span dangerouslySetInnerHTML={{ __html: word.textExample }} />
        </Typography>
      </Box>
    </Card3D>
  );
};

export { WordCard };
