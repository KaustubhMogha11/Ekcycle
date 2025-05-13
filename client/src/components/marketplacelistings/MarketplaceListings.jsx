import React from 'react';
import Slider from 'react-slick';
import { FaBatteryHalf, FaMapMarkerAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import './MarketplaceListings.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const listings = [
  {
    title: "Processed Black Mass - Ready for Refining",
    details: "350 kg - 327.5 ₹/kg",
    location: "Connaught Place, Delhi",
    status: "Verified"
  },
  {
    title: "Second-Life EV Batteries - 80% Capacity",
    details: "10 units - 4500.0 ₹/unit",
    location: "Saket, Delhi",
    status: "Verified"
  },
  {
    title: "Mixed Battery Scrap - Consumer Electronics",
    details: "750 kg - 122.5 ₹/kg",
    location: "Lajpat Nagar, Delhi",
    status: "Pending"
  },
  {
    title: "Industrial Lead-Acid Scrap - Bulk",
    details: "1 ton - 105.0 ₹/kg",
    location: "Okhla, Delhi",
    status: "Verified"
  },
  {
    title: "Lithium-ion Packs (Defective)",
    details: "60 packs - 225.0 ₹/pack",
    location: "Dwarka, Delhi",
    status: "Pending"
  }
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

const MarketplaceListings = () => (
  <section className="marketplace-section">
    <h3 className="marketplace-heading">⚡ Recent Marketplace Listings</h3>
    <Slider {...sliderSettings} className="marketplace-carousel">
      {listings.map((item, idx) => (
        <div key={idx} className="marketplace-card-wrapper">
          <div className="marketplace-card">
            <div className="listing-header">
              <FaBatteryHalf className="icon" />
              <p className="listing-title">{item.title}</p>
            </div>
            <p className="listing-details">{item.details}</p>
            <p className="listing-location"><FaMapMarkerAlt /> {item.location}</p>
            <span className={`listing-status ${item.status === 'Verified' ? 'verified' : 'pending'}`}>
              {item.status === 'Verified' ? <FaCheckCircle /> : <FaClock />} {item.status}
            </span>
          </div>
        </div>
      ))}
    </Slider>
  </section>
);

export default MarketplaceListings;
