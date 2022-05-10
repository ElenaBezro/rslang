import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';

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
        {word ? (
          <Image src={word.image} width={size.width} height={size.width * 0.8} />
        ) : (
          <Skeleton variant="rectangular" width={size.width} height={size.width * 0.8} />
        )}
        <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" mt={1}>
          {word ? (
            <Typography variant="h6" textTransform="capitalize">
              {word.word}
            </Typography>
          ) : (
            <Skeleton width={50} sx={{ mr: 1, fontSize: '1.25rem' }} />
          )}
          {word ? (
            <Typography variant="h6" ml={1}>
              {word?.transcription}
            </Typography>
          ) : (
            <Skeleton width={60} sx={{ mr: 1, fontSize: '1.25rem' }} />
          )}
          {word ? (
            <PlayAudioIconButton src={word.audio} />
          ) : (
            <Skeleton sx={{ m: 1 }} variant="circular" width={30} height={30} />
          )}
        </Box>
        {word ? (
          <Typography variant="body2" mt={1} minHeight={40} textAlign="center">
            <span dangerouslySetInnerHTML={{ __html: word.textExample }} />
          </Typography>
        ) : (
          <Skeleton variant="text" sx={{ mt: 1 }} />
        )}
      </Box>
    </Card3D>
  );
};

export { WordCard };
