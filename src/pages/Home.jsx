<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Modal,
  Fade,
  Backdrop,
  Stack,
  CssBaseline,
  Typography,
  Button
} from '@mui/material';
import FeatureCards from '../components/home/FeatureCards';
import ResponsiveAppBar from '../components/home/ResponsiveAppBar'; // Import the new component
import Footer from '../components/home/Footer'; // Import the new Footer component

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  textAlign: 'center',
};

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await fetch('/auth/user-info', {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        const userInfo = await response.json();
        if (userInfo.authenticated) {
          setIsAuthenticated(true);
          setUsername(userInfo.username);
        } else {
          localStorage.removeItem('session_token');
          localStorage.removeItem('student_id');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    const sessionToken = localStorage.getItem('session_token');
    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }
    try {
      if (sessionToken) {
        await fetch('/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionToken),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      navigate(0);
    }
  };

  const startLesson = () => {
    const sessionToken = localStorage.getItem('session_token');
    if (!sessionToken) {
      setShowLoginModal(true);
    } else {
      navigate('/loading');
    }
  };
=======
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
>>>>>>> temp-assessment-branch

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)', color: 'white' }}>
      <CssBaseline />
<<<<<<< HEAD
      <ResponsiveAppBar 
        isAuthenticated={isAuthenticated} 
        username={username} 
        handleLogout={handleLogout} 
      />
=======
      <HomeHeader />
>>>>>>> temp-assessment-branch

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 4 }}>
        <Box sx={{ maxWidth: 600, mb: 6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            NorseAI
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Education powered by artificial intelligence.
          </Typography>
<<<<<<< HEAD
          <Button
            variant="contained"
            onClick={startLesson}
            sx={{
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              color: 'white',
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              padding: '20px 40px',
              borderRadius: '50px',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 30px rgba(255, 107, 107, 0.6)',
              },
            }}
          >
            Get Started
          </Button>
=======
>>>>>>> temp-assessment-branch
        </Box>

        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <FeatureCards />
        </Container>
      </Box>

<<<<<<< HEAD
      <Modal
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={showLoginModal}>
          <Box sx={modalStyle}>
            <Typography id="login-modal-title" variant="h6" component="h2" color="black">
              Login Required
            </Typography>
            <Typography id="login-modal-description" sx={{ mt: 2, color: 'text.secondary' }}>
              Please login or sign up to start your learning journey with NorseAI.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
              <Button component={RouterLink} to="/login" variant="contained" sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#5a67d8' } }}>
                Login
              </Button>
              <Button component={RouterLink} to="/signup" variant="outlined" sx={{ color: '#667eea', borderColor: '#667eea' }}>
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

=======
>>>>>>> temp-assessment-branch
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
