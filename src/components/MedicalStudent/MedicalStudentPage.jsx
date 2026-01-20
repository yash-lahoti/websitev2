import React, { useEffect } from 'react';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, HomeView, Activity, Feedbacks } from '../index';
import './app/globals-medicalstudent.css';

const MedicalStudentPage = () => {
  useEffect(() => {
    const body = document.body;
    
    // Add body class to indicate Medical Student page is active
    body.classList.add('medicalstudent-active');
    
    // Ensure main app route class is applied
    const mainRoute = document.querySelector('.medicalstudent-page');
    if (mainRoute) {
      mainRoute.classList.add('main-app-route');
    }

    return () => {
      // Cleanup: remove body class when component unmounts
      body.classList.remove('medicalstudent-active');
    };
  }, []);

  return (
    <main className="medicalstudent-page main-app-route relative z-0 bg-primary min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <Experience />
      <Works />
      <Feedbacks />
      <HomeView />
      <Activity />
      <Contact />
    </main>
  );
};

export default MedicalStudentPage;
