
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../components/Layout';
import SignupButton from '../components/SignupButton';

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

const Signup = () => {
  return (
    <Layout>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledContainer>
          <Logo variant="h1">NorseAI</Logo>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Create your account
          </Typography>
          <SignupButton />
        </StyledContainer>
      </Box>
    </Layout>
  );
};

export default Signup;