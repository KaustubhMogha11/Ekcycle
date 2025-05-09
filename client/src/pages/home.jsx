import React from 'react';
import Header from '../components/Header';
import ProcessSection from '../components/processsection/ProcessSection';
import PricingSection from '../components/pricingsection/PricingSection';
import StatsSection from '../components/statsSection/StatsSection';
import MarketplaceListings from '../components/marketplacelistings/MarketplaceListings';
import Footer from '../components/footer/Footer';
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
