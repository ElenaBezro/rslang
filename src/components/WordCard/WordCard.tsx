import { Box, Typography } from '@mui/material';

import { Card3D } from '../Card3D';
import { Image } from '../Image';
import { WordCardProps } from './WordCard.types';

const WordCard = ({ word }: WordCardProps) => {
  return (
    <Card3D
      sx={{
        display: 'inline-block',
        padding: 3,
      }}
      elevation={3}
    >
      <Box display="flex" flexDirection="column">
        <Image src={word.image} width={390} height={260} />
        <Typography variant="h4" align="center" mt={2}>
          {word.word}
        </Typography>
      </Box>
    </Card3D>
  );
};

export { WordCard };
