import { createTheme } from '@mui/material/styles';
<<<<<<< HEAD
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
=======

// Define the custom MUI theme.
// This theme object will be available to all components wrapped by the ThemeProvider.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // A vibrant blue from the loading page
    },
    secondary: {
      main: '#06b6d4', // A cyan accent
    },
    background: {
      default: '#1a1a2e', // Dark blue-gray from the gradient
      paper: 'rgba(15, 15, 35, 0.8)', // Semi-transparent dark background for components
    },
    text: {
      primary: '#e2e8f0', // Light grayish-blue for primary text
      secondary: '#94a3b8', // Muted color for secondary text
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
>>>>>>> temp-assessment-branch
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
<<<<<<< HEAD
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' 
            : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: mode === 'light' ? '#1e293b' : '#e2e8f0',
=======
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: '#e2e8f0',
>>>>>>> temp-assessment-branch
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
<<<<<<< HEAD
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(25, 25, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(59, 130, 246, 0.3)',
=======
          background: 'rgba(25, 25, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
>>>>>>> temp-assessment-branch
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
<<<<<<< HEAD
          backgroundColor: mode === 'light' ? '#ffffff' : 'rgba(15, 15, 35, 0.8)',
          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
          border: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(59, 130, 246, 0.3)',
=======
          backgroundColor: 'rgba(15, 15, 35, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
>>>>>>> temp-assessment-branch
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
<<<<<<< HEAD
            backgroundColor: '#2563eb',
=======
            backgroundColor: '#2563eb', // A slightly darker blue for hover
>>>>>>> temp-assessment-branch
          },
        },
      },
    },
<<<<<<< HEAD
  },
});

export default getTheme;
=======
    MuiContainer: {
      styleOverrides: {
        root: {
          
        }
      }
    }
  },
});

export default theme;
>>>>>>> temp-assessment-branch
