import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './metalPrices.css';

// const API_URL = 'https://api.metalpriceapi.com/v1/latest?api_key=657c808bb2035af13cb2b49ff5c5a960';
// const API_URL = 'https://api.metalpriceapi.com/v1/latest?api_key=657c808bb2035af13cb2b49ff5c5a960';

const trackedMetals = {
  Lithium: 'LITHIUM',
  Cobalt: 'COBALT',
  Nickel: 'NICKEL',
  Manganese: 'MANGANESE',
  Copper: 'COPPER',
};

const MetalPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data && data.rates) {
          // Simulate change % for now (since API doesn't provide it)
          const updatedPrices = Object.entries(trackedMetals).map(([name, symbol]) => {
            const rate = data.rates[symbol];
            const change = (Math.random() * 4 - 2).toFixed(1); // simulate ±2% change
            return {
              name,
              rate: rate ? `${rate.toFixed(2)} ₹/kg` : 'N/A',
              change: parseFloat(change)
            };
          });
          setPrices(updatedPrices);
        }
      })
      .catch(err => console.error('Failed to fetch metal prices:', err));
  }, []);

  return (
    <section className="metal-prices-section">
      <h2 className="section-title">Metal Market Prices</h2>
      <ul className="metal-price-list">
        {prices.map((item, idx) => (
          <li key={idx} className="metal-price-item">
            <div className="metal-price-left">
              <span className="metal-name">{item.name}</span>
              <span className="metal-rate">{item.rate}</span>
            </div>
            <div className={`metal-change ${item.change >= 0 ? 'up' : 'down'}`}>
              {item.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              <span>{Math.abs(item.change).toFixed(1)}%</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MetalPrices;
