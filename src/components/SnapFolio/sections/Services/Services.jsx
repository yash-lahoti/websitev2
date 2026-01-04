import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Services.module.scss';
import AOS from 'aos';

const Services = () => {
  const { data, loading } = useSnapFolioData();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

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
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <i className="bi bi-check-circle"></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

