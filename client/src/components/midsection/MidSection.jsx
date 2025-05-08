import React from 'react';
import backgroundImage from '../../images/background1.jpeg'; // adjust path as needed
import './midsection.css'
const MidSection = () => {
  return (
    <section className="mid-section">
      <div className="overlay">
        <div className="quote-container">
          <h1 className="quote-text">
            "Recycle your EV batteries — power the planet, not the landfill."
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MidSection;
