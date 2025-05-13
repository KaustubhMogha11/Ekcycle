import React from 'react';
import './processSection.css';

const processes = [
  {
    title: "Smart Bin Collection",
    subtitle: "Efficient collection from EV stations",
    description: "Our bins are deployed at key EV locations and monitored regularly to ensure timely collection.",
    icon: "fas fa-recycle"
  },
  {
    title: "Quality Verification",
    subtitle: "Test and validate battery health",
    description: "Advanced diagnostics ensure batteries are evaluated for reuse or safe recycling.",
    icon: "fas fa-check-circle"
  },
  {
    title: "Sustainable Recovery",
    subtitle: "Recycle valuable components responsibly",
    description: "We extract lithium, cobalt, and other metals through eco-friendly methods.",
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
            <div className="card-inner">
              <div className="card-front">
                <div className="process-icon">
                  <i className={process.icon}></i>
                </div>
                <h3 className="process-title">{process.title}</h3>
                <p className="process-subtitle">{process.subtitle}</p>
              </div>
              <div className="card-back">
                <p className="process-description">{process.description}</p>
                <button className="schedule-button">Schedule Bin</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;
