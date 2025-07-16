import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaRocket, FaStore, FaCalendarAlt,
  FaInstagram, FaLinkedinIn
} from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // ✅ New X logo
import './Footer.css';

const Footer = () => (
  <footer className="footer" id='footer-section'>
    <div className="footer-content">
      <div className="footer-section brand">
        <div className="brand-header">
          <div className="battery">
            <div className="liquid"></div>
          </div>
          <h4 className="brand-name">PunarChakar</h4>
        </div>
        <p className="brand-tagline">
          Revolutionizing battery recycling with smart collection<br />
          quality verification and marketplace solutions.
        </p>
      </div>

      <div className="footer-section links">
        <h5>Quick Links</h5>
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaRocket /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/purchase" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaStore /> Purchase
            </Link>
          </li>
          <li>
            <Link to="https://forms.gle/4VdiyVcA1ttNVGc29" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaCalendarAlt /> Schedule
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer-section contact">
        <h5>Contact Us</h5>
        <p><FaMapMarkerAlt /> Dasratpuri, Delhi, India 110045</p>
        <p><FaPhoneAlt /> +91 8920170506</p>
        <p><FaEnvelope /> info@punarchakar.com</p>
      </div>
    </div>

    <div className="footer-social">
      <a href="https://x.com/punarchakar" target="_blank" rel="noopener noreferrer"><SiX /></a>
      <a href="https://www.instagram.com/punarchakar/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://www.linkedin.com/company/punarchakar-recycling-private-limited/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
    </div>

    <div className="footer-bottom">© 2025 PunarChakar. All rights reserved.</div>
  </footer>
);

export default Footer;
