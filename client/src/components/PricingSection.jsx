import React from 'react';

const prices = [
  { name: "Battery Scrap", rate: "₹100/kg" },
  { name: "Second Life Battery", rate: "₹100/kg" },
  { name: "Black mass", rate: "₹100/kg" },
];

const PricingSection = () => (
  <section className="bg-gray-200 p-6">
    <h2 className="text-xl mb-4">Best price for the day</h2>
    <ul>
      {prices.map((item, idx) => (
        <li key={idx} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>{item.rate}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default PricingSection;