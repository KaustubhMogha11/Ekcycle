import React, { useEffect, useState } from 'react';
import { FaBatteryFull, FaRecycle, FaFlask } from 'react-icons/fa';
import './PricingSection.css';

const PricingSection = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:8000/price-info');
        const json = await res.json();
        if (json.success) {
          const data = json.data;
          setPrices([
            { name: "Battery Scrap", rate: `₹${data.batteryScrapPrice}/kg`, icon: <FaRecycle /> },
            { name: "Second Life Battery", rate: `₹${data.secondLifePrice}/kg`, icon: <FaBatteryFull /> },
            { name: "Black Mass", rate: `₹${data.blackMassPrice}/kg`, icon: <FaFlask /> }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section className="pricing-section">
      <h2 className="section-title">Best price for the day</h2>
      {!prices ? (
        <p>Loading prices...</p>
      ) : (
        <ul className="price-list">
          {prices.map((item, idx) => (
            <li key={idx} className="price-item">
              <div className="price-left">
                <span className="price-icon">{item.icon}</span>
                <span className="price-name">{item.name}</span>
              </div>
              <span className="price-rate">{item.rate}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PricingSection;
