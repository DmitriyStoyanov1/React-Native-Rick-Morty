import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export const CardSkeleton = () => (
  <Box>
    <Skeleton variant="rect" height={160} />
    <Box pt={0.5}>
      <Skeleton />
      <Skeleton width="60%" />
    </Box>
  </Box>
);
