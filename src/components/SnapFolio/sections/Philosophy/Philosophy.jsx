import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Philosophy.module.scss';
import AOS from 'aos';

const Philosophy = () => {
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

  const philosophyData = data.philosophy || {};

  return (
    <section id="philosophy" className={`${styles.philosophy} snapfolio-section light-background`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <span className="badge-text">{philosophyData.subtitle}</span>
          <h2>{philosophyData.title}</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.philosophyContent} data-aos="fade-up" data-aos-delay="200">
              <p className={`${styles.philosophyText} lead`}>{philosophyData.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;

