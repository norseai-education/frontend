import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Stack,
  CssBaseline,
  Typography,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import FeatureCards from '../components/dashboard/FeatureCards';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import Footer from '../components/dashboard/Footer';
import { useAuth } from '../contexts/AuthContext';
import AssessmentService from '../services/assessmentService';
import ChatService from '../services/chatService';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout: authLogout } = useAuth();

  // Clear any previous errors when component mounts
  useEffect(() => {
    setError('');
  }, []);

  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }
    
    try {
      await authLogout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const startLesson = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if student needs assessment
      const checkResult = await AssessmentService.checkNeedAssessment(user.studentId);
      console.log(checkResult);
      console.log(user.studentId);
      
      if (checkResult.give_assessment) {
        // New student needs assessment
        navigate('/assessment');
      } else {
        // Existing student, initialize chat session
        try {
          const init = await ChatService.initializeSession(user.studentId);
          console.log(init);
          navigate('/chat');
        } catch (chatError) {
          console.error('Failed to initialize chat session:', chatError);
          setError('Failed to start lesson. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error checking assessment:', error);
      setError('Failed to start lesson. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)', color: 'white' }}>
      <CssBaseline />
      <ResponsiveAppBar 
        isAuthenticated={isAuthenticated} 
        username={user?.username || ''} 
        handleLogout={handleLogout} 
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 4 }}>
        <Box sx={{ maxWidth: 600, mb: 6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Welcome back, {user?.username}!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Ready to continue your learning journey?
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
              {error}
            </Alert>
          )}
          
          <Button
            variant="contained"
            onClick={startLesson}
            disabled={loading}
            sx={{
              background: loading ? 'grey' : 'linear-gradient(45deg, #ff6b6b, #feca57)',
              color: 'white',
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              padding: '20px 40px',
              borderRadius: '50px',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(255, 107, 107, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              '&:hover': {
                transform: loading ? 'none' : 'translateY(-3px)',
                boxShadow: loading ? 'none' : '0 12px 30px rgba(255, 107, 107, 0.6)',
              },
            }}
          >
            {loading ? (
              <><CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Starting...</>
            ) : (
              'Start Lesson'
            )}
          </Button>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <FeatureCards />
        </Container>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default Dashboard;
