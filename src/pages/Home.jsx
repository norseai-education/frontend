import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  CssBaseline,
  Typography
} from '@mui/material';
import FeatureCards from '../components/dashboard/FeatureCards';
import HomeHeader from '../components/home/HomeHeader';
import Footer from '../components/dashboard/Footer';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)', color: 'white' }}>
      <CssBaseline />
      <HomeHeader />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 4 }}>
        <Box sx={{ maxWidth: 600, mb: 6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            NorseAI
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Education powered by artificial intelligence.
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <FeatureCards />
        </Container>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
