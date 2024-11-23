import { motion } from "framer-motion";
import { styles } from "../styles";
import { isMobile } from "react-device-detect";
import NeuronCanvas from "./canvas/Neuron.jsx";

const Hero = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Increased delay between animations
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={`relative w-full h-[95vh] mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-6xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5 -ml-10">
          {/* Changed color of the horizontal bar */}
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <motion.div
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className={`${styles.heroHeadText} text-white`}
            variants={textVariants}
          >
            <span className="text-white-100">Yash Lahoti</span>
          </motion.h1>
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            variants={textVariants}
          >
            Medical Student
          </motion.p>
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            variants={textVariants}
          >
            AI/ML Engineer
          </motion.p>
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            variants={textVariants}
          >
            Entrepreneur
          </motion.p>
          <motion.a
            href="/documents/Yash_Lahoti_Resume_2024.pdf"
            download="Yash_Lahoti_Resume_2024.pdf"
            variants={textVariants}
          >
            <button className="px-6 py-2 mt-4 mr-4 bg-quart text-accent rounded-lg">
              Download CV
            </button>
          </motion.a>
        </motion.div>

        <NeuronCanvas isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Hero;
