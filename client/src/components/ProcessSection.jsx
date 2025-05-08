import React from 'react';

const processes = ["Smart Bin Collection", "Quality Verification", "Sustainable Recovery"];

const ProcessSection = () => (
  <section className="p-6">
    <h2 className="text-lg mb-4">Our Process</h2>
    <div className="grid grid-cols-3 gap-4">
      {processes.map((item, idx) => (
        <div key={idx} className="bg-gray-300 h-32 flex items-center justify-center text-center">
          {item}
        </div>
      ))}
    </div>
  </section>
);

export default ProcessSection;