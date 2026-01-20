import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../styles";

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
    <section className={`relative w-full min-h-[95vh] sm:h-[95vh] mx-auto overflow-x-hidden sm:overflow-hidden bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center`}>
      <div
        className={`relative sm:absolute sm:inset-0 sm:top-[120px] pt-28 sm:pt-0 max-w-6xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-5`}
      >
        <div className="hidden sm:flex flex-col justify-center items-center mt-5 -ml-10">
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <motion.a
              href="/documents/Yash_Lahoti_Resume_2025.pdf"
              download="Yash_Lahoti_Resume_2025.pdf"
              variants={textVariants}
            >
              <button className="px-6 py-2 mt-4 sm:mr-4 bg-quart text-accent rounded-lg w-full sm:w-auto">
                Download CV
              </button>
            </motion.a>
            <motion.div variants={textVariants}>
              <Link to="/admissions-consulting">
                <button className="px-6 py-2 mt-4 bg-quart text-accent rounded-lg w-full sm:w-auto">
                  Admissions Consultant
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
