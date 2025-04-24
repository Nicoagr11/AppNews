import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const Spinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <CircularProgress />
  </Box>
);
