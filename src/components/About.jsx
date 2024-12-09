import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-stretch gap-10">
      {/* Left Section - Text Content */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.div variants={textVariant()}>
          <div className="flex items-center">
            <h2 className={styles.sectionHeadText}>About</h2>
            <div
              className="h-[2px] bg-accent ml-4"
              style={{ width: "500px" }}
            ></div>
          </div>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          My name is <strong className="text-boldText">Yash Lahoti</strong>, and
          I am a{" "}
          <strong className="text-boldText">medical student</strong>,{" "}
          <strong className="text-boldText">machine learning engineer</strong>,
          and aspiring entrepreneur. Over the past 8 years, I have developed an{" "}
          <strong className="text-boldText">interdisciplinary knowledge</strong>{" "}
          of artificial intelligence and medicine.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.4, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          After completing my master’s education and ML startup experience, I
          decided to <strong className="text-boldText">join medical school</strong>{" "}
          in order to develop{" "}
          <strong className="text-boldText">medical domain expertise</strong>{" "}
          and ideate how digital health solutions can innovate future clinical
          practice.
          <br />
          <br />
          Since joining Mount Sinai, I have{" "}
          <strong className="text-boldText">
            interviewed 100+ clinicians, surgeons, patients, and healthcare
            workers
          </strong>{" "}
          to better understand the interaction between the healthcare ecosystem
          and key stakeholders. I have also received funding to create my own
          AI-driven digital health solution at Sinai BioDesign.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.7, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Outside of the classroom, I dedicate time towards{" "}
          <strong className="text-boldText">education and mentorship</strong>. I
          advise prospective medical students, mentor students interested in
          data science, and organize an annual{" "}
          <strong className="text-boldText">AI in Medicine lecture series</strong>{" "}
          highlighting industry leaders working at the forefront of AI.
        </motion.p>
      </div>

      {/* Right Section - Profile Picture */}
      {/* Right Section - Profile Picture */}
      <div className="w-full md:w-1/3 flex justify-center items-center">
        <motion.div
          variants={fadeIn("left", "spring", 0.5, 0.75)}
          className="relative rounded-lg shadow-xl h-full flex items-center justify-center"
        >
          {/* Border Container */}
          <div className="relative border-4 border-accent rounded-lg p-6 bg-transparent transition-all duration-300 hover:p-4">
            {/* Background Gap and Image */}
            <div className="rounded-lg overflow-hidden bg-lightest-navy relative">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default SectionWrapper(About, "about");
