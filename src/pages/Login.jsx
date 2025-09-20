
import { Box, Container, Typography, TextField, Button, CircularProgress, Alert, Fade, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import LoginHeader from '../components/login/LoginHeader';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: 'none',
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
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/dashboard';

  // useEffect(() => {
  //   // If already logged in, redirect to intended destination
  //   if (isAuthenticated) {
  //     setMessage({ text: 'You are already logged in... Redirecting...', type: 'success' });
  //     setTimeout(() => {
  //       navigate(from, { replace: true });
  //     }, 1500);
  //   }
  // }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const result = await login(username, password);

      if (result.success) {
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setMessage({ text: result.error || 'Login failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An unexpected error occurred. Please try again.', type: 'error' });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LoginHeader>
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #182c87 0%, #120c3f 100%)',
          }}
        >
          <StyledContainer maxWidth="sm">
            <Logo variant="h1">NorseAI</Logo>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
              Login to your account
            </Typography>
            <LoginButton />
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
      </LoginHeader>
    </Layout>
  );
};

export default Login;