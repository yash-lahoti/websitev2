import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './FullCycle.module.scss';
import AOS from 'aos';

const FullCycle = () => {
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

  const fullCycleData = data.full_cycle || {};
  const features = fullCycleData.features || [];

  return (
    <section id="full-cycle" className={`${styles.fullCycle} snapfolio-section light-background`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <h2>{fullCycleData.title}</h2>
          <p>{fullCycleData.subtitle}</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.fullCycleContent} data-aos="fade-up" data-aos-delay="200">
              <h3>{fullCycleData.features_title}</h3>
              <ul className={styles.featuresList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullCycle;

