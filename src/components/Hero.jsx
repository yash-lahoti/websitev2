import { motion } from "framer-motion";
import { styles } from "../styles";
import { isMobile } from "react-device-detect";
import NeuronCanvas from "./canvas/Neuron.jsx";
import Neuron from "./canvas/Neuron.jsx";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-6xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className='text-[#915EFF]'>Yash Lahoti</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Medical Student
          </p>
           <br />
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            AI/ML Engineer
          </p>
           <br />
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
           Entrepreneur
          </p>
            <a href='/documents/Yash_Lahoti_Resume_2023.pdf' download='Yash_Lahoti_Resume_2023.pdf'>
              <button className='px-6 py-2 mt-4 mr-4 text-white bg-[#915EFF] rounded-lg'>
              Download CV
            </button>
          </a>
          <a href='/documents/Yash_Lahoti_Resume_2023.pdf' download='Yash_Lahoti_Resume_2023.pdf'>
              <button className='px-6 py-2 mt-4 text-white bg-[#915EFF] rounded-lg'>

              Other
            </button>
          </a>
            <br />
        </div>
          <NeuronCanvas isMobile={isMobile} />
      </div>



    </section>
  );
};

export default Hero;
