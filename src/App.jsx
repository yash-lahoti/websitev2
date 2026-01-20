import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, HomeView, Activity } from "./components";
import AdmissionsPage from './components/Admissions/AdmissionsPage';
import TestPage from './components/TestPage';
import ComponentTester from './components/ComponentTester';

const App = () => {
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <BrowserRouter basename=''>
      <Routes>
        {/* Route for the base URL */}
        <Route
          path="/medicalstudent"
          element={
            <div className="main-app-route">
              <Contact />
            </div>
          }
        />
        {/* Admissions route */}
        <Route path="/admissions" element={<AdmissionsPage />} />
        {/* Component Tester route */}
        <Route path="/test" element={<ComponentTester />} />
        <Route path="/component-test" element={<ComponentTester />} />
        {/* Redirect `/medicalstudent` to `/` to render the same content */}
        <Route path="/" element={<Navigate to="/admissions" />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
