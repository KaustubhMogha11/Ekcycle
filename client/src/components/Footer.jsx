import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white p-6 mt-6">
    <div className="flex justify-between flex-wrap">
      <div>
        <h4 className="font-bold text-lg">Ekcycle</h4>
        <p className="mt-2 text-sm">Revolutionizing battery recycling...</p>
      </div>
      <div>
        <h5 className="font-semibold">Quick Links</h5>
        <ul className="text-sm">
          <li>Dashboard</li>
          <li>Marketplace</li>
          <li>Schedule</li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold">Contact Us</h5>
        <p className="text-sm">Dasratpuri, Delhi, India 110059</p>
        <p className="text-sm">+91 908 437 0502</p>
        <p className="text-sm">info@ekcycle.co</p>
      </div>
    </div>
    <div className="text-xs text-center mt-4">© 2025 Ekcycle. All rights reserved.</div>
  </footer>
);

export default Footer;