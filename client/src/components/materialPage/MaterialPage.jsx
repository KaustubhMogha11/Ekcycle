import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';
import NavBar from '../navbar/navBarComponent';
import './MaterialPage.css';

const MaterialPage = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    company: '',
    mobile: '',
    email: user?.email || '',
    otp: '',
    material: 'battery_scrap',
    battery_type: 'lco-s',
    second_life_type: 'lco-i',
    voltage: '',
    capacity: '',
    blackmass_type: 'lco-b',
    li_percent: '',
    co_percent: '',
    ni_percent: '',
    cu_percent: '',
    moisture: '',
    quantity: '',
    pricing: '',
    enquiry: ''
  });

  // Calculate pricing whenever relevant fields change
  useEffect(() => {
    calculatePricing();
  }, [
    formData.material,
    formData.battery_type,
    formData.second_life_type,
    formData.blackmass_type,
    formData.co_percent,
    formData.ni_percent,
    formData.quantity
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePricing = () => {
    const { material, quantity, battery_type, second_life_type, blackmass_type, co_percent, ni_percent } = formData;
    let pricing = 0;
    const qty = parseFloat(quantity) || 0;

    if (material === 'battery_scrap' && qty > 0) {
      if (battery_type === 'lco-s') pricing = 120 * qty;
      else if (battery_type === 'nmc-s') pricing = 80 * qty;
      else if (battery_type === 'lfp-s') pricing = 40 * qty;
    } else if (material === 'second_life' && qty > 0) {
      pricing = 80 * qty;
    } else if (material === 'blackmass' && qty > 0) {
      const coPct = parseFloat(co_percent) / 100 || 0;
      const niPct = parseFloat(ni_percent) / 100 || 0;
      if (blackmass_type === 'lco-b') pricing = coPct * 21.3 * 59 + niPct * 15.3 * 59 * qty;
      else if (blackmass_type === 'nmc-b') pricing = coPct * 21.3 * 59 + niPct * 15.3 * 59 * qty;
    }

    setFormData(prev => ({
      ...prev,
      pricing: pricing > 0 ? pricing.toFixed(2) : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/confirm-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Details confirmed. We have sent you an email for the same.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'There was an error submitting your details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="marketplace-page">
      <NavBar />
      <div className="marketplace-container">
        <div className="container">
          <h1>Material Registration and Pricing</h1>

          <form id="materialForm" onSubmit={handleSubmit}>
            {/* Registration Section */}
            <h2>Registration</h2>
            <label htmlFor="company">Company Name (if any):</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
            />

            <label htmlFor="mobile">Mobile Number:</label>
            <input 
              type="number" 
              id="mobile" 
              name="mobile" 
              placeholder="Enter mobile number" 
              required
              value={formData.mobile}
              onChange={handleChange}
            />

            <label htmlFor="email">Email Address:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter email address" 
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="otp">OTP Verification:</label>
            <input 
              type="text" 
              id="otp" 
              name="otp" 
              placeholder="Enter OTP" 
              required
              value={formData.otp}
              onChange={handleChange}
            />

            {/* Material Type Section */}
            <h2>Material Type</h2>
            <label htmlFor="material">Material Type:</label>
            <select 
              id="material" 
              name="material" 
              value={formData.material}
              onChange={handleChange}
            >
              <option value="battery_scrap">Battery Scrap</option>
              <option value="second_life">2nd Life Battery</option>
              <option value="blackmass">Blackmass</option>
            </select>

            {/* Battery Scrap Sub-Section */}
            {formData.material === 'battery_scrap' && (
              <div id="battery-scrap-sub">
                <label htmlFor="battery-type">Battery Scrap Type:</label>
                <select 
                  id="battery-type" 
                  name="battery_type"
                  value={formData.battery_type}
                  onChange={handleChange}
                >
                  <option value="lco-s">LCO-S</option>
                  <option value="nmc-s">NMC-S</option>
                  <option value="lfp-s">LFP-S</option>
                </select>
              </div>
            )}

            {/* 2nd Life Sub-Section */}
            {formData.material === 'second_life' && (
              <div id="second-life-sub">
                <label htmlFor="second-life-type">2nd Life Battery Type:</label>
                <select 
                  id="second-life-type" 
                  name="second_life_type"
                  value={formData.second_life_type}
                  onChange={handleChange}
                >
                  <option value="lco-i">LCO-I</option>
                  <option value="nmc-i">NMC-I</option>
                  <option value="lfp-i">LFP-I</option>
                </select>

                <label htmlFor="voltage">Voltage (V):</label>
                <input 
                  type="text" 
                  id="voltage" 
                  name="voltage" 
                  placeholder="Enter voltage" 
                  required
                  value={formData.voltage}
                  onChange={handleChange}
                />

                <label htmlFor="capacity">Capacity (Ah):</label>
                <input 
                  type="text" 
                  id="capacity" 
                  name="capacity" 
                  placeholder="Enter capacity" 
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Blackmass Sub-Section */}
            {formData.material === 'blackmass' && (
              <div id="blackmass-sub">
                <label htmlFor="blackmass-type">Blackmass Type:</label>
                <select 
                  id="blackmass-type" 
                  name="blackmass_type"
                  value={formData.blackmass_type}
                  onChange={handleChange}
                >
                  <option value="lco-b">LCO-B</option>
                  <option value="nmc-b">NMC-B</option>
                  <option value="lfp-b">LFP-B</option>
                </select>

                <label htmlFor="li-percent">Li (%)</label>
                <input 
                  type="number" 
                  id="li-percent" 
                  name="li_percent" 
                  placeholder="Enter Li percentage" 
                  required
                  value={formData.li_percent}
                  onChange={handleChange}
                />

                <label htmlFor="co-percent">Co (%)</label>
                <input 
                  type="number" 
                  id="co-percent" 
                  name="co_percent" 
                  placeholder="Enter Co percentage" 
                  required
                  value={formData.co_percent}
                  onChange={handleChange}
                />

                <label htmlFor="ni-percent">Ni (%)</label>
                <input 
                  type="number" 
                  id="ni-percent" 
                  name="ni_percent" 
                  placeholder="Enter Ni percentage" 
                  required
                  value={formData.ni_percent}
                  onChange={handleChange}
                />

                <label htmlFor="cu-percent">Cu (%)</label>
                <input 
                  type="number" 
                  id="cu-percent" 
                  name="cu_percent" 
                  placeholder="Enter Cu percentage" 
                  required
                  value={formData.cu_percent}
                  onChange={handleChange}
                />

                <label htmlFor="moisture">Moisture (%)</label>
                <input 
                  type="number" 
                  id="moisture" 
                  name="moisture" 
                  placeholder="Enter moisture percentage" 
                  required
                  value={formData.moisture}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Quantity and Pricing Section */}
            <h2>Quantity and Pricing</h2>
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              placeholder="Enter quantity" 
              required
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />

            <label htmlFor="pricing">Pricing:</label>
            <input 
              type="text" 
              id="pricing" 
              name="pricing" 
              placeholder="Calculated Pricing" 
              readOnly
              value={formData.pricing}
            />

            {/* Enquiry Section */}
            <h2>Enquiry</h2>
            <label htmlFor="enquiry">Your Enquiry:</label>
            <textarea 
              id="enquiry" 
              name="enquiry" 
              rows="5" 
              placeholder="Enter your enquiry"
              value={formData.enquiry}
              onChange={handleChange}
            ></textarea>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage; 