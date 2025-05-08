import React from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo.jpg'; // Update to correct file name and extension

const Header = () => {
  return (
    <header className="header">
      <motion.div
        className="logo-container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="Ekcycle Logo" className="logo-img" />
        <span className="logo-text">Ekcycle</span>
      </motion.div>

      <motion.nav
        className="nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <a href="#">Marketplace</a>
        <a href="#">Contact Us</a>
        <a href="#">Login</a>
      </motion.nav>
    </header>
  );
};

export default Header;