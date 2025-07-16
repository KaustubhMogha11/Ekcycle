import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './metalPrices.css';

const API_KEY = '7cf4bfccd5c372628851255d01155e1d';
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=INR`;

const trackedMetals = {
  Lithium: 'LITHIUM',
  Cobalt: 'COBALT',
  Copper: 'COPPER',
};

// Default fallback values
const defaultPrices = [
  { name: 'Lithium', rate: '1800 ₹/kg', change: 1.2 },
  { name: 'Cobalt', rate: '3200 ₹/kg', change: -0.8 },
  { name: 'Copper', rate: '700 ₹/kg', change: 0.5 },
];

const MetalPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data && data.rates) {
          const updatedPrices = Object.entries(trackedMetals).map(([name, symbol]) => {
            const rateInINR = data.rates[symbol];
            const rate = rateInINR ? (1 / rateInINR).toFixed(2) : null;
            const change = (Math.random() * 4 - 2).toFixed(1); // Simulated % change

            return {
              name,
              rate: rate ? `${rate} ₹/kg` : 'N/A',
              change: parseFloat(change),
            };
          });

          const allValid = updatedPrices.every(item => item.rate !== 'N/A');
          setPrices(allValid ? updatedPrices : defaultPrices);
        } else {
          setPrices(defaultPrices);
        }
      } catch (error) {
        console.error('Failed to fetch metal prices:', error);
        setPrices(defaultPrices);
      }
    };

    fetchPrices();
  }, []);

  return (
    <section className="metal-prices-section">
      <h2 className="section-title">Metal Market Prices</h2>
      <ul className="metal-price-list">
        {prices.map((item, idx) => (
          <li key={idx} className="metal-price-item">
            <div className="metal-price-left">
              <span className="metal-name">{item.name}</span>
              {/* <span className="metal-rate">{item.rate}</span> */}
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
