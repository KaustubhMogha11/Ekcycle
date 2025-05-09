import React from 'react';
import './processSection.css';

const processes = [
  {
    title: "Smart Bin Collection",
    subtitle: "Efficient collection from EV stations",
    icon: "fas fa-recycle"
  },
  {
    title: "Quality Verification",
    subtitle: "Test and validate battery health",
    icon: "fas fa-check-circle"
  },
  {
    title: "Sustainable Recovery",
    subtitle: "Recycle valuable components responsibly",
    icon: "fas fa-leaf"
  }
];

const ProcessSection = () => {
  return (
    <section className="process-section">
      <h2 className="process-heading">Our Process</h2>
      <div className="process-cards">
        {processes.map((process, idx) => (
          <div className="process-card" key={idx}>
            <div className="process-icon">
              <i className={process.icon}></i>
            </div>
            <h3 className="process-title">{process.title}</h3>
            <p className="process-subtitle">{process.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
