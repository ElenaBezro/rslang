import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Skeleton, Typography } from '@mui/material';
import axios from 'axios';

import { SERVER_URL } from '~/config';

import { ImageProps } from './Image.types';

const Image = ({ src, width, ...boxProps }: ImageProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);

  const imageSrc = useMemo(() => `${SERVER_URL}/${src}`, [src]);

  useEffect(() => {
    axios
      .get(imageSrc)
      .catch(() => {
        setIsLoadingFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [imageSrc]);

  const computedHeight = useMemo(
    () => boxProps.height ?? width * boxProps.ratio,
    [boxProps.height, boxProps.ratio, width]
  );

  return (
    <Box display="flex" borderRadius={1} width={width} height={computedHeight} {...boxProps}>
      {isLoading && <Skeleton variant="rectangular" width={width} height={computedHeight} />}
      {!isLoading && isLoadingFailed && (
        <Typography variant="h4" textAlign="center" sx={{ wordBreak: 'break-word' }}>
          {t('COMMON.IMAGE_NOT_FOUND')}
        </Typography>
      )}
      {!isLoading && !isLoadingFailed && <img src={imageSrc} style={{ width, height: computedHeight }} />}
    </Box>
  );
};

export { Image };
