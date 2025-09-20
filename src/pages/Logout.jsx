import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, CircularProgress } from '@mui/material';
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
  );
};

export default Logout;
