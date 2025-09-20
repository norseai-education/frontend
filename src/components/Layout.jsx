

import React from 'react';
import { Box } from '@mui/material';
<<<<<<< HEAD
import ResponsiveAppBar from './home/ResponsiveAppBar';
=======
import ResponsiveAppBar from './dashboard/ResponsiveAppBar';
>>>>>>> temp-assessment-branch

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