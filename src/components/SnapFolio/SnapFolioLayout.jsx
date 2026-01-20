import React, { useState, useEffect, useRef } from 'react';
import { useSnapFolioData } from './hooks/useSnapFolioData';
import useBootstrapLoader from './hooks/useBootstrapLoader';
import styles from './SnapFolioLayout.module.scss';
import './shared/snapfolio-bootstrap-overrides.scss';

// Define section IDs in order
const SECTIONS = ['hero', 'about', 'philosophy', 'services', 'full-cycle', 'pricing', 'faq', 'contact'];

const SnapFolioLayout = ({ children }) => {
  // Menu states: 'expanded' (full bar), 'collapsed' (minimal icons), 'hidden' (disappear)
  const [menuState, setMenuState] = useState('collapsed'); // Minimal (icon-only) by default
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionContainerRef = useRef(null);
  const { data } = useSnapFolioData();
  
  // Dynamically load Bootstrap CSS only when this component is mounted
  useBootstrapLoader();

  // Handle header toggle - cycle through: expanded -> collapsed -> hidden -> expanded
  const handleHeaderToggle = () => {
    if (menuState === 'expanded') {
      setMenuState('collapsed');
    } else if (menuState === 'collapsed') {
      setMenuState('hidden');
    } else {
      setMenuState('expanded');
    }
  };
  
  // Handle nav click - navigate but keep menu state
  const handleNavItemClick = (e, href) => {
    handleNavClick(e, href);
    // Don't close menu on nav click - only toggle button controls it
  };

  // Navigate to a specific section by index
  const goToSection = (index) => {
    if (index < 0 || index >= SECTIONS.length || index === currentSectionIndex || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    
    // Update URL hash
    const sectionId = SECTIONS[index];
    window.history.replaceState(null, '', `#${sectionId}`);
    
    // Update active section after transition starts
    setTimeout(() => {
      setCurrentSectionIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  // Navigate to next section
  const goToNext = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      goToSection(currentSectionIndex + 1);
    }
  };

  // Navigate to previous section
  const goToPrevious = () => {
    if (currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  };

  // Navigate to section by ID
  const goToSectionById = (sectionId) => {
    const index = SECTIONS.indexOf(sectionId);
    if (index !== -1) {
      goToSection(index);
    }
  };

  // Handle initial load from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const index = SECTIONS.indexOf(hash);
      if (index !== -1) {
        setCurrentSectionIndex(index);
      }
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const index = SECTIONS.indexOf(hash);
        if (index !== -1 && index !== currentSectionIndex) {
          setCurrentSectionIndex(index);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentSectionIndex]);

  // Handle navigation click - navigate to section
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Handle service anchor links - navigate to services section
    if (href && href.startsWith('#service-')) {
      // Navigate to services section first
      goToSectionById('services');
      // Then update hash to trigger expansion in Services component
      setTimeout(() => {
        window.location.hash = href.replace('#', '');
      }, 300);
    } else if (href) {
      const sectionId = href.replace('#', '');
      goToSectionById(sectionId);
    }
  };

  // Update active nav item based on current section
  useEffect(() => {
    const updateActiveNav = () => {
      const navLinks = document.querySelectorAll(`.${styles.snapfolioNavmenu} a[href^="#"]`);
      const currentSectionId = SECTIONS[currentSectionIndex];

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateActiveNav, 0);
    return () => clearTimeout(timeoutId);
  }, [currentSectionIndex]);

  // Add class to body when SnapFolio is active to scope Bootstrap styles
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    body.classList.add('snapfolio-body-active');
    const originalOverflowX = body.style.overflowX;
    const originalOverflowY = body.style.overflowY;
    const originalMinHeight = body.style.minHeight;
    const htmlOriginalOverflowX = html.style.overflowX;
    const htmlOriginalOverflowY = html.style.overflowY;
    const htmlOriginalMinHeight = html.style.minHeight;
    
    // Prevent horizontal scrolling, allow vertical page scrolling only
    body.style.overflowX = 'hidden';
    body.style.overflowY = 'auto'; // Page-level scrolling
    body.style.minHeight = '100vh'; // Ensure body fills viewport
    html.style.overflowX = 'hidden';
    html.style.overflowY = 'auto'; // Page-level scrolling
    html.style.minHeight = '100vh'; // Ensure html fills viewport
    
    return () => {
      body.classList.remove('snapfolio-body-active');
      body.style.overflowX = originalOverflowX;
      body.style.overflowY = originalOverflowY;
      body.style.minHeight = originalMinHeight;
      html.style.overflowX = htmlOriginalOverflowX;
      html.style.overflowY = htmlOriginalOverflowY;
      html.style.minHeight = htmlOriginalMinHeight;
    };
  }, []);

  // Update body class based on menu state for button positioning
  useEffect(() => {
    const body = document.body;
    body.classList.remove('menu-expanded', 'menu-collapsed', 'menu-hidden');
    body.classList.add(`menu-${menuState}`);
    
    return () => {
      body.classList.remove('menu-expanded', 'menu-collapsed', 'menu-hidden');
    };
  }, [menuState]);

  return (
    <div className={styles.snapfolioBody}>
      {/* Toggle button - always visible, top right */}
      <i 
        className={`${styles.headerToggle} bi ${
          menuState === 'expanded' ? 'bi-x' : 
          'bi-list'
        }`}
        onClick={handleHeaderToggle}
        title={
          menuState === 'expanded' ? 'Collapse to minimal' : 
          menuState === 'collapsed' ? 'Hide menu' : 
          'Show menu'
        }
      />
      
      <header 
        id="header" 
        className={`${styles.snapfolioHeader} ${menuState === 'expanded' ? styles.headerExpanded : ''} ${menuState === 'hidden' ? styles.headerHidden : ''} dark-background d-flex flex-column justify-content-center`}
      >

        <div className={styles.headerContainer}>
          <nav id="navmenu" className={styles.snapfolioNavmenu}>
            <ul>
              <li>
                <a href="#hero" onClick={(e) => handleNavItemClick(e, '#hero')} title="Home">
                  <i className="bi bi-house navicon"></i><span className={styles.navText}>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavItemClick(e, '#about')} title="About">
                  <i className="bi bi-person navicon"></i><span className={styles.navText}>About</span>
                </a>
              </li>
              <li>
                <a href="#philosophy" onClick={(e) => handleNavItemClick(e, '#philosophy')} title="Philosophy">
                  <i className="bi bi-lightbulb navicon"></i><span className={styles.navText}>Philosophy</span>
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    setServicesExpanded(!servicesExpanded);
                    goToSectionById('services');
                  }}
                  className={styles.servicesNavParent}
                  title="Services"
                >
                  <i className="bi bi-hdd-stack navicon"></i><span className={styles.navText}>Services</span>
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
                              handleNavItemClick(e, `#${serviceId}`);
                              setServicesExpanded(false);
                            }}
                            className={styles.serviceNavItem}
                          >
                            <i className={`bi ${serviceIcons[index] || 'bi-circle'} navicon`}></i><span className={styles.navText}> {service.title.replace(/^\d+\.\s*/, '')}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li>
                <a href="#full-cycle" onClick={(e) => handleNavItemClick(e, '#full-cycle')} title="Offerings">
                  <i className="bi bi-arrow-repeat navicon"></i><span className={styles.navText}>Offerings</span>
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavItemClick(e, '#pricing')} title="Pricing">
                  <i className="bi bi-currency-dollar navicon"></i><span className={styles.navText}>Pricing</span>
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavItemClick(e, '#faq')} title="FAQ">
                  <i className="bi bi-question-circle navicon"></i><span className={styles.navText}>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavItemClick(e, '#contact')} title="Contact">
                  <i className="bi bi-envelope navicon"></i><span className={styles.navText}>Contact</span>
                </a>
              </li>
              {/* Navigation Buttons - In same row as nav items */}
              <li className={styles.navButtonsContainer}>
                <button
                  className={`${styles.navButton} ${styles.navButtonPrev} ${currentSectionIndex === 0 ? styles.disabled : ''}`}
                  onClick={goToPrevious}
                  disabled={currentSectionIndex === 0 || isTransitioning}
                  aria-label="Previous section"
                  title="Previous"
                >
                  <i className="bi bi-chevron-left"></i>
                  <span className={styles.navText}>Previous</span>
                </button>
                <button
                  className={`${styles.navButton} ${styles.navButtonNext} ${currentSectionIndex === SECTIONS.length - 1 ? styles.disabled : ''}`}
                  onClick={goToNext}
                  disabled={currentSectionIndex === SECTIONS.length - 1 || isTransitioning}
                  aria-label="Next section"
                  title="Next"
                >
                  <span className={styles.navText}>Next</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={`${styles.snapfolioMain} snapfolio-main`} id="main-content">
        <div 
          ref={sectionContainerRef}
          className={`${styles.sectionContainer} ${isTransitioning ? styles.transitioning : ''}`}
        >
          {React.Children.map(children, (child, index) => {
            const sectionId = SECTIONS[index];
            const isActive = index === currentSectionIndex;
            return (
              <div
                key={sectionId}
                className={`${styles.sectionWrapper} ${isActive ? styles.active : styles.hidden}`}
                data-section-id={sectionId}
              >
                {child}
              </div>
            );
          })}
        </div>
      </main>

      <footer id="footer" className={`${styles.snapfolioFooter} snapfolio-footer position-relative`}>
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">Yash Lahoti</strong> <span>All Rights Reserved</span></p>
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">Yash Lahoti + AI Agent</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SnapFolioLayout;

