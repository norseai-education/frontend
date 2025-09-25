import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import Layout from '../components/Layout';

/**
 * This page component handles the logout process.
 * It immediately triggers the Auth0 logout flow upon rendering.
 */
const Logout = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    // Clear any local session data you might have stored
    localStorage.removeItem('session_token');
    localStorage.removeItem('student_id');

    // Redirect to Auth0 to perform the logout.
    // The `returnTo` parameter specifies where Auth0 should redirect the user
    // back to after the logout is complete.
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin
      } 
    });
  }, [logout]);

  // This UI is a fallback, shown only for a brief moment before redirection
  // or if the logout process is delayed for any reason.
  return (
    <Layout>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, textAlign: 'center' }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Logging out...
          </Typography>
          <CircularProgress />
        </Box>
      </Container>
    </Layout>
  );
};

export default Logout;
