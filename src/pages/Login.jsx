import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: '10px',
}));

const Login = () => {
  return (
    <Layout>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledContainer maxWidth="sm">
          <Logo variant="h1">NorseAI</Logo>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Login to your account
          </Typography>
          <LoginButton />
        </StyledContainer>
      </Box>
    </Layout>
  );
};

export default Login;