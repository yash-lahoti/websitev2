import React, { useEffect } from 'react';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { CredibilityBar } from './components/archive/credibility-bar';
import { About } from './components/about';
import { Philosophy } from './components/philosophy';
import { ApplicationEssentials } from './components/application-essentials';
import { Services } from './components/services';
import { ApplicationTimeline } from './components/application-timeline';
import { TrajectoryTimeline } from './components/trajectory-timeline';
import { Masterclass } from './components/masterclass';
import { Pricing } from './components/pricing';
import { Testimonials } from './components/testimonials';
import { FAQ } from './components/faq';
import { FinalCTA } from './components/final-cta';
import { Contact } from './components/archive/contact';
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

    // Load Playfair Display and Inter fonts from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    link.id = 'admissions-fonts';
    document.head.appendChild(link);

    return () => {
      // Cleanup: remove body class and font link when component unmounts
      body.classList.remove('admissions-active');

      const fontLink = document.getElementById('admissions-fonts');
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
      <SectionSeparator variant="default" />
      <About />
      <SectionSeparator variant="gradient" />
      <ApplicationEssentials />
      <SectionSeparator variant="default" />
      <Services />
      <SectionSeparator variant="gradient" />
      <ApplicationTimeline />
      <SectionSeparator variant="dotted" />
      <TrajectoryTimeline />
      <SectionSeparator variant="dotted" />
      <Masterclass />
      <SectionSeparator variant="default" />
      <Pricing />
      <SectionSeparator variant="dotted" />
      <FAQ />
      <SectionSeparator variant="default" />
      <FinalCTA />
      <SectionSeparator variant="minimal" />
      <Footer />
    </main>
  );
};

export default AdmissionsPage;
