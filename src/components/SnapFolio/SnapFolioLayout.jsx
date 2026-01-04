import React, { useState, useEffect } from 'react';
import { useSnapFolioData } from './hooks/useSnapFolioData';
import useBootstrapLoader from './hooks/useBootstrapLoader';
import styles from './SnapFolioLayout.module.scss';
import './shared/snapfolio-bootstrap-overrides.scss';

const SnapFolioLayout = ({ children }) => {
  const [headerShow, setHeaderShow] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const { data } = useSnapFolioData();
  
  // Dynamically load Bootstrap CSS only when this component is mounted
  useBootstrapLoader();

  // Handle header toggle
  const handleHeaderToggle = () => {
    setHeaderShow(!headerShow);
  };

  // Handle scroll to top
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll position for scroll top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollTopActive(true);
      } else {
        setScrollTopActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  // Handle navigation click - close mobile menu
  const handleNavClick = () => {
    if (headerShow) {
      setHeaderShow(false);
    }
  };

  // Handle active nav item on scroll
  useEffect(() => {
    const handleScrollspy = () => {
      const navLinks = document.querySelectorAll(`.${styles.snapfolioNavmenu} a[href^="#"]`);
      const sections = document.querySelectorAll('section[id]');
      
      let current = '';
      const position = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (position >= sectionTop && position <= sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScrollspy);
    window.addEventListener('load', handleScrollspy);

    return () => {
      window.removeEventListener('scroll', handleScrollspy);
      window.removeEventListener('load', handleScrollspy);
    };
  }, []);

  // Add class to body when SnapFolio is active to scope Bootstrap styles
  useEffect(() => {
    document.body.classList.add('snapfolio-body-active');
    return () => {
      document.body.classList.remove('snapfolio-body-active');
    };
  }, []);

  return (
    <div className={styles.snapfolioBody}>
      <header 
        id="header" 
        className={`${styles.snapfolioHeader} ${headerShow ? styles.headerShow : ''} dark-background d-flex flex-column justify-content-center`}
      >
        <i 
          className={`${styles.headerToggle} bi ${headerShow ? 'bi-x' : 'bi-list'}`}
          onClick={handleHeaderToggle}
        />

        <div className={styles.headerContainer}>
          <nav id="navmenu" className={styles.snapfolioNavmenu}>
            <ul>
              <li>
                <a href="#hero" className="active" onClick={handleNavClick}>
                  <i className="bi bi-house navicon"></i>Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={handleNavClick}>
                  <i className="bi bi-person navicon"></i> About
                </a>
              </li>
              <li>
                <a href="#philosophy" onClick={handleNavClick}>
                  <i className="bi bi-lightbulb navicon"></i> Philosophy
                </a>
              </li>
              <li>
                <a href="#services" onClick={handleNavClick}>
                  <i className="bi bi-hdd-stack navicon"></i> Services
                </a>
              </li>
              <li>
                <a href="#full-cycle" onClick={handleNavClick}>
                  <i className="bi bi-arrow-repeat navicon"></i> Offerings
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={handleNavClick}>
                  <i className="bi bi-currency-dollar navicon"></i> Pricing
                </a>
              </li>
              <li>
                <a href="#faq" onClick={handleNavClick}>
                  <i className="bi bi-question-circle navicon"></i> FAQ
                </a>
              </li>
              <li>
                <a href="#contact" onClick={handleNavClick}>
                  <i className="bi bi-envelope navicon"></i> Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={`${styles.snapfolioMain} snapfolio-main`} id="main-content">
        {children}
      </main>

      <footer id="footer" className={`${styles.snapfolioFooter} snapfolio-footer position-relative`}>
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">iPortfolio</strong> <span>All Rights Reserved</span></p>
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>

      <a 
        href="#" 
        id="scroll-top" 
        className={`${styles.snapfolioScrollTop} snapfolio-scroll-top d-flex align-items-center justify-content-center ${scrollTopActive ? styles.active : ''}`}
        onClick={handleScrollTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default SnapFolioLayout;

