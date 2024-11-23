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
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className={`flex flex-wrap mb-16 rounded-lg shadow-lg border border-gray-700 overflow-hidden ${
        index % 2 !== 0 ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 p-4 bg-gray-900">
        <img
          src={image}
          alt={`${name} project image`}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gray-800">
        <h3 className="text-lg font-bold text-gray-400 mb-2">Featured Project</h3>
        <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
        <div className="mt-2 bg-gray-700 p-4 rounded-lg">
          {description.map((desc, index) => (
            <p key={index} className="text-gray-200">
              {desc}
            </p>
          ))}
        </div>
        <div className="mt-4">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`mr-2 text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <a
            href={source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-md shadow-md hover:bg-teal-600 hover:shadow-lg transition"
          >
            Visit Project
          </a>
        </div>
      </div>
    </motion.div>
  );
};


const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-center">
        <p className={`${styles.sectionSubText} text-center`}>
          Inovation Portfolio
        </p>
        <div
          className="h-[2px] bg-accent mt-4"
          style={{ width: "600px" }} // Adjust the width as needed
        ></div>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Selected Projects
        </h2>
      </motion.div>

      <div className="mt-20">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
