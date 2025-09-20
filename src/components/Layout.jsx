

import React from 'react';
import { Box } from '@mui/material';
import ResponsiveAppBar from './home/ResponsiveAppBar';

const Layout = ({ children, ...props }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ResponsiveAppBar {...props} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;