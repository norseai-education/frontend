import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { ColorModeProvider } from './styles/ColorModeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sunshineeliteeducation.us.auth0.com"
      clientId="3N0bbqF2QIUFvmTOc8VMsybTFjUjyxMT"
      authorizationParams={{
        redirect_uri: window.location.origin + '/access'
      }}
    >
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </Auth0Provider>
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#feca57',
    },
    background: {
      default: '#120c3f',
      paper: '#182c87',
    },
  },
  typography: {
    fontFamily: ['Segoe UI', 'sans-serif'].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);