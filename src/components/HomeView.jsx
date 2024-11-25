import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles.js";
import { SectionWrapper } from "../hoc/index.js";

const HomeView = () => {
  const [publications, setPublications] = useState([]);
  const [activeTab, setActiveTab] = useState("Abstract/Poster");

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

  // Filter publications by active tab
  const filteredPublications = publications.filter(
    (pub) =>
      (activeTab === "Manuscripts" && pub.type === "Manuscript") ||
      (activeTab === "Presentation" && pub.type === "Presentation") ||
      (activeTab === "Abstract/Poster" && pub.type === "Abstract/Poster")
  );

  // Highlight "Lahoti, Y" in strings
  const highlightLahotiY = (text) => {
    const regex = /Lahoti, Y/g;
    return text.split(regex).reduce((acc, part, i, arr) => {
      acc.push(<span key={`part-${i}`}>{part}</span>);
      if (i < arr.length - 1) {
        acc.push(
          <span key={`highlight-${i}`} className="text-accent">
            Lahoti, Y
          </span>
        );
      }
      return acc;
    }, []);
  };

  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col items-center text-secondary">
      <section className="w-11/12 p-8 rounded-2xl">
        {/* Header */}
        <motion.div variants={textVariant()} className="flex flex-col items-center">
          <p className={styles.sectionSubText}>Research</p>
          <div
            className="h-[2px] bg-accent mt-4"
            style={{ width: "600px" }} // Adjust the width as needed
          ></div>
          <h4 className={styles.sectionHeadText}>Publications: {publications.length}</h4>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center space-x-8 mt-6 padding-top-100">
          {["Abstract/Poster", "Presentation", "Manuscripts"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 flex-shrink-0 rounded-t-lg text-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#FFB400] text-black"
                  : "bg-[#333] text-white hover:bg-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Publications List */}
        <motion.div
          className="w-full mt-6 p-4 rounded-lg shadow-md"
          variants={fadeIn("up", "spring", 0.2, 0.5)}
        >
          {filteredPublications.length > 0 ? (
            <AnimatePresence mode="wait">
              <ul className="space-y-4">
                {filteredPublications.map((pub, index) => (
                  <motion.li
                    key={pub.title} // Ensure unique key
                    className="flex items-start space-x-4 transition"
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {/* Numbering */}
                    <span className="font-bold text-gray-500">{index + 1}.</span>
                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-semibold">
                        {pub.pdf && pub.pdf.pdfUrl ? (
                          <a
                            href={pub.pdf.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors"
                          >
                            {highlightLahotiY(pub.title)}
                          </a>
                        ) : (
                          highlightLahotiY(pub.title)
                        )}
                      </p>
                      <p className="text-secondary text-sm">
                        {highlightLahotiY(pub.authors)}
                      </p>
                      {pub.conference && (
                        <p className="text-gray-400 text-xs">{pub.conference}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          ) : (
            <p>No publications available for this category.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default SectionWrapper(HomeView, "research");
