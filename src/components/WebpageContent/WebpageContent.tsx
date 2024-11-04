import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './WebpageContent.module.scss';
import ReactMarkdown from 'react-markdown';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function WebpageContent({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageData, setModalImageData] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const closeModal = () => {
    setModalImageData(null);
    setIsModalOpen(false);
  };

  const openModal = (imageData) => {
    setModalImageData(imageData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log('Webpage content updated:', data);
  
    // Any additional logic on content change can be placed here
  
    return () => {
      // Cleanup logic if necessary (e.g., resetting states, unsubscribing from events)
      console.log('Cleanup on component unmount or data change');
    };
  }, [data]); // Dependency array ensures this runs when 'data' changes

  return (
    <div className={styles.container}>
      {/* Header section */}
      <motion.header
        className={styles.header}
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.h1 variants={fadeInUp} className={styles.title}>
          {data.header.title}
        </motion.h1>
        <motion.h2 variants={fadeInUp} className={styles.subtitle}>
          {data.header.subtitle}
        </motion.h2>
        <motion.p variants={fadeInUp} className={styles.author}>
          {data.header.author}
        </motion.p>
        <motion.p variants={fadeInUp} className={styles.author}>
          {data.header.date}
        </motion.p>
        <motion.button
          variants={fadeInUp}
          className={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const link = document.createElement('a');
            link.href = data.header.subscribeButton;
            link.download = data.header.subscribeButton; // You can change the file name here if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className={styles.main}
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div className={styles.mainContent} variants={fadeInUp}>
          <h2>{data.mainContent.title}</h2>
          <h3>{data.mainContent.subtitle}</h3>
          <p>{data.mainContent.description}</p>
        </motion.div>

        <motion.div className={styles.statistics} variants={fadeInUp}>
          {data.statistics.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statistic}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className={styles.statTitle}>
                {stat.title}: {stat.value}
              </h4>
              <p className={styles.statDescription}>{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      {/* Figures Section */}
      <motion.section
        className={styles.figuresSection}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h2>Figures</h2>
        {data.images && data.images.length > 0 && (
          <motion.div className={styles.imageContainer} variants={fadeInUp}>
            <div className={styles.imageGrid}>
              {data.images.map((image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={image.url}
                    alt={image.alt || `Image ${index + 1}`}
                    className={styles.image}
                    width={500}
                    height={500}
                    onClick={() => openModal(image)}
                    priority={index === 0} // Priority for first image
                  />
                  <p className={styles.imageCaption}>
                    Figure {index + 1}: {image.alt}
                  </p>
                  {image.caption && (
                    <p className={styles.imageCaption}>{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Image Modal */}
      {isModalOpen && modalImageData && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImageData.url}
              alt={modalImageData.alt || 'Enlarged Image'}
              className={styles.modalImage}
              width={800}
              height={600}
            />
            <p className={styles.modalCaption}>
              {modalImageData.caption || modalImageData.alt}
            </p>
          </div>
        </div>
      )}

<motion.div className={styles.bottomSection} variants={fadeInUp}>
        {/* Navigation Bar */}
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            {data.contentSections.map((section, index) => (
              <li
                key={index}
                className={`${styles.navItem} ${
                  selectedSectionIndex === index ? styles.activeNavItem : ''
                }`}
                onClick={() => setSelectedSectionIndex(index)}
              >
                {section.heading}
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Section */}
        <motion.section
          className={styles.contentSection}
          key={selectedSectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>
              {data.contentSections[selectedSectionIndex].title}
            </h2>
            <ReactMarkdown className={styles.sectionHeading}>
              {data.contentSections[selectedSectionIndex].heading}
            </ReactMarkdown>
            <ul className={styles.contentList}>
              {data.contentSections[selectedSectionIndex].paragraphs.map(
                (para, idx) => (
                  <motion.li
                    key={idx}
                    className={styles.listItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.customCheckbox}
                      />
                      <span className={styles.customCheckboxVisual}></span>
                      <ReactMarkdown className={styles.markdownContent}>
                        {para}
                      </ReactMarkdown>
                    </label>
                  </motion.li>
                )
              )}
            </ul>
          </div>
        </motion.section>
      </motion.div>

      {/* References Section */}
      {data.references && data.references.length > 0 && (
        <div className={styles.references}>
          <h3>References</h3>
          <ul>
            {data.references.map((ref, index) => (
              <li key={index}>
                <a href={ref.link}>{ref.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
