import React, { useState, useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './FAQ.module.scss';
import AOS from 'aos';

const FAQ = () => {
  const { data, loading } = useSnapFolioData();
  const [activeIndex, setActiveIndex] = useState(null);

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

  const faqData = data.faq || {};
  const items = faqData.items || [];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`${styles.faq} snapfolio-section`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <h2>{faqData.title}</h2>
          <p>{faqData.subtitle}</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.faqContainer} data-aos="fade-up" data-aos-delay="200">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <div
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                  >
                    <h4>{item.question}</h4>
                    <i className={`bi bi-chevron-down ${styles.faqIcon}`}></i>
                  </div>
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

