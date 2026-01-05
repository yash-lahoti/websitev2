import React, { useState, useEffect } from 'react';
import { useSnapFolioData } from './hooks/useSnapFolioData';
import useBootstrapLoader from './hooks/useBootstrapLoader';
import styles from './SnapFolioLayout.module.scss';
import './shared/snapfolio-bootstrap-overrides.scss';

const SnapFolioLayout = ({ children }) => {
  const [headerShow, setHeaderShow] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
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

  // Handle navigation click - close mobile menu and handle service links
  const handleNavClick = (e, href) => {
    if (headerShow) {
      setHeaderShow(false);
    }
    
    // Handle service anchor links - scroll to services section and let Services component handle expansion
    if (href && href.startsWith('#service-')) {
      e.preventDefault();
      // First scroll to services section
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Then update hash to trigger expansion in Services component
        setTimeout(() => {
          window.location.hash = href.replace('#', '');
        }, 300);
      }
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
                <a href="#hero" className="active" onClick={(e) => handleNavClick(e, '#hero')}>
                  <i className="bi bi-house navicon"></i>Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
                  <i className="bi bi-person navicon"></i> About
                </a>
              </li>
              <li>
                <a href="#philosophy" onClick={(e) => handleNavClick(e, '#philosophy')}>
                  <i className="bi bi-lightbulb navicon"></i> Philosophy
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    setServicesExpanded(!servicesExpanded);
                    handleNavClick(e, '#services');
                  }}
                  className={styles.servicesNavParent}
                >
                  <i className="bi bi-hdd-stack navicon"></i> Services
                  <i className={`bi ${servicesExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} ${styles.servicesChevron}`}></i>
                </a>
                {servicesExpanded && (
                  <ul className={styles.servicesSubmenu}>
                    {data?.core_services?.services?.map((service, index) => {
                      const serviceId = service.id || `service-${index}`;
                      const serviceIcons = [
                        'bi-diagram-3',
                        'bi-building',
                        'bi-people',
                        'bi-award'
                      ];
                      return (
                        <li key={serviceId}>
                          <a 
                            href={`#${serviceId}`} 
                            onClick={(e) => {
                              handleNavClick(e, `#${serviceId}`);
                              setServicesExpanded(false);
                            }}
                            className={styles.serviceNavItem}
                          >
                            <i className={`bi ${serviceIcons[index] || 'bi-circle'} navicon`}></i> {service.title.replace(/^\d+\.\s*/, '')}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li>
                <a href="#full-cycle" onClick={(e) => handleNavClick(e, '#full-cycle')}>
                  <i className="bi bi-arrow-repeat navicon"></i> Offerings
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}>
                  <i className="bi bi-currency-dollar navicon"></i> Pricing
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>
                  <i className="bi bi-question-circle navicon"></i> FAQ
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
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

