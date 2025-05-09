import React from 'react';
import { FaBatteryFull, FaRecycle, FaFlask } from 'react-icons/fa';
import './PricingSection.css';

const prices = [
  { name: "Battery Scrap", rate: "₹100/kg", icon: <FaRecycle /> },
  { name: "Second Life Battery", rate: "₹100/kg", icon: <FaBatteryFull /> },
  { name: "Black mass", rate: "₹100/kg", icon: <FaFlask /> },
];

const PricingSection = () => (
  <section className="pricing-section">
    <h2 className="section-title">Best price for the day</h2>
    <ul className="price-list">
      {prices.map((item, idx) => (
        <li key={idx} className="price-item">
          <div className="price-left">
            <span className="price-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
          <span className="price-rate">{item.rate}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default PricingSection;
