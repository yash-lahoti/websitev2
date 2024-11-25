import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Activity = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const tabContainerRef = useRef(null);

  // Fetch experiences data
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/data/experiences.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  // Tabs categories
  const categories = ["All", "Industry/Innovation", "Academic/Research", "Mentorship/Education"];

  // Filter experiences by active tab
  const filteredExperiences = experiences.filter(
    (exp) => activeTab === "All" || exp.category === activeTab
  );

  // Smooth scroll for tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tabContainerRef.current) {
      const tabElement = document.getElementById(`tab-${tab}`);
      tabContainerRef.current.scrollTo({
        left: tabElement.offsetLeft - 50,
        behavior: "smooth",
      });
    }
  };

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
          <p className={styles.sectionSubText}>Tasks I Have Worked On</p>
          <div className="h-[2px] bg-[#FFB400] mt-4" style={{ width: "600px" }}></div>
          <h4 className={styles.sectionHeadText}>Experiences</h4>
        </motion.div>

        {/* Tabs */}
        <div
          ref={tabContainerRef}
          className="flex overflow-x-auto space-x-4 mt-6 py-2 scrollbar-hide"
        >
          {categories.map((tab) => (
            <motion.button
              id={`tab-${tab}`}
              key={tab}
              className={`px-6 py-2 flex-shrink-0 rounded-t-lg text-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#FFB400] text-black"
                  : "bg-[#333] text-white hover:bg-gray-500"
              }`}
              onClick={() => handleTabClick(tab)}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Experiences List */}
        <motion.div
          className="w-full mt-6 p-4 rounded-lg shadow-md"
          variants={fadeIn("up", "spring", 0.2, 0.5)}
        >
          {filteredExperiences.length > 0 ? (
            <AnimatePresence mode="wait">
              <ul className="space-y-10">
                {filteredExperiences.map((exp, index) => (
                  <motion.li
                    key={exp.title}
                    variants={listItemVariants}
                    className="flex flex-col space-y-4 transition-all duration-300"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h5 className="text-xl font-bold text-white">
                      {exp.title}{" "}
                      <span className="text-[#FFB400]">
                        @ {exp.organization}
                      </span>
                    </h5>
                    <div className="flex items-center text-sm text-gray-400">
                      <p>{exp.duration}</p>
                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-[#FFB400] hover:text-[#FFD700] transition-colors duration-200"
                          title="View more"
                        >
                          {/* Use a proper icon for the link */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 10.5L21 3m-7.5 7.5v6.75A2.25 2.25 0 0111.25 18H5.25A2.25 2.25 0 013 15.75V9.75A2.25 2.25 0 015.25 7.5H12m5.25-4.5H15.75m5.25 0v3.75"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    <ul className="pl-5 text-sm text-gray-300 space-y-2">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[#FFB400] font-bold">{">"}</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          ) : (
            <p className="text-gray-400">No experiences available for this category.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default SectionWrapper(Activity, "activity");
