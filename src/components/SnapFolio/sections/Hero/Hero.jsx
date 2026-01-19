import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Hero.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
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

  const heroData = data.hero || {};
  const socialLinks = data.social_links || [];

  return (
    <section id="hero" className={`${styles.hero} snapfolio-section`}>
      <div className={styles.backgroundElements}>
        <div className={`${styles.bgCircle} ${styles.circle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.circle2}`}></div>
      </div>

      <div className={styles.heroContent}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
              <div className={styles.heroText}>
                <h1>
                  {heroData.title_top && <span>{heroData.title_top}</span>}
                  {heroData.title_bottom && (
                    <span className={styles.accentText}> {heroData.title_bottom}</span>
                  )}
                </h1>
                <h2>{heroData.name}</h2>
                <p className={styles.lead} style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                  {heroData.role}
                </p>
                <p className={styles.description}>{heroData.description}</p>

                <div className={styles.heroActions}>
                  {heroData.primary_cta && (
                    <a 
                      href={heroData.primary_cta_link} 
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {heroData.primary_cta}
                    </a>
                  )}
                  {heroData.secondary_cta && (
                    <a 
                      href={heroData.secondary_cta_link} 
                      className={`${styles.btn} ${styles.btnOutline}`}
                    >
                      {heroData.secondary_cta}
                    </a>
                  )}
                </div>

                <div className={styles.socialLinks}>
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className={styles.heroVisual}>
                <div className={styles.profileContainer}>
                  <div className={styles.profileBackground}></div>
                  <img 
                    src="/admission/assets/img/profile/profile-2.webp" 
                    alt={heroData.name || 'Profile'} 
                    className={styles.profileImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

