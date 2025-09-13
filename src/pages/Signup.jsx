
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
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('session_token');
    if (sessionToken) {
      setMessage({ text: 'You are already logged in... Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [navigate]);

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
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Signup successful! Please log in.', type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMessage({ text: data.detail || 'Signup failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Connection error. Please try again.', type: 'error' });
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
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
        <StyledContainer>
          <Logo variant="h1">NorseAI</Logo>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Create your account
          </Typography>
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
        </StyledContainer>
      </Box>
    </Layout>
  );
};

export default Signup;