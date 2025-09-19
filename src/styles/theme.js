import { createTheme } from '@mui/material/styles';
import { lightThemePalette, darkThemePalette } from './modes';

const getTheme = (mode) => createTheme({
  palette: mode === 'light' ? lightThemePalette : darkThemePalette,
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' 
            : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: mode === 'light' ? '#1e293b' : '#e2e8f0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(25, 25, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(59, 130, 246, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(15, 15, 35, 0.8)',
          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
          border: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#2563eb',
          },
        },
      },
    },
  },
});

export default getTheme;
