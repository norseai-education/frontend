import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import Logo from '../common/Logo';

const LoginHeader = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)'
    }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none',
          borderBottom: 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Logo />
            </Box>
            
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 'bold',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1,
              }}
            >
              NorseAI
            </Typography>

          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Render children content */}
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default LoginHeader;
