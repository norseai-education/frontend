import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, CircularProgress } from '@mui/material';
<<<<<<< HEAD
import Layout from '../components/Layout';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session data
    localStorage.removeItem('session_token');
    localStorage.removeItem('student_id');

    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Logging you out...
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Thank you for using NorseAI!
          </Typography>
          <CircularProgress />
        </Paper>
      </Container>
    </Layout>
=======
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        // Redirect to home page after logout
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if logout fails
        navigate('/', { replace: true });
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Logging you out...
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Thank you for using NorseAI!
        </Typography>
        <CircularProgress />
      </Paper>
    </Container>
>>>>>>> temp-assessment-branch
  );
};

export default Logout;
