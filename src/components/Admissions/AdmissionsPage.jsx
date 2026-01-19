import React, { useEffect } from 'react';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { CredibilityBar } from './components/credibility-bar';
import { Stats } from './components/stats';
import { About } from './components/about';
import { Philosophy } from './components/philosophy';
import { ApplicationEssentials } from './components/application-essentials';
import { Services } from './components/services';
import { TrajectoryTimeline } from './components/trajectory-timeline';
import { Masterclass } from './components/masterclass';
import { Pricing } from './components/pricing';
import { Testimonials } from './components/testimonials';
import { FAQ } from './components/faq';
import { FinalCTA } from './components/final-cta';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import './app/globals-admissions.css';

const AdmissionsPage = () => {
  useEffect(() => {
    // Load Geist fonts from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply Geist font to the body when this component is mounted
    document.body.style.fontFamily = "'Geist', 'Geist Fallback', sans-serif";

    return () => {
      // Cleanup: remove font link when component unmounts (optional)
      const fontLink = document.querySelector('link[href*="Geist"]');
      if (fontLink) {
        fontLink.remove();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Philosophy />
      <ApplicationEssentials />
      <Services />
      <TrajectoryTimeline />
      <Masterclass />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
};

export default AdmissionsPage;
