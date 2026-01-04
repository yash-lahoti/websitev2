import React, { useState, useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './About.module.scss';
import AOS from 'aos';

const About = () => {
  const { data, loading } = useSnapFolioData();
  const [activeDegree, setActiveDegree] = useState(0);

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

  const aboutData = data.about_me || {};
  const degrees = aboutData.degrees || [];
  const stats = aboutData.stats_grid || [];
  const ctaButtons = aboutData.cta_buttons || [];

  return (
    <section id="about" className={`${styles.about} snapfolio-section`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-5" data-aos="zoom-in" data-aos-delay="200">
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.profileImage}>
                  <img 
                    src={`/snapfolio/${aboutData.profile_image}`} 
                    alt="Profile Image" 
                    className="img-fluid"
                  />
                </div>
                <div className={styles.profileBadge}>
                  <i className="bi bi-check-circle-fill"></i>
                </div>
              </div>

              <div className={styles.profileContent}>
                <h3>{aboutData.name}</h3>
                <p className={styles.tagline}>{aboutData.tagline}</p>

                {/* Degree Tabs */}
                <div className={styles.degreeTabs}>
                  {degrees.map((degree, index) => (
                    <a
                      key={index}
                      href={degree.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.degreeTab} ${activeDegree === index ? 'active' : ''}`}
                      onMouseEnter={() => setActiveDegree(index)}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(degree.link, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <div className={styles.degreeTabContent}>
                        <div className={styles.degreeLogo}>
                          <img 
                            src={`/snapfolio/${degree.logo}`} 
                            alt={degree.alt}
                            className={styles.schoolLogo}
                          />
                        </div>
                        <div className={styles.degreeInfo}>
                          <span className={styles.degreeName}>{degree.degree}</span>
                          <span className={styles.degreeProgram}>{degree.program}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="300">
            <div className={styles.aboutContent}>
              <div className={styles.sectionHeader}>
                <span className={styles.badgeText}>{aboutData.subtitle}</span>
                <h2>{aboutData.title}</h2>
              </div>

              <div className={styles.description}>
                <p>{aboutData.bio}</p>
              </div>

              {aboutData.experience_list && aboutData.experience_list.length > 0 && (
                <div className={styles.detailsGrid}>
                  {aboutData.experience_list.map((exp, index) => (
                    <div key={index} className="detail-row">
                      <div className="detail-item">
                        <span className={styles.detailLabel}>{exp.label}</span>
                        <span className={styles.detailValue}>{exp.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.ctaSection}>
                {ctaButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`${styles.btn} ${button.style === 'primary' ? styles.btnPrimary : styles.btnOutline}`}
                    download={button.link.includes('.pdf')}
                  >
                    <i className={button.icon}></i>
                    {button.text}
                  </a>
                ))}
              </div>

              {/* Stats Grid 2x2 */}
              {stats.length > 0 && (
                <div className={styles.aboutStatsGrid}>
                  {stats.map((stat, index) => (
                    <div key={index} className={styles.aboutStatItem}>
                      <i className={`bi ${stat.icon}`}></i>
                      <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stat.number}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

