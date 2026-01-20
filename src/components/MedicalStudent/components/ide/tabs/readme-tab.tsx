"use client";

import { motion } from "framer-motion";
import { profile } from "../../../lib/data";
import { Github, Linkedin, Mail, MapPin, GraduationCap, FileText, ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function ReadmeTab() {
  return (
    <div className="min-h-full p-8 md:p-12 lg:p-16 font-sans">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          {/* Left: Text Content */}
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-20 bg-primary rounded-full" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  {profile.name}
                </h1>
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              {profile.roles.map((role, index) => (
                <motion.p
                  key={role}
                  className="text-xl md:text-2xl text-muted-foreground font-light"
                  variants={itemVariants}
                  custom={index}
                >
                  {role}
                </motion.p>
              ))}
            </div>

            <motion.div 
              className="flex items-center gap-6 text-sm text-muted-foreground mb-8"
              variants={itemVariants}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {profile.location}
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                Mount Sinai
              </span>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
              <a
                href="/documents/Yash_Lahoti_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <FileText className="w-4 h-4" />
                Download CV
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-4 lg:gap-6"
            variants={itemVariants}
          >
            {Object.entries(profile.stats).map(([key, value]) => (
              <div
                key={key}
                className="p-5 bg-card rounded-xl border border-border"
              >
                <p className="text-3xl font-bold text-primary mb-1">{value}</p>
                <p className="text-sm text-muted-foreground capitalize">{key}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="flex items-center gap-4 mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-foreground">About</h2>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* About Content */}
        <motion.div 
          className="space-y-6 text-muted-foreground leading-relaxed"
          variants={itemVariants}
        >
          <p className="text-lg">
            My name is <span className="text-foreground font-medium">Yash Lahoti</span>, and I am a{" "}
            <span className="text-foreground font-medium">medical student</span>,{" "}
            <span className="text-foreground font-medium">ML engineer</span>, and aspiring entrepreneur. 
            Over the past 8 years, I have developed an interdisciplinary knowledge of{" "}
            <span className="text-foreground font-medium">artificial intelligence</span> and{" "}
            <span className="text-foreground font-medium">medicine</span>.
          </p>
          
          {profile.aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Contact Links */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border"
          variants={itemVariants}
        >
          <div className="flex flex-wrap gap-6">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{profile.email}</span>
            </a>
            <a
              href={profile.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Google Scholar</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
