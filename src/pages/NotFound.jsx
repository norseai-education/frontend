import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            py: 8,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default NotFound;
