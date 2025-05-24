import React from 'react';
import './whatsAppButton.css';
const WhatsAppButton = () => {
  const phoneNumber = '919084370502'; // ✅ No '+' or spaces
  const message = 'Hi, I’m interested in your e-waste recycling service!';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </div>
  );
};


export default WhatsAppButton;
