import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import MaterialPage from './components/materialPage/MaterialPage';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

const ProtectedMaterialPage = withAuthenticationRequired(MaterialPage, {
  onRedirecting: () => <div>Loading...</div>,
});

function App() {
  const { isLoading } = useAuth0();

  // Wait for Auth0 to initialize
  if (isLoading) return <div>Loading Auth0...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<ProtectedMaterialPage />} />
    </Routes>
  );
}

export default App;
