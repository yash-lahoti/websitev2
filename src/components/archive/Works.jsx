import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { styles } from "../../styles";
import { link } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects, experiences } from "../../constants";
import { fadeIn, textVariant } from "../../utils/motion";

const TimelineItem = ({ item, index }) => {
  const isTop = index % 2 === 0;

  return (
    <div className="relative w-72 h-56 flex-shrink-0 snap-center">
      {/* Connector line */}
      <div
        className={`absolute left-1/2 w-px bg-white/10 -translate-x-1/2 ${
          isTop ? "top-0 h-1/2" : "top-1/2 h-1/2"
        }`}
      />

      {/* Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-3 h-3 rounded-full bg-[#FFB400] shadow-[0_0_0_6px_rgba(255,180,0,0.12)]" />
      </div>

      {/* Card */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-30 w-[260px] rounded-xl border border-white/10 bg-gray-800/80 backdrop-blur-sm shadow-lg px-4 py-3 ${
          isTop ? "top-0" : "bottom-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
            style={{ backgroundColor: item.iconBg || "#111827" }}
          >
            {item.icon ? (
              <img
                src={item.icon}
                alt={item.company_name}
                className="w-7 h-7 object-contain"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">{item.date}</p>
            <h3 className="text-sm font-semibold text-white leading-snug truncate">
              {item.title}
            </h3>
            <p className="text-xs text-gray-300 truncate">{item.company_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationWorkTimeline = () => {
  return (
    <div className="w-full mt-10">
      {/* Desktop: horizontal alternating timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Axis */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
          <div className="overflow-x-auto pb-6 pt-6">
            <div className="flex gap-6 px-4 min-w-max snap-x snap-mandatory">
              {experiences.map((item, index) => (
                <TimelineItem key={`${item.title}-${item.date}-${index}`} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">
          Scroll horizontally to explore — Education and work milestones alternate above/below the timeline.
        </p>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        <div className="relative pl-5">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-4">
            {experiences.map((item, index) => (
              <div key={`${item.title}-${item.date}-${index}`} className="relative">
                <div className="absolute left-2 top-4 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FFB400] shadow-[0_0_0_6px_rgba(255,180,0,0.12)]" />
                <div className="rounded-xl border border-white/10 bg-gray-800/80 backdrop-blur-sm shadow-lg px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
                      style={{ backgroundColor: item.iconBg || "#111827" }}
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.company_name}
                          className="w-7 h-7 object-contain"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{item.date}</p>
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-300">{item.company_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    x.set(mouseX / (rect.width / 2));
    y.set(mouseY / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-full"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
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
    </motion.div>
  );
};




const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-center">
        <p className={`${styles.sectionSubText} text-center`}>
          Education / Work
        </p>
        <div
          className="h-[2px] bg-accent mt-4"
          style={{ width: "600px" }}
        ></div>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Timeline
        </h2>
      </motion.div>

      <EducationWorkTimeline />

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
