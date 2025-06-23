import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './AdminPriceEditor.css';

const editableFields = [
  'lcoSPrice',
  'nmcSPrice',
  'lfpSPrice',
  'secondLifePrice',
  'batteryScrapPrice',
  'blackMassPrice',
  'CoMarketPrice',
  'CoPayable',
  'NiMarketPrice',
  'NiPayable'
];

const AdminPriceEditor = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState({
    lcoSPrice: '',
    nmcSPrice: '',
    lfpSPrice: '',
    secondLifePrice: '',
    batteryScrapPrice: '',
    blackMassPrice: '',
    CoMarketPrice: '',
    CoPayable: '',
    NiMarketPrice: '',
    NiPayable: ''
  });

  useEffect(() => {
    const fetchPriceInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/price-info');
        const result = await response.json();
        if (result.success) {
          const filtered = {};
          editableFields.forEach(field => {
            filtered[field] = result.data[field] || '';
          });
          setPriceData(filtered);
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to fetch price information', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/price-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(priceData)
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire('Success', 'Price info updated', 'success');
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update price info', 'error');
    }
  };

  if (loading) return <div className="admin-price-editor">Loading price data...</div>;

  return (
    <div className="admin-price-editor">
      <h2>Update Price Information</h2>
      <form onSubmit={handleSubmit} className="price-form">
        {editableFields.map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field}</label>
            <input
              type="number"
              step="0.01"
              id={field}
              name={field}
              value={priceData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Update Prices</button>
      </form>
    </div>
  );
};

export default AdminPriceEditor;
