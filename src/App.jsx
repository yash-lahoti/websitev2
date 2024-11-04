import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, ImageGal, HomeView } from "./components";

const App = () => {
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <HomeView articles={sampleData} />
        <Works />
        <Tech />
        <div className='relative z-0'>
          <Contact />
          <ImageGal />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
