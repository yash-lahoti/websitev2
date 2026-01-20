"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../../../lib/data";
import { Briefcase, FlaskConical, GraduationCap, ExternalLink, ChevronRight } from "lucide-react";

const categories = ["All", "Industry/Innovation", "Academic/Research", "Mentorship/Education"];

const categoryIcons: Record<string, React.ElementType> = {
  "Industry/Innovation": Briefcase,
  "Academic/Research": FlaskConical,
  "Mentorship/Education": GraduationCap
};

export function ExperienceTab() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExperiences = experiences.filter(
    (exp) => activeCategory === "All" || exp.category === activeCategory
  );

  return (
    <div className="min-h-full p-4 sm:p-6 md:p-10 lg:p-14 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
            Making Sense of My Background
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 sm:w-16 h-px bg-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Experience
            </h1>
            <div className="w-10 sm:w-16 h-px bg-primary" />
          </div>
        </motion.div>

        {/* Experiences */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* Category Tabs */}
            <motion.div 
              className="flex gap-2 mb-6 sm:mb-10 overflow-x-auto whitespace-nowrap pb-1 -mx-1 px-1 justify-start sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {filteredExperiences.map((exp, index) => {
                    const Icon = categoryIcons[exp.category] || Briefcase;

                    return (
                      <motion.div
                        key={exp.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="relative flex gap-4 md:gap-6"
                      >
                        {/* Timeline Dot */}
                        <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0 bg-card border-2 border-primary rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                        </div>

                        {/* Content Card */}
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-card rounded-xl p-3 sm:p-4 border border-border hover:border-primary/50 transition-colors group cursor-pointer block"
                          >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {exp.title}
                              </h3>
                              <p className="text-primary font-medium">
                                {exp.organization}
                              </p>
                              {exp.subtitle && (
                                <p className="text-sm text-muted-foreground">
                                  {exp.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border border-primary/30 bg-primary/15 text-primary font-medium">
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Open</span>
                              </span>
                              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                                {exp.category.split("/")[0]}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {exp.duration} {exp.location && `• ${exp.location}`}
                          </p>

                          <ul className="space-y-1">
                            {exp.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline">
                            <ExternalLink className="w-3 h-3" />
                            Learn more
                          </div>
                          </a>
                        ) : (
                          <div className="flex-1 bg-card rounded-xl p-3 sm:p-4 border border-border hover:border-primary/50 transition-colors group">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {exp.title}
                                </h3>
                                <p className="text-primary font-medium">
                                  {exp.organization}
                                </p>
                                {exp.subtitle && (
                                  <p className="text-sm text-muted-foreground">
                                    {exp.subtitle}
                                  </p>
                                )}
                              </div>
                              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                                {exp.category.split("/")[0]}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {exp.duration} {exp.location && `• ${exp.location}`}
                            </p>

                            <ul className="space-y-1">
                              {exp.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
