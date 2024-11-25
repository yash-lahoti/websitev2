import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { link } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <Tilt
      className="w-full"
      options={{ max: 5, scale: 1, speed: 450 }}
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className={`flex flex-wrap mb-16 rounded-xl shadow-lg overflow-hidden bg-gray-800 ${
          index % 2 !== 0 ? "flex-row-reverse" : ""
        }`}
      >
        {/* Project Image */}
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt={`${name} project`}
            className="object-cover w-full h-full max-h-80 rounded-l-lg md:rounded-l-none md:rounded-r-lg"
          />
        </div>

        {/* Project Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-teal-500 mb-2 uppercase">
            Featured Project
          </h3>
          {/* Project Name and Visit Button */}
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFB400] hover:text-[#FFD700] transition-colors duration-200"
              title="Visit Project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5L21 3m-7.5 7.5v6.75A2.25 2.25 0 0111.25 18H5.25A2.25 2.25 0 013 15.75V9.75A2.25 2.25 0 015.25 7.5H12m5.25-4.5H15.75m5.25 0v3.75"
                />
              </svg>
            </a>
          </div>

          {/* Project Description */}
          <ul className="space-y-3">
            {description.map((desc, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-[#FFB400] font-bold">{">"}</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="mt-4">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`inline-block text-sm font-medium mr-2 py-1 px-2 rounded bg-gray-700 text-gray-300`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};




const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-center">
        <p className={`${styles.sectionSubText} text-center`}>
          Innovation Portfolio
        </p>
        <div
          className="h-[2px] bg-accent mt-4"
          style={{ width: "600px" }}
        ></div>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Selected Projects
        </h2>
      </motion.div>

      <div className="mt-20 space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};


export default SectionWrapper(Works, "projects");
