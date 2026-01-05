import React, { useEffect, useState } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Services.module.scss';
import AOS from 'aos';

const Services = () => {
  const { data, loading } = useSnapFolioData();
  const [expandedService, setExpandedService] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Handle URL hash navigation on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('service-')) {
        const serviceId = hash;
        setExpandedService(serviceId);
        // Scroll to the service section if needed
        setTimeout(() => {
          const element = document.getElementById(serviceId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleServiceClick = (serviceId) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
      // Remove hash if collapsing
      if (window.location.hash === `#${serviceId}`) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      setExpandedService(serviceId);
      // Update URL hash
      window.history.replaceState(null, '', `#${serviceId}`);
    }
  };

  if (loading || !data) {
    return null;
  }

  const servicesData = data.core_services || {};
  const services = servicesData.services || [];

  return (
    <section id="services" className={`${styles.services} snapfolio-section`}>
      <div className="container snapfolio-section-title" data-aos="fade-up">
        <h2>{servicesData.title}</h2>
        <p>{servicesData.subtitle}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Expanded showcase card */}
        {expandedService && (() => {
          const expandedIndex = services.findIndex(s => (s.id || `service-${services.indexOf(s)}`) === expandedService);
          const service = services[expandedIndex];
          const serviceId = service?.id || `service-${expandedIndex}`;
          
          if (!service) return null;
          
          return (
            <div key={`expanded-${expandedIndex}`} className={styles.expandedContainer}>
              <div 
                id={serviceId}
                className={`${styles.serviceCard} ${styles.expandedShowcase}`}
                onClick={() => handleServiceClick(serviceId)}
              >
                <div className={styles.showcaseHeader}>
                  <div className={styles.showcaseIconWrapper}>
                    <div className={styles.serviceIcon}>
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className={styles.showcaseTitleSection}>
                      <h3>{service.title}</h3>
                      <p className={styles.serviceDesc}>{service.desc}</p>
                    </div>
                  </div>
                  <i className={`bi bi-x-lg ${styles.closeIcon}`}></i>
                </div>
                
                {service.detail && (
                  <div className={styles.serviceDetail}>
                    <div className={styles.detailContent}>
                      <p>{service.detail}</p>
                    </div>
                  </div>
                )}

                {service.benefits && service.benefits.length > 0 && (
                  <div className={styles.benefitsSection}>
                    <div className={styles.benefitsHeader}>
                      <div className={styles.benefitsIcon}>
                        <i className="bi bi-arrow-right-circle"></i>
                      </div>
                      <h4 className={styles.benefitsTitle}>How You Stand Out</h4>
                    </div>
                    <div className={styles.benefitsList}>
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className={styles.benefitItem}>
                          <i className="bi bi-check-circle-fill"></i>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Horizontal tab-like layout for collapsed services */}
        <div className={styles.servicesTabs}>
          {services.map((service, index) => {
            const serviceId = service.id || `service-${index}`;
            const isExpanded = expandedService === serviceId;
            
            if (isExpanded) return null; // Don't show in tabs if expanded
            
            return (
              <div 
                key={index}
                id={serviceId}
                className={`${styles.serviceTab} ${isExpanded ? styles.active : ''}`}
                onClick={() => handleServiceClick(serviceId)}
              >
                <div className={styles.tabIcon}>
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className={styles.tabContent}>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
                <div className={styles.tabIndicator}>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

