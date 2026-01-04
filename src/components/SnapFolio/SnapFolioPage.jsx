import React from 'react';
import SnapFolioLayout from './SnapFolioLayout';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Philosophy from './sections/Philosophy/Philosophy';
import Services from './sections/Services/Services';
import FullCycle from './sections/FullCycle/FullCycle';
import Pricing from './sections/Pricing/Pricing';
import FAQ from './sections/FAQ/FAQ';
import Contact from './sections/Contact/Contact';
import './shared/snapfolio-shared.scss';

const SnapFolioPage = () => {
  return (
    <SnapFolioLayout>
      <Hero />
      <About />
      <Philosophy />
      <Services />
      <FullCycle />
      <Pricing />
      <FAQ />
      <Contact />
    </SnapFolioLayout>
  );
};

export default SnapFolioPage;

