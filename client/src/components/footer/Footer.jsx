import React from 'react';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaRocket, FaStore, FaCalendarAlt,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section brand">
        <div className="brand-header">
          <div className="battery">
            <div className="liquid"></div>
          </div>
          <h4 className="brand-name">PunarChakar</h4>
        </div>
        <p className="brand-tagline">Revolutionizing battery recycling with smart collection<br/>quality verification and market place solutions.</p>
      </div>

      <div className="footer-section links">
        <h5>Quick Links</h5>
        <ul>
          <li><FaRocket /> Dashboard</li>
          <li><FaStore /> Enquiry</li>
          <li><FaCalendarAlt /> Schedule</li>
        </ul>
      </div>

      <div className="footer-section contact">
        <h5>Contact Us</h5>
        <p><FaMapMarkerAlt /> Dasratpuri, Delhi, India 110059</p>
        <p><FaPhoneAlt /> +91 908 437 0502</p>
        <p><FaEnvelope /> info@punarchakar.com</p>
      </div>
    </div>

    <div className="footer-social">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
    </div>

    <div className="footer-bottom">© 2025 Ekcycle. All rights reserved.</div>
  </footer>
);

export default Footer;
