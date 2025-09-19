import React from 'react';
import Layout from '../components/Layout';
import { Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PlaceholderPage = ({ title }) => (
  <Layout>
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>{title}</Typography>
      <Typography sx={{ mt: 2 }}>This is a placeholder page for {title}.</Typography>
      <Button component={RouterLink} to="/admin" variant="contained" sx={{ mt: 3 }}>Back to Admin</Button>
    </Container>
  </Layout>
);

export default PlaceholderPage;
