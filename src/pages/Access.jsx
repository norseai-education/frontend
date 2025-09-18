import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import Loading from './Loading';
import LoginButton from '../components/LoginButton';
import { Container, Typography, Box } from '@mui/material';

const Access = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            You must be signed in to access this page.
          </Typography>
          <LoginButton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Welcome, {user?.name || user?.nickname || user?.email}!
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          You have successfully logged in and landed on the Access page.
        </Typography>
        <Typography variant="body1">
          This page is protected and only visible to authenticated users.
        </Typography>
      </Container>
    </Layout>
  );
};

export default Access;
