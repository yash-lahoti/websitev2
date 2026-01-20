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
  const points = philosophyData.points || [];
  const positivePoints = philosophyData.positive_points || [];

  return (
    <section id="philosophy" className={`${styles.philosophy} snapfolio-section light-background`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <span className="badge-text">{philosophyData.subtitle}</span>
          <h2>{philosophyData.title}</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className={styles.philosophyContent} data-aos="fade-up" data-aos-delay="200">
              <p className={styles.philosophyText}>{philosophyData.text}</p>
              
              {(points.length > 0 || positivePoints.length > 0) && (
                <div className={styles.comparisonContainer}>
                  <div className="row g-4">
                    {points.length > 0 && (
                      <div className="col-lg-6">
                        <div className={styles.symptomsCard} data-aos="fade-right" data-aos-delay="300">
                          <div className={styles.cardHeader}>
                            <div className={styles.headerIcon}>
                              <i className="bi bi-exclamation-triangle"></i>
                            </div>
                            <h4 className={styles.cardTitle}>The Symptoms of a Generic Application</h4>
                          </div>
                          <div className={styles.pointsList}>
                            {points.map((point, index) => (
                              <div key={index} className={styles.pointItem}>
                                <div className={styles.pointIcon}>
                                  <i className="bi bi-x-circle"></i>
                                </div>
                                <span className={styles.pointText}>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {positivePoints.length > 0 && (
                      <div className="col-lg-6">
                        <div className={styles.solutionsCard} data-aos="fade-left" data-aos-delay="300">
                          <div className={styles.cardHeader}>
                            <div className={styles.headerIcon}>
                              <i className="bi bi-check-circle"></i>
                            </div>
                            <h4 className={styles.cardTitle}>What We Build Instead</h4>
                          </div>
                          <div className={styles.pointsList}>
                            {positivePoints.map((point, index) => (
                              <div key={index} className={styles.pointItem}>
                                <div className={`${styles.pointIcon} ${styles.pointIconSuccess}`}>
                                  <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <span className={styles.pointText}>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;

