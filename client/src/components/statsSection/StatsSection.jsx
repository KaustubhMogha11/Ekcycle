import React from 'react';
import { FaLeaf, FaRecycle, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './statssection.css';

const StatsSection = () => (
  <section className="stats-section">
    <motion.h2
      className="stats-title"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      One Step Toward a Better Future
    </motion.h2>

<motion.div
  className="stats-card d-flex justify-content-center align-items-center"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <div className="stat-item">
    <FaLeaf className="stat-icon green" />
    <div>
      <p className="stat-label green">CO₂ Saved</p>
      <p className="stat-value">5,280 kg</p>
      <p className="stat-delta green">↑ 12.7% vs last month</p>
    </div>
  </div>

  <div className="stat-divider"></div>

  <div className="stat-item">
    <FaRecycle className="stat-icon blue" />
    <div>
      <p className="stat-label blue">Recycled This Month</p>
      <p className="stat-value">1,235 kg</p>
      <p className="stat-delta blue">↑ 5.4% vs last month</p>
    </div>
  </div>

  <div className="stat-divider"></div>

  <div className="stat-item">
  <FaBolt className="stat-icon yellow" />
  <div>
    <p className="stat-label yellow">Energy Saved</p>
    <p className="stat-value">3,420 kWh</p>
    <p className="stat-delta yellow">↑ 8.9% vs last month</p>
  </div>
</div>
</motion.div>

  </section>
);

export default StatsSection;
