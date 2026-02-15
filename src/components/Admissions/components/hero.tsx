"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const itemUpSlow = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const portrait = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const orb = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.3,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const scrollIndicator = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.9, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        variants={orb}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        variants={orb}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          className="text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Tag line */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            variants={itemUp}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium tracking-wide">
              PREMIER GRADUATE ADMISSIONS CONSULTING
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-serif"
            variants={itemUpSlow}
          >
            <span className="text-foreground leading-tight">Personalized Strategy for Competitive Graduate Admissions</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-sans"
            variants={itemUp}
          >
            We align your narrative, positioning, and school strategy into one compelling case for admissions readers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            variants={itemUp}
          >
            <Button size="lg" className="text-lg px-8 py-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-sm" asChild>
              <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Portrait */}
        <motion.div
          className="relative w-full h-full min-h-[500px] flex items-center justify-center lg:justify-end"
          variants={portrait}
          initial="hidden"
          animate="visible"
        >
          <div className="relative z-10 w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />
            <img
              src="images/lahoti-profile.png"
              alt="Yash Lahoti - Medical Admissions Consultant"
              className="w-full h-full object-cover"
              loading="eager"
            />

            {/* Overlay Card on Portrait */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-background/90 backdrop-blur-md border border-primary/20 p-4 rounded-md shadow-lg">
              <p className="font-serif text-lg text-foreground">Yash Lahoti <span className="text-sm font-sans text-foreground ml-1">BAS, MSE, MD Candidate</span></p>
              <p className="text-xs text-primary mt-1 uppercase tracking-wider font-semibold">Icahn School of Medicine at Mount Sinai</p>
            </div>
          </div>

          {/* Decorative elements behind portrait */}
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        variants={scrollIndicator}
        initial="hidden"
        animate="visible"
      >
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </motion.div>
    </section>
  );
}
