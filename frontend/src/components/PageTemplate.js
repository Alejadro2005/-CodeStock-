import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PageTemplate = ({ title, children }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Paper sx={{ p: 3 }}>
        {children}
      </Paper>
    </Box>
  );
};

export default PageTemplate; 