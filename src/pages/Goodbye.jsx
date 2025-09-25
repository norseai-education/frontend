import React from 'react';
import { Box, Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

/**
 * A page displayed after a user successfully logs out.
 */
const Goodbye = () => {
  return (
    <Layout>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, textAlign: 'center', py: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, maxWidth: '500px' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            You have been logged out.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for using NorseAI!
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Goodbye;