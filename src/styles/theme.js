import { createTheme } from '@mui/material/styles';

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
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          minHeight: '100vh',
          color: '#e2e8f0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(25, 25, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 15, 35, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
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
            backgroundColor: '#2563eb', // A slightly darker blue for hover
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          
        }
      }
    }
  },
});

export default theme;
