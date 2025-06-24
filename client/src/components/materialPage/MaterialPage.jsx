import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';
import Header from '../Header';
import Footer from '../footer/Footer';
import './MaterialPage.css';

window.fetchedPricingInfo = null; // Global variable to store fetched pricing info

const MaterialPage = () => {
  const { user } = useAuth0();
  

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    company: '',
    mobile: '',
    email: user?.email || '',
    material: 'battery_scrap',
    battery_type: 'LCO-S',
    second_life_type: 'LCO-I',
    voltage: '',
    capacity: '',
    blackmass_type: 'LCO-B',
    li_percent: '',
    co_percent: '',
    ni_percent: '',
    cu_percent: '',
    moisture: '',
    quantity: '',
    pricing: '',
    enquiry: ''
  });

  // Fetch initial price info on component load
  useEffect(() => {
    const fetchInitialPriceInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/price-info');
        if (!response.ok) throw new Error('Failed to fetch price info');
        const data = await response.json();

        window.fetchedPricingInfo = data.data; // Store fetched pricing info globally
        Object.freeze(window.fetchedPricingInfo); // Make it immutable
        console.log('Fetched Price Info:', window.fetchedPricingInfo);

      } catch (error) {
        console.error('Error fetching price info:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error Fetching price info. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          showConfirmButton: true,
        }).then((response) => {
          if (response.isConfirmed || response.isDismissed) {
            window.location.href = '/'; // Redirect no matter how alert is closed
          }
        });

      } finally {
        setLoading(false);
      }
    };

    fetchInitialPriceInfo();
  }, []);

