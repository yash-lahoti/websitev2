import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, HomeView } from "./components";
import LoadingComponent from './components/LoadingComponent';

const App = () => {
  const [sampleData, setSampleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error("Failed to fetch data:", error));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingComponent duration={3000} colors={['#001f3f', '#FF851B']} />}
      {!loading && (
        <BrowserRouter>
          <div className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar />
              <Hero />
            </div>
            <About />
            <Experience />
            <HomeView articles={sampleData} />
            <Works />
            <Tech />
            <Contact />
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
