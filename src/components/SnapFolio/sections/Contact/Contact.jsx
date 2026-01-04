import React, { useEffect, useState } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './Contact.module.scss';
import AOS from 'aos';

const Contact = () => {
  const { data, loading } = useSnapFolioData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const contactData = data.contact || {};
  const infoItems = contactData.info?.items || [];
  const formInfo = contactData.form || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={`${styles.contact} snapfolio-section`}>
      <div className="container snapfolio-section-title" data-aos="fade-up">
        <h2>{contactData.title}</h2>
        <p>{contactData.subtitle}</p>
      </div>

      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className={styles.infoBox}>
              <h3>{contactData.info?.title}</h3>
              <p>{contactData.info?.description}</p>
              {infoItems.map((item, index) => (
                <div key={index} className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div className={styles.content}>
                    <h4>{item.title}</h4>
                    {item.lines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7">
            <div className={styles.contactForm}>
              <h3>{formInfo.title}</h3>
              <p>{formInfo.description}</p>

              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className={styles.formControl}
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      className={styles.formControl}
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      name="subject"
                      className={styles.formControl}
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      name="message"
                      className={styles.formControl}
                      rows="6"
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12 text-center">
                    <button type="submit" className={styles.btn}>
                      Send Message <i className="bi bi-send"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

