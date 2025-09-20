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

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar
        isAuthenticated={isAuthenticated}
        username={username}
        handleLogout={handleLogout}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to NorseAI
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your AI-powered learning assistant
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            onClick={startLesson}
          >
            Start Lesson
          </Button>
        </Box>
        <FeatureCards />
      </Container>
      <Footer />
      <Modal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showLoginModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Please log in to start a lesson
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/login"
                onClick={() => setShowLoginModal(false)}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/register"
                onClick={() => setShowLoginModal(false)}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default Home;
