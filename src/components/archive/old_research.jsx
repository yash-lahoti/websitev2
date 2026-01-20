import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion.js";
import { styles } from "../../styles.js";
import { SectionWrapper } from "../../hoc/index.js";
import DynamicWebpage from "./DynamicWebpage";

const HomeView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [publications, setPublications] = useState([]);
  const [activePublication, setActivePublication] = useState(null);

  // Define a backup image URL
  const backupImageUrl = "images/spine-lab-bg.jpeg";

  // Fetch publications data when component mounts
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/data/pubs.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      }
    };
    fetchPublications();
  }, []);

  const openModal = (content) => {
    setSelectedArticle(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleMouseEnter = (pub) => {
    setActivePublication(pub); // Set active to retain display
  };

  return (
    <div className="flex flex-col items-center text-secondary">
      <section className="w-11/12 p-8 rounded-2xl">
      <motion.div variants={textVariant()} className="flex flex-col items-center">
        <div
          className="h-[2px] bg-accent mb-4"
          style={{ width: "600px" }} // Adjust the width as needed
        ></div>
        <p className={styles.sectionSubText}>Research</p>
        <h2 className={styles.sectionHeadText}>Publications: {publications.length}</h2>
        <div
          className="h-[2px] bg-accent mt-4"
          style={{ width: "600px" }} // Adjust the width as needed
        ></div>
      </motion.div>


        <div className="flex flex-col sm:flex-row gap-8">
          {/* Publications List */}
          <motion.div
            className="sm:w-1/2 overflow-y-scroll max-h-[700px] p-4 bg-black-200 rounded-lg shadow-md"
            variants={fadeIn("up", "spring", 0.1, 0.5)}
          >
            {publications.length > 0 ? (
              <ul className="space-y-4">
                {publications.map((pub, index) => (
                  <motion.li
                    key={index}
                    className="p-4 border border-quart rounded-lg cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(pub)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-semibold hover:underline"
                    >
                      {pub.conference} - {pub.type}
                    </a>
                    <p className="text-secondary">{pub.title}</p>
                    <p className="text-white-100 text-sm">{pub.authors}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p>Loading publications...</p>
            )}
          </motion.div>

          {/* Active Publication Display */}
          <motion.div
            className="sm:w-1/2 flex items-center justify-between relative"
            variants={fadeIn("up", "spring", 0.1, 0.5)}
          >
            <Tilt options={{ max: 5, scale: 1.1, speed: 400 }} className="w-full bg-black-200 p-6 rounded-lg shadow-card relative">
              {activePublication ? (
                activePublication.displayType === "none" ? (
                  // Placeholder view for items with displayType "none"
                  <div className="flex flex-col items-center">
                    <img src={backupImageUrl} alt="Placeholder Image" className="rounded-lg w-full h-[400px] sm:h-[400px] mb-4" />
                    <p className="text-white-100">Hover over a publication to see details.</p>
                  </div>
                ) : activePublication.displayType === "article" ? (
                  // Detailed Article View
                  <>
                    <img
                      src={activePublication.article.images?.[0]?.url || backupImageUrl}
                      alt={activePublication.article.images?.[0]?.alt || "Article Image"}
                      className="rounded-lg w-full h-[400px] sm:h-[400px] mb-4"
                    />
                    <h3 className="text-xl font-semibold text-white-100">
                      {activePublication.article.mainContent.title || "No Title Available"}
                    </h3>
                    <p className="text-secondary mt-2">
                      {activePublication.article.mainContent.description || "No Description Available"}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition"
                      onClick={() => openModal(activePublication.article)}
                    >
                      Learn More
                    </button>
                  </>
                ) : (
                  // PDF View with Thumbnail Fallback
                  <>
                    <img
                      src={activePublication.pdf.thumbnailUrl || backupImageUrl}
                      alt="PDF Thumbnail"
                      className="rounded-lg w-full h-[800px]] mb-4"
                    />
                    <p className="text-secondary mt-2">{activePublication.title}</p>
                    <a
                      href={activePublication.pdf.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition inline-block"
                    >
                      View PDF
                    </a>
                  </>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <img src={backupImageUrl} alt="Placeholder Image" className="rounded-lg w-full mb-4" />
                  <p className="text-white-100">Hover over a publication to see details.</p>
                </div>
              )}
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && selectedArticle && <DynamicWebpage article={selectedArticle} onClose={closeModal} />}
    </div>
  );
};

export default SectionWrapper(HomeView, "research");
