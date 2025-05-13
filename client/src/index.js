import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-sgekq67wre7of5tv.us.auth0.com"
    clientId="wk0Ai4Es2r14RrNzOT4e8KcUNRCtWerW"
    authorizationParams={{ redirect_uri: window.location.origin }}
    cacheLocation="localstorage"          // Persist in localStorage
    useRefreshTokens={true} 
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
