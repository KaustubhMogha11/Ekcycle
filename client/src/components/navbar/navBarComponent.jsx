import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../images/logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import './NavBar.css'; // Make sure to add the required styles in your CSS file

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobile toggle function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav className="nav-bar">
      {/* Logo on the left */}
      <div className="logo-left">
        <a href="/">
          <img src={logo} alt="PunarChakar Logo" />
        </a>
      </div>

      {/* Navigation links in the center */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/purchase">Marketplace</a>
        <a href="/contact">Contact Us</a>
      </div>

      {/* Login/Logout button */}
      <div className="nav-right">
        {!isAuthenticated ? (
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              loginWithRedirect();
            }}
          >
            Login
          </a>
        ) : (
          <div className="nav-user">
            <span>Hi, {user?.given_name || user?.name || user?.email}</span>
            <button
              className="logout-btn"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
    </motion.nav>
  );
};

export default NavBar;
