import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../images/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "×" : "☰"}
        </div>

        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <a href="/">Home</a>
          <a href="/marketplace">Enquiry</a>
          <a href="#footer-section">Contact</a>

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
        </nav>
      </div>
    </header>
  );
};

export default Header;
