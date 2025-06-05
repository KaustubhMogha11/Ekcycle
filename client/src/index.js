import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-sgekq67wre7of5tv.us.auth0.com"
      clientId="wk0Ai4Es2r14RrNzOT4e8KcUNRCtWerW"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
  </BrowserRouter>
);

reportWebVitals();
