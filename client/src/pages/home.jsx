import React from 'react';
import ProcessSection from '../components/processsection/ProcessSection';
import PricingSection from '../components/pricingsection/PricingSection';
import StatsSection from '../components/statsSection/StatsSection';
import MarketplaceListings from '../components/marketplacelistings/MarketplaceListings';
import Footer from '../components/footer/Footer';
import MidSection from '../components/midsection/MidSection';
import MetalPrices from '../components/metalPrices/metalPrices';
import NavBar from '../components/navbar/navBarComponent.jsx';
import Header from '../components/Header';
import './home.css';
import AnimatedBackground from '../components/AnimationBackground';
const Home = () => (
  <>
  <AnimatedBackground/>
    {/* <NavBar /> */}
    <Header/>
    <MidSection />
    <ProcessSection />
    <div className="side-by-side-container">
      <PricingSection />
      <MetalPrices />
    </div>
    <StatsSection />
    <MarketplaceListings />
    <Footer />
  </>
);

export default Home;
