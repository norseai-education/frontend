
<<<<<<< HEAD
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../components/Layout';
import SignupButton from '../components/SignupButton';
=======
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Fade,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
>>>>>>> temp-assessment-branch

const StyledContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: '10px',
}));

const Signup = () => {
<<<<<<< HEAD
=======
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setMessage({ text: 'You are already logged in... Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const result = await signup(username, password, email);
      
      if (result.success) {
        setMessage({ text: 'Signup successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessage({ text: result.error || 'Signup failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An unexpected error occurred. Please try again.', type: 'error' });
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

>>>>>>> temp-assessment-branch
  return (
    <Layout>
      <Box
        sx={{
<<<<<<< HEAD
          background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
=======
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' 
            : 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)',
          minHeight: 'calc(100vh - 64px)', // Adjust for AppBar height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          p: 2,
        }}
      >
        <Fade in={!!message.text}>
          <Box sx={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 10, px: 2 }}>
            {message.text && (
              <Alert severity={message.type || 'info'} sx={{ maxWidth: 400, margin: '0 auto' }}>
                {message.text}
              </Alert>
            )}
          </Box>
        </Fade>
>>>>>>> temp-assessment-branch
        <StyledContainer>
          <Logo variant="h1">NorseAI</Logo>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Create your account
          </Typography>
<<<<<<< HEAD
          <SignupButton />
=======
          <Box component="form" onSubmit={handleSignup} noValidate>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
            <TextField
              label="Email (Optional)"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ 
                mt: 2, 
                mb: 1, 
                p: 1.5, 
                fontWeight: 'bold',
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <RouterLink to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold' }}>
              Login
            </RouterLink>
          </Typography>
>>>>>>> temp-assessment-branch
        </StyledContainer>
      </Box>
    </Layout>
  );
};

export default Signup;