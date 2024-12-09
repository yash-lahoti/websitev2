import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, HomeView, Activity } from "./components";
import LoadingComponent from './components/LoadingComponent';

const App = () => {
  const [sampleData, setSampleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/data.json') // Adjust path if necessary to match the base
      .then((res) => res.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error("Failed to fetch data:", error));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter basename='/'>
      {loading && <LoadingComponent duration={1500} colors={['#001f3f', '#FF851B']} />}
      {!loading && (
        <Routes>
          {/* Route for the base URL */}
          <Route
            path="/medicalstudent"
            element={
              <div className="relative z-0 bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Navbar />
                  <Hero />
                </div>
                <About />
                <Experience />
                <Activity />
                <HomeView articles={sampleData} />
                <Works />
                <Tech />
                <Contact />
              </div>
            }
          />
          {/* Redirect `/medicalstudent` to `/` to render the same content */}
          <Route path="/" element={<Navigate to="/medicalstudent" />} />
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