useEffect(() => {
  if (window.fetchedPricingInfo) {
    calculatePricing();
  }
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

  if (name === 'material') {
    // Reset dependent fields on material change
    setFormData(prev => ({
      ...prev,
      material: value,
      battery_type: 'LCO-S',
      second_life_type: 'LCO-I',
      blackmass_type: 'LCO-B',
      voltage: '',
      capacity: '',
      li_percent: '',
      co_percent: '',
      ni_percent: '',
      cu_percent: '',
      quantity: '',
      moisture: '',
      pricing: '' // optional: reset pricing when material changes
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    calculatePricing();
  }
};

  const calculatePricing = () => {
    const { material, quantity, battery_type, second_life_type, blackmass_type, co_percent, ni_percent } = formData;
    const { lcoSPrice, nmcSPrice, lfpSPrice, secondLifePrice, CoMarketPrice, CoPayable, NiMarketPrice, NiPayable} = window.fetchedPricingInfo;
    let pricing = 0;
    const qty = parseFloat(quantity) || 0;

    if (material === 'battery_scrap' && qty > 0) {
      if (battery_type === 'LCO-S') pricing = lcoSPrice * qty;
      else if (battery_type === 'NMC-S') pricing = nmcSPrice * qty;
      else if (battery_type === 'LFP-S') pricing = lfpSPrice * qty;
    } else if (material === 'second_life' && qty > 0) {
      pricing = secondLifePrice * qty;
    } else if (material === 'blackmass' && qty > 0) {
      const coPct = parseFloat(co_percent) / 100 || 0;
      const niPct = parseFloat(ni_percent) / 100 || 0;
      if (blackmass_type === 'LCO-B' || blackmass_type === 'NMC-B') {
        pricing = (coPct * CoMarketPrice * CoPayable + niPct * NiMarketPrice * NiPayable) * qty;
      }
    }

    setFormData(prev => ({
      ...prev,
      pricing: pricing > 0 ? pricing.toFixed(2) : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marketplace-page">
      <Header/>
      <div className="marketplace-container">
        <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1>Material Registration and Pricing</h1>
              <form id="materialForm" onSubmit={handleSubmit}>
                {/* Registration Section */}
                <div className="form-section">
                  <h2>Registration</h2>
                  <div className="form-grid">
                    <div>
                      <label htmlFor="company">Company Name (if any):</label>
                      <input type="text" id="company" name="company" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="mobile">Mobile Number:<span className="required"> *</span></label>
                      <input type="text" id="mobile" name="mobile" placeholder="Enter mobile number" required value={formData.mobile} onChange={handleChange} maxLength="10" pattern="\d{10}" title="Mobile number must be exactly 10 digits" />
                    </div>
                    <div className="full-width">
                      <label htmlFor="email">Email Address:<span className="required"> *</span></label>
                      <input type="email" id="email" name="email" placeholder="Enter email address" required value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Material Type Section */}
                <div className="form-section">
                  <h2>Material Type</h2>
                  <div className="full-width">
                    <label htmlFor="material">Material Type:</label>
                    <select id="material" name="material" value={formData.material} onChange={handleChange}>
                      <option value="battery_scrap">Battery Scrap</option>
                      <option value="second_life">2nd Life Battery</option>
                      <option value="blackmass">Blackmass</option>
                    </select>
                  </div>

                  {formData.material === 'battery_scrap' && (
                    <div className="form-grid">
                      <div>
                        <label htmlFor="battery-type">Battery Scrap Type:</label>
                        <select id="battery-type" name="battery_type" value={formData.battery_type} onChange={handleChange}>
                          <option value="LCO-S">LCO-S</option>
                          <option value="NMC-S">NMC-S</option>
                          <option value="LFP-S">LFP-S</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {formData.material === 'second_life' && (
                    <div className="form-grid">
                      <div>
                        <label htmlFor="second-life-type">2nd Life Battery Type:</label>
                        <select id="second-life-type" name="second_life_type" value={formData.second_life_type} onChange={handleChange}>
                          <option value="LCO-I">LCO-I</option>
                          <option value="NMC-I">NMC-I</option>
                          <option value="LFP-I">LFP-I</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="voltage">Voltage (V):<span className="required"> *</span></label>
                        <input type="text" id="voltage" name="voltage" placeholder="Enter voltage" required value={formData.voltage} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="capacity">Capacity (Ah):<span className="required"> *</span></label>
                        <input type="text" id="capacity" name="capacity" placeholder="Enter capacity" required value={formData.capacity} onChange={handleChange} />
                      </div>
                    </div>
                  )}

                  {formData.material === 'blackmass' && (
                    <div className="form-grid">
                      <div>
                        <label htmlFor="blackmass-type">Blackmass Type:</label>
                        <select id="blackmass-type" name="blackmass_type" value={formData.blackmass_type} onChange={handleChange}>
                          <option value="LCO-B">LCO-B</option>
                          <option value="NMC-B">NMC-B</option>
                          <option value="LFP-B">LFP-B</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="li-percent">Li (%)<span className="required"> *</span></label>
                        <input type="number" id="li-percent" name="li_percent" placeholder="Enter Li percentage" required value={formData.li_percent} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="co-percent">Co (%)<span className="required"> *</span></label>
                        <input type="number" id="co-percent" name="co_percent" placeholder="Enter Co percentage" required value={formData.co_percent} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="ni-percent">Ni (%)<span className="required"> *</span></label>
                        <input type="number" id="ni-percent" name="ni_percent" placeholder="Enter Ni percentage" required value={formData.ni_percent} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="cu-percent">Cu (%)<span className="required"> *</span></label>
                        <input type="number" id="cu-percent" name="cu_percent" placeholder="Enter Cu percentage" required value={formData.cu_percent} onChange={handleChange} />
                      </div>
                      <div>
                        <label htmlFor="moisture">Moisture (%)<span className="required"> *</span></label>
                        <input type="number" id="moisture" name="moisture" placeholder="Enter moisture percentage" required value={formData.moisture} onChange={handleChange} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity and Pricing */}
                <div className="form-section">
                  <h2>Quantity and Pricing</h2>
                  <div className="form-grid">
                    <div>
                      <label htmlFor="quantity">Quantity:</label>
                      <input type="number" id="quantity" name="quantity" placeholder="Enter quantity" required value={formData.quantity} onChange={handleChange} min="1" />
                    </div>
                    <div>
                      <label htmlFor="pricing">Pricing: (Rs)</label>
                      <input type="text" id="pricing" name="pricing" placeholder="Calculated Pricing" readOnly value={formData.pricing} />
                    </div>
                  </div>
                </div>

                {/* Enquiry Section */}
                <div className="form-section">
                  <h2>Enquiry</h2>
                  <div className="full-width">
                    <label htmlFor="enquiry">Your Enquiry:</label>
                    <textarea id="enquiry" name="enquiry" rows="5" placeholder="Enter your enquiry" value={formData.enquiry} onChange={handleChange}></textarea>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  disabled={!formData.pricing || parseFloat(formData.pricing) <= 0}
                />

                {/* <button type="button" id='submitFormBtn' onClick={handleSubmit} disabled={!formData.pricing}>
                  Submit
                </button> */}
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MaterialPage;
