// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';

const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'your-auth0-domain.auth0.com';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-client-id';
const audience = import.meta.env.VITE_AUTH0_AUDIENCE || 'https://weather-api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: "openid profile email"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);