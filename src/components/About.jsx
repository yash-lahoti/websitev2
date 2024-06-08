import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, url }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.7, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className='block'>
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-quart rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='object-contain'
          />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </a>
    </motion.div>
  </Tilt>
);


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me</h2>
      </motion.div>


        <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        My name is <strong>Yash Lahoti</strong>, and I am a <strong>medical student</strong>, <strong>machine learning engineer</strong>, and aspiring entrepreneur.
            Over the past 8 years, I have developed an <strong>interdisciplinary knowledge</strong> of artificial intelligence and medicine.

      </motion.p>


        <motion.p
        variants={fadeIn("", "", 0.4, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
          After completing my master’s education and ML startup experience, I decided to <strong>join medical school</strong> in order to
          develop <strong>medical domain expertise</strong> and ideate how digital health solutions can innovate future clinical practice.

          Since joining Mount Sinai, I have <strong>interviewed 100+ clinicians, surgeons, patients, and healthcare workers</strong> to better
          understand the interaction between the healthcare ecosystem and key stakeholders. I have also received funding to create my own AI-driven digital health solution at Sinai BioDesign.
          </motion.p>

        <motion.p
        variants={fadeIn("", "", 0.7, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
          Outside of the classroom, I dedicate time towards <strong>education and mentorship</strong>.
          I advise prospective medical students, mentor students interested in data science, and organize an annual <strong>AI in Medicine lecture series</strong> highlighting industry leaders working at the forefront of AI.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
