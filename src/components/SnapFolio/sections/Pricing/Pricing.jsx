import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Pricing.module.scss';
import AOS from 'aos';

const Pricing = () => {
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

  const pricingData = data.pricing || {};
  const packages = pricingData.packages || [];

  return (
    <section id="pricing" className={`${styles.pricing} snapfolio-section light-background`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <h2>{pricingData.title}</h2>
          <p>{pricingData.subtitle}</p>
        </div>

        <div className={`row ${styles.pricingContainer} justify-content-center`}>
          {packages.map((pkg, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className={`${styles.pricingCard} ${pkg.popular ? styles.popular : ''}`} data-aos="fade-up" data-aos-delay={200 + index * 100}>
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <div className={styles.price}>
                  {pkg.price}
                  {pkg.period && <span className="period">/{pkg.period}</span>}
                </div>
                <p className={styles.description}>{pkg.description}</p>
                <ul className={styles.featuresList}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact" className={styles.ctaButton}>
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

