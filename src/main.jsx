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
  </React.StrictMode>,
);