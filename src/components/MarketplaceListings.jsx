import React from 'react';

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
  <section className="p-6">
    <h3 className="mb-2">Recent Marketplace Listings</h3>
    {listings.map((item, idx) => (
      <div key={idx} className="border-b py-2">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm">{item.details} - {item.location}</p>
        <span className={`text-xs ${item.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'}`}>{item.status}</span>
      </div>
    ))}
  </section>
);

export default MarketplaceListings;