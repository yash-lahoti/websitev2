"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { educationWorkTimeline, profile } from "../../../lib/data";
import { Mail, MapPin, GraduationCap, ExternalLink, FileText, Linkedin } from "lucide-react";
import { EducationWorkTimeline } from "../timeline/education-work-timeline";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function ReadmeTab() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const educationTimeline = educationWorkTimeline.filter((item) => item.kind === "Education");
  const displayName = `${profile.name}, BAS, MSE`;

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 font-sans relative overflow-visible">
      <motion.div 
        className="max-w-5xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Section - Compact Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-8">
          {/* Left: Headshot */}
          <motion.div className="flex-shrink-0" variants={itemVariants}>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-card border-2 border-border">
              <img
                src="/images/lahoti-profile.png"
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div className="flex-1 min-w-0" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              {displayName}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.roles.map((role, index) => (
                <span
                  key={role}
                  className="text-sm md:text-base text-muted-foreground"
                >
                  {role}{index < profile.roles.length - 1 && " •"}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                Mount Sinai
              </span>
            </div>

            {/* Logo Buttons - Clean Icon Style with Descriptions */}
            <div className="flex flex-wrap gap-2 relative">
              <a
                href="/documents/Yash_Lahoti_Resume_2026.pdf"
                className="relative inline-flex items-center justify-center w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                onMouseEnter={() => setHoveredLink("resume")}
                onMouseLeave={() => setHoveredLink(null)}
                title="Download CV"
              >
                <FileText className="w-4 h-4 text-primary" />
                {hoveredLink === "resume" && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
                    Download Resume
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
                  </div>
                )}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center w-9 h-9 bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                onMouseEnter={() => setHoveredLink("linkedin")}
                onMouseLeave={() => setHoveredLink(null)}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-foreground" />
                {hoveredLink === "linkedin" && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
                    View LinkedIn Profile
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
                  </div>
                )}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Oculomics Foundation Model – compact glass tile */}
        <motion.a
          href="https://sinai-barry-center-hub.vercel.app/login"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-4 inline-flex items-center gap-3 rounded-lg border border-primary/25 bg-background/40 px-3 py-2 text-xs md:text-sm shadow-sm backdrop-blur-sm hover:border-primary/60 hover:bg-primary/10 transition-colors cursor-pointer"
          variants={itemVariants}
        >
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-none bg-gradient-to-br from-primary/25 via-card to-background border border-primary/40 shadow-sm group-hover:border-primary/70 group-hover:shadow-md group-hover:shadow-primary/25 transition-all duration-300">
            <img
              src="/OPTIC-DX.png"
              alt="OPTIC-Dx ophthalmic AI logo"
              className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[1deg]"
            />
          </div>
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[11px] font-medium text-foreground md:text-xs">
                Building an Oculomics Foundation Model
                <span className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-1.5 py-[1px] text-[9px] font-semibold text-primary">
                  OPTIC-Dx
                </span>
              </p>
              <p className="mt-[2px] truncate text-[11px] text-muted-foreground">
                Click to open the live OPTIC-Dx initiative.
              </p>
              <p className="mt-[2px] text-[10px] text-muted-foreground/90">
                Username: <span className="font-mono text-foreground/90">foundation-model-proposal</span> · Password:{" "}
                <span className="font-mono text-foreground/90">OphthoSinaiAI</span>
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1 text-[11px] text-primary underline decoration-primary/60 underline-offset-2 group-hover:decoration-primary">
              Click to view
              <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </motion.a>

        {/* Divider */}
        <motion.div 
          className="flex items-center gap-3 mb-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* About Content - Condensed */}
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 md:gap-8 items-start">
            {/* Left: About text */}
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed min-w-0">
              <p>
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
            </div>

            {/* Right: Education timeline */}
            <aside className="min-w-0 md:sticky md:top-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-semibold text-foreground">Education timeline</h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <EducationWorkTimeline items={educationTimeline} variant="list" />
            </aside>
          </div>
        </motion.div>

        {/* Contact Links - Compact */}
        <motion.div 
          className="pt-4 border-t border-border"
          variants={itemVariants}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </a>
            <a
              href={profile.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Google Scholar</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
