import React, { useRef, useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles.js";
import { SectionWrapper } from "../hoc/index.js";
import DynamicWebpage from "./DynamicWebpage";

const HomeView = () => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [publications, setPublications] = useState([]);
  const [articles, setArticles] = useState([]);
  const intervalRef = useRef(null);
  const intervalTime = 8000; // Set the interval to 8 seconds

  // Fetch publications and articles data when component mounts
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

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, intervalTime);

    return () => clearInterval(intervalRef.current); // Clear the interval on component unmount
  }, [articles]);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const toggleArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const currentArticle = articles[currentArticleIndex];
  const articleImage = currentArticle?.images?.[0];

  return (
    <div className="flex flex-col items-center text-secondary">
      <section className="w-11/12 p-8 rounded-2xl">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Research</p>
          <h3 className={styles.sectionHeadText}>Publications: {publications.length}</h3>
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
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
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

          {/* Article Carousel */}
          <motion.div
            className="sm:w-1/2 flex items-center justify-between relative"
            variants={fadeIn("up", "spring", 0.1, 0.5)}
          >
            <Tilt options={{ max: 5, scale: 1.1, speed: 400 }} className="w-full bg-black-200 p-6 rounded-lg shadow-card relative">
              {articleImage ? (
                <img
                  src={articleImage.url}
                  alt={articleImage.alt || "Article Image"}
                  className="rounded-lg w-full h-[400px] sm:h-[400px] mb-4"
                />
              ) : (
                <p>No image available</p>
              )}
              <h3 className="text-xl font-semibold text-white-100">{currentArticle?.mainContent?.title || "No Title Available"}</h3>
              <p className="text-secondary mt-2">{currentArticle?.mainContent?.description || "No Description Available"}</p>
              <button
                className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition"
                onClick={() => openModal(currentArticle)}
              >
                Learn More
              </button>
              <button
              className="absolute bottom-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
              onClick={toggleArticle}
            >
              Next Article
            </button>
            </Tilt>

          </motion.div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && selectedArticle && (
        <DynamicWebpage article={selectedArticle} onClose={closeModal} />
      )}
    </div>
  );
};

export default SectionWrapper(HomeView, "research");
