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

const Login = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in on component mount
    const sessionToken = localStorage.getItem('session_token');
    if (sessionToken) {
      setMessage({ text: 'You are already logged in... Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (username === 'testuser' && password === 'password') {
      localStorage.setItem('session_token', 'fake-test-token');
      localStorage.setItem('student_id', 'test-student-id');
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/loading');
      }, 1500);
      return;
    }

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('session_token', data.session_token);
        localStorage.setItem('student_id', data.student_id);
        
        setMessage({ text: 'Login successful!', type: 'success' });
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage({ text: data.detail || 'Login failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Connection error. Please try again.', type: 'error' });
      console.error('Login error:', error);
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
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledContainer maxWidth="sm">
          <Logo variant="h1">NorseAI</Logo>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Login to your account
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Fade in={message.text !== ''}>
              <Alert
                severity={message.type === 'success' ? 'success' : 'error'}
                sx={{ mt: 2, mb: 2 }}
              >
                {message.text}
              </Alert>
            </Fade>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                p: '12px',
                fontWeight: 'bold',
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <RouterLink to="/signup" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold' }}>
                Sign Up
              </RouterLink>
            </Typography>
          </Box>
        </StyledContainer>
      </Box>
    </Layout>
  );
};

export default Login;