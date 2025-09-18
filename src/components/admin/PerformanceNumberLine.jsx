import React from 'react';
import { Box, Typography } from '@mui/material';

const PerformanceNumberLine = ({ performance }) => {
  const score = parseInt(performance, 10) || 0;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="body1" gutterBottom>
        <strong>Overall Performance:</strong> {score}/100
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', height: '40px', mt: 2 }}>
        {/* Line */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'grey.700',
          transform: 'translateY(-50%)',
          borderRadius: '2px',
        }} />

        {/* Marker */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: `${score}%`,
          width: '16px',
          height: '16px',
          backgroundColor: 'primary.main',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid white',
        }} />

        {/* Labels */}
        <Box sx={{
          position: 'absolute',
          top: 'calc(50% + 15px)',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography variant="caption">0</Typography>
          <Typography variant="caption">50</Typography>
          <Typography variant="caption">100</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceNumberLine;
