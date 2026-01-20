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
import { SectionSeparator } from './components/section-separator';
import './app/globals-admissions.css';

const AdmissionsPage = () => {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    // Store original font family to restore on unmount
    const originalFontFamily = body.style.fontFamily || window.getComputedStyle(body).fontFamily;
    
    // Add body class to indicate Admissions is active
    body.classList.add('admissions-active');
    
    // Load Geist fonts from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    link.id = 'admissions-geist-font';
    document.head.appendChild(link);

    return () => {
      // Cleanup: remove body class and font link when component unmounts
      body.classList.remove('admissions-active');
      
      const fontLink = document.getElementById('admissions-geist-font');
      if (fontLink) {
        fontLink.remove();
      }
      
      // Restore original font family if it was set
      if (originalFontFamily) {
        body.style.fontFamily = originalFontFamily;
      } else {
        body.style.fontFamily = '';
      }
    };
  }, []);

  return (
    <main className="admissions-page min-h-screen bg-background"
    >
      <Navbar />
      <Hero />
      <SectionSeparator variant="minimal" />
      <Stats />
      <SectionSeparator variant="default" />
      <About />
      <SectionSeparator variant="gradient" />
      <Philosophy />
      <SectionSeparator variant="dotted" />
      <ApplicationEssentials />
      <SectionSeparator variant="default" />
      <Services />
      <SectionSeparator variant="gradient" />
      <TrajectoryTimeline />
      <SectionSeparator variant="dotted" />
      <Masterclass />
      <SectionSeparator variant="default" />
      <Pricing />
      <SectionSeparator variant="gradient" />
      <Testimonials />
      <SectionSeparator variant="dotted" />
      <FAQ />
      <SectionSeparator variant="default" />
      <FinalCTA />
      <SectionSeparator variant="minimal" />
      <Contact />
      <SectionSeparator variant="minimal" />
      <Footer />
    </main>
  );
};

export default AdmissionsPage;
