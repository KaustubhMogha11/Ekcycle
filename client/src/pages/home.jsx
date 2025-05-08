import React from 'react';
import Header from '../components/Header';
import ProcessSection from '../components/ProcessSection';
import PricingSection from '../components/PricingSection';
import StatsSection from '../components/StatsSection';
import MarketplaceListings from '../components/MarketplaceListings';
import Footer from '../components/Footer';
import MidSection from '../components/midsection/MidSection';
const Home = () => (
  <>
    <Header />
    <MidSection />
    <ProcessSection />
    <PricingSection />
    <StatsSection />
    <MarketplaceListings />
    <Footer />
  </>
);

export default Home;
