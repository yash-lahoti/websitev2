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
  const whoBenefits = pricingData.who_benefits || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" className={`${styles.pricing} snapfolio-section light-background`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <h2>{pricingData.title}</h2>
          <p>{pricingData.subtitle}</p>
          <div className={styles.baseRate}>
            <span className={styles.baseRateLabel}>Base Rate:</span>
            <span className={styles.baseRateValue}>${pricingData.base_hourly_rate}/hour</span>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className={`row ${styles.pricingContainer} justify-content-center`}>
          {packages.map((pkg, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className={`${styles.pricingCard} ${pkg.popular ? styles.popular : ''}`} data-aos="fade-up" data-aos-delay={200 + index * 100}>
                {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}
                
                <div className={styles.cardHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <div className={styles.engagementTime}>{pkg.engagement_time}</div>
                </div>

                <div className={styles.priceSection}>
                  <div className={styles.price}>
                    {formatPrice(pkg.final_price)}
                  </div>
                  {pkg.discount_percent > 0 && (
                    <div className={styles.discountInfo}>
                      <span className={styles.originalPrice}>{formatPrice(pkg.base_price)}</span>
                      <span className={styles.discountBadge}>Save {pkg.discount_percent}%</span>
                    </div>
                  )}
                  <div className={styles.pricePerHour}>
                    ${pkg.price_per_hour}/hour • {pkg.hours} hours
                  </div>
                </div>

                <p className={styles.description}>{pkg.description}</p>

                <div className={styles.featuresSection}>
                  <h5 className={styles.featuresTitle}>What's Included:</h5>
                  <ul className={styles.featuresList}>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="bi bi-check-circle-fill"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.use_cases && pkg.use_cases.length > 0 && (
                  <div className={styles.useCasesSection}>
                    <h5 className={styles.useCasesTitle}>Ideal For:</h5>
                    <ul className={styles.useCasesList}>
                      {pkg.use_cases.map((useCase, idx) => (
                        <li key={idx}>
                          <i className="bi bi-arrow-right-circle"></i>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a href="#contact" className={styles.ctaButton}>
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Who Benefits Section */}
        {whoBenefits.title && (
          <div className={styles.whoBenefitsSection} data-aos="fade-up" data-aos-delay="400">
            <div className={styles.whoBenefitsHeader}>
              <h3 className={styles.whoBenefitsTitle}>{whoBenefits.title}</h3>
              {whoBenefits.description && (
                <p className={styles.whoBenefitsDescription}>{whoBenefits.description}</p>
              )}
            </div>
            
            {whoBenefits.beneficiaries && (
              <div className="row g-4">
                {whoBenefits.beneficiaries.map((beneficiary, index) => (
                  <div key={index} className="col-lg-6 col-md-6">
                    <div className={styles.beneficiaryCard} data-aos="fade-up" data-aos-delay={500 + index * 100}>
                      <div className={styles.beneficiaryIcon}>
                        <i className="bi bi-person-check"></i>
                      </div>
                      <h5 className={styles.beneficiaryTitle}>{beneficiary.title}</h5>
                      <p className={styles.beneficiaryDescription}>{beneficiary.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;

