import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Skeleton, Typography } from '@mui/material';
import axios from 'axios';

import { ImageProps } from './Image.types';

const Image = ({ src, width, height, ...boxProps }: ImageProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);

  useEffect(() => {
    axios
      .get(src)
      .catch(() => {
        setIsLoadingFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [src]);

  return (
    <Box
      width={width}
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={1}
      overflow="hidden"
      {...boxProps}
    >
      {isLoading && <Skeleton variant="rectangular" width={width} height={height} />}
      {!isLoading && isLoadingFailed && <Typography variant="h3">{t('COMMON.IMAGE_NOT_FOUND')}</Typography>}
      {!isLoading && !isLoadingFailed && <img src={src} style={{ width, height }} />}
    </Box>
  );
};

export { Image };
