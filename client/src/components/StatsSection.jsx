import React from 'react';

const StatsSection = () => (
  <section className="p-6">
    <h2 className="text-2xl font-semibold mb-4">One step toward better future</h2>
    <div className="bg-white p-4 shadow rounded">
      <p className="text-green-700">CO2 Saved</p>
      <p className="text-2xl font-bold">5,280 kg</p>
      <p className="text-sm text-green-500">↑ 12.7% vs last month</p>
      <p className="mt-4 text-gray-700">Recycled This Month</p>
      <p className="text-xl font-bold">1,235 kg</p>
      <p className="text-sm text-green-500">↑ 5.4% vs last month</p>
    </div>
  </section>
);

export default StatsSection;