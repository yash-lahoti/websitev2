import React, { useEffect } from 'react';
import { IDELayout } from './components/ide/ide-layout';
import { PhysicianLayout } from './components/physician/PhysicianLayout';
import { PhysicianHome } from './components/physician/PhysicianHome';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/globals.css';

const MedicalStudentPageContent = () => {
  const { viewMode } = useTheme();

  return viewMode === 'developer' ? (
    <IDELayout />
  ) : (
    <PhysicianLayout>
      <PhysicianHome />
    </PhysicianLayout>
  );
};

const MedicalStudentPage = () => {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    // Add classes to indicate Medical Student page is active
    body.classList.add('medicalstudent-active');
    html.classList.add('medicalstudent-active');

    // Load Geist fonts from Google Fonts (if not already loaded)
    const existingFontLink = document.getElementById('medicalstudent-geist-font');
    if (!existingFontLink) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap';
      link.rel = 'stylesheet';
      link.id = 'medicalstudent-geist-font';
      document.head.appendChild(link);
    }

    return () => {
      // Cleanup: remove classes when component unmounts
      body.classList.remove('medicalstudent-active');
      html.classList.remove('medicalstudent-active');

      // Optionally remove font link (but keep it for performance)
      // const fontLink = document.getElementById('medicalstudent-geist-font');
      // if (fontLink) {
      //   fontLink.remove();
      // }
    };
  }, []);

  return (
    <div className="medicalstudent-page">
      <ThemeProvider>
        <MedicalStudentPageContent />
      </ThemeProvider>
    </div>
  );
};

export default MedicalStudentPage;
