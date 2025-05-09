import React from 'react';
import { FaBatteryHalf, FaMapMarkerAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import './MarketplaceListings.css';

const listings = [
  {
    title: "Processed Black Mass - Ready for Refining",
    details: "350 kg - 327.5 ₹/kg",
    location: "Connaught Place, Delhi",
    status: "Verified"
  },
  {
    title: "Second-Life EV Batteries - 80% Capacity",
    details: "10 units - 4500.0 ₹/unit",
    location: "Saket, Delhi",
    status: "Verified"
  },
  {
    title: "Mixed Battery Scrap - Consumer Electronics",
    details: "750 kg - 122.5 ₹/kg",
    location: "Lajpat Nagar, Delhi",
    status: "Pending"
  }
];

const MarketplaceListings = () => (
  <section className="marketplace-section">
    <h3 className="marketplace-heading">⚡ Recent Marketplace Listings</h3>
    <div className="marketplace-list">
      {listings.map((item, idx) => (
        <div key={idx} className="marketplace-card">
          <div className="listing-header">
            <FaBatteryHalf className="icon" />
            <p className="listing-title">{item.title}</p>
          </div>
          <p className="listing-details">{item.details}</p>
          <p className="listing-location"><FaMapMarkerAlt /> {item.location}</p>
          <span className={`listing-status ${item.status === 'Verified' ? 'verified' : 'pending'}`}>
            {item.status === 'Verified' ? <FaCheckCircle /> : <FaClock />} {item.status}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default MarketplaceListings;
