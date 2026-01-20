import React, { useEffect, useState } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './FullCycle.module.scss';
import AOS from 'aos';

const FullCycle = () => {
  const { data, loading } = useSnapFolioData();
  const [selectedFolder, setSelectedFolder] = useState(null);

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

  // Course offerings data organized by category
  const courseCategories = {
    'Upskill with AI': [
      {
        title: 'Learn AI in Education',
        icon: 'bi-robot',
        description: 'Master AI tools and strategies to enhance your educational journey and academic productivity.',
        keyPoints: [
          'AI-powered research assistance',
          'Automated study planning',
          'Content generation for essays',
          'Data analysis for research',
          'Personalized learning strategies'
        ],
        duration: '4-6 weeks',
        format: 'Online',
        targetAudience: 'Students and educators'
      }
    ],
    'Admission Cycle': [
      {
        title: 'Crafting Your Medical School Personal Statement',
        icon: 'bi-pencil-square',
        description: 'Write a compelling personal statement that tells your unique story and stands out to admissions committees.',
        keyPoints: [
          'Story structure and narrative',
          'Identifying your unique angle',
          'Writing techniques and style',
          'Common pitfalls to avoid',
          'Revision and refinement',
          'Multiple drafts review'
        ],
        duration: '3-4 weeks',
        format: 'Online',
        targetAudience: 'Pre-medical students'
      },
      {
        title: 'Interview Preparation for Medical School',
        icon: 'bi-chat-dots',
        description: 'Master both MMI and traditional interview formats to excel in medical school admissions.',
        keyPoints: [
          'MMI format mastery',
          'Traditional interview prep',
          'Common question strategies',
          'Ethical scenario analysis',
          'Mock interview practice',
          'Confidence building techniques'
        ],
        duration: '4-5 weeks',
        format: 'Hybrid',
        targetAudience: 'Medical school applicants'
      },
      {
        title: 'Networking for Pre-Med Students',
        icon: 'bi-people',
        description: 'Develop effective networking strategies to build meaningful connections in the medical field.',
        keyPoints: [
          'Professional networking basics',
          'LinkedIn optimization',
          'Email outreach strategies',
          'Conference networking',
          'Mentor relationships',
          'Follow-up best practices'
        ],
        duration: '2-3 weeks',
        format: 'Online',
        targetAudience: 'Pre-medical students'
      },
      {
        title: 'Time Management for Pre-Med Students',
        icon: 'bi-clock',
        description: 'Learn to balance academics, research, extracurriculars, and personal life effectively.',
        keyPoints: [
          'Priority matrix techniques',
          'Study schedule optimization',
          'Research time allocation',
          'Extracurricular balance',
          'Stress management',
          'Productivity tools and apps'
        ],
        duration: '2-3 weeks',
        format: 'Online',
        targetAudience: 'Pre-medical students'
      }
    ],
    'Professional Development': [
      {
        title: 'How to Get Published with Clinical Research',
        icon: 'bi-file-earmark-medical',
        description: 'Comprehensive guide to navigating the clinical research publication process from conception to acceptance.',
        keyPoints: [
          'Research design and methodology',
          'IRB approval process',
          'Data collection and analysis',
          'Manuscript writing and formatting',
          'Journal selection and submission',
          'Peer review navigation'
        ],
        duration: '8-12 weeks',
        format: 'Hybrid',
        targetAudience: 'Medical students and researchers'
      },
      {
        title: 'Setting Up a Personal Website',
        icon: 'bi-globe',
        description: 'Build and launch your professional website to showcase your achievements and establish your online presence.',
        keyPoints: [
          'Domain and hosting setup',
          'Website design principles',
          'Content creation and optimization',
          'SEO basics',
          'Portfolio integration',
          'Maintenance and updates'
        ],
        duration: '2-3 weeks',
        format: 'Online',
        targetAudience: 'Professionals and students'
      },
      {
        title: 'Building a Research Portfolio',
        icon: 'bi-folder2-open',
        description: 'Create a strong research profile that demonstrates your scientific contributions and expertise.',
        keyPoints: [
          'Research project selection',
          'Documentation and presentation',
          'Publication strategy',
          'Conference presentations',
          'Collaboration building',
          'Portfolio organization'
        ],
        duration: '6-8 weeks',
        format: 'Hybrid',
        targetAudience: 'Research-oriented students'
      }
    ]
  };

  // Flatten all courses into a single array with category info
  const allCourses = Object.entries(courseCategories).flatMap(([category, courses]) =>
    courses.map(course => ({ ...course, category }))
  );

  const handleFolderClick = (course) => {
    setSelectedFolder(course);
  };

  const handlePreviousCourse = () => {
    if (!selectedFolder) return;
    const currentIndex = allCourses.findIndex(c => 
      c.title === selectedFolder.title && c.category === selectedFolder.category
    );
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : allCourses.length - 1;
    setSelectedFolder(allCourses[previousIndex]);
  };

  const handleNextCourse = () => {
    if (!selectedFolder) return;
    const currentIndex = allCourses.findIndex(c => 
      c.title === selectedFolder.title && c.category === selectedFolder.category
    );
    const nextIndex = currentIndex < allCourses.length - 1 ? currentIndex + 1 : 0;
    setSelectedFolder(allCourses[nextIndex]);
  };

  return (
    <section id="full-cycle" className={`${styles.fullCycle} snapfolio-section`}>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="snapfolio-section-title text-center">
          <span className="badge-text">Course Offerings</span>
          <h2>Example Packages & Sessions</h2>
          <p>Explore our curated selection of courses designed to enhance your academic and professional journey</p>
        </div>

        {/* Top Section - Wide Horizontal Details Panel */}
        {selectedFolder ? (
          <div className={styles.courseDetails} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.detailsContent}>
              <div className={styles.detailsHeader}>
                {/* Navigation Buttons */}
                <div className={styles.detailsNavigation}>
                  <button 
                    className={styles.navButton}
                    onClick={handlePreviousCourse}
                    aria-label="Previous course"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button 
                    className={styles.navButton}
                    onClick={handleNextCourse}
                    aria-label="Next course"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className={styles.detailsIcon}>
                  <i className={`bi ${selectedFolder.icon}`}></i>
                </div>
                <div className={styles.detailsTitleSection}>
                  <div className={styles.detailsCategory}>{selectedFolder.category}</div>
                  <h2>{selectedFolder.title}</h2>
                  <div className={styles.detailsQuickMeta}>
                    <span className={styles.detailsMetaBadge}>
                      <i className="bi bi-clock"></i> {selectedFolder.duration}
                    </span>
                    <span className={styles.detailsMetaBadge}>
                      <i className="bi bi-laptop"></i> {selectedFolder.format}
                    </span>
                    <span className={styles.detailsMetaBadge}>
                      <i className="bi bi-people"></i> {selectedFolder.targetAudience}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsBody}>
                <div className={styles.detailsMainContent}>
                  <div className={styles.detailsLeft}>
                    <div className={styles.detailsDescription}>
                      <p>{selectedFolder.description}</p>
                    </div>

                    <div className={styles.detailsKeyPointsSection}>
                      <h4>
                        <i className="bi bi-star-fill"></i>
                        What You'll Learn
                      </h4>
                      <div className={styles.detailsKeyPointsGrid}>
                        {selectedFolder.keyPoints.map((point, idx) => (
                          <div key={idx} className={styles.detailsKeyPointItem}>
                            <div className={styles.detailsKeyPointIcon}>
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.detailsCtaSection}>
                      <a 
                        href="#contact" 
                        className={styles.detailsCtaButton}
                      >
                        <i className="bi bi-envelope"></i>
                        <span>Inquire About This Course</span>
                        <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>

                  <div className={styles.detailsImageSlot}>
                    <div className={styles.imagePlaceholder}>
                      <i className="bi bi-image"></i>
                      <span>Course Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.detailsPlaceholder} data-aos="fade-up" data-aos-delay="200">
            <i className="bi bi-folder2-open"></i>
            <h3>Select a Course</h3>
            <p>Choose a course from the options below to view detailed information</p>
          </div>
        )}

        {/* Bottom Section - Compact Course Cards Grid by Category */}
        <div className={styles.coursesBottomSection} data-aos="fade-up" data-aos-delay="300">
          {Object.entries(courseCategories).map(([category, courses]) => (
            <div key={category} className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>
                <h3>{category}</h3>
              </div>
              <div className={styles.foldersGrid}>
                {courses.map((course, index) => {
                  const isActive = selectedFolder && selectedFolder.title === course.title && selectedFolder.category === course.category;
                  return (
                    <div
                      key={index}
                      className={`${styles.folderCard} ${isActive ? styles.folderCardActive : ''}`}
                      onClick={() => handleFolderClick(course)}
                    >
                      <div className={styles.folderTab}>
                        <i className={`bi ${course.icon}`}></i>
                      </div>
                      <div className={styles.folderBody}>
                        <h4>{course.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullCycle;

