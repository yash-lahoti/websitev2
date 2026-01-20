"use client";

import { motion } from "framer-motion";
import { skills } from "../../../lib/data";
import { Code2, Layers, Wrench, Brain } from "lucide-react";

const sectionConfig = {
  languages: {
    title: "Languages",
    icon: Code2,
    description: "Programming languages I work with"
  },
  frameworks: {
    title: "Frameworks & Libraries",
    icon: Layers,
    description: "Tools and frameworks for building applications"
  },
  tools: {
    title: "Tools & Platforms",
    icon: Wrench,
    description: "Development and deployment infrastructure"
  },
  domains: {
    title: "Domain Expertise",
    icon: Brain,
    description: "Areas of specialized knowledge"
  }
};

export function SkillsTab() {
  return (
    <div className="min-h-full p-8 md:p-12 lg:p-16 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
            Technical Proficiency
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Skills & Technologies
            </h1>
            <div className="w-16 h-px bg-primary" />
          </div>
        </motion.div>

        {/* Skills with Progress Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Languages</h3>
                <p className="text-xs text-muted-foreground">Programming languages</p>
              </div>
            </div>
            <div className="space-y-4">
              {skills.languages.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Frameworks</h3>
                <p className="text-xs text-muted-foreground">Libraries & frameworks</p>
              </div>
            </div>
            <div className="space-y-4">
              {skills.frameworks.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-xl p-6 border border-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Tools & Platforms</h3>
              <p className="text-xs text-muted-foreground">Development infrastructure</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.tools.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="bg-secondary rounded-lg p-4 text-center"
              >
                <p className="font-medium text-foreground mb-1">{skill.name}</p>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Domain Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Domain Expertise</h3>
              <p className="text-xs text-muted-foreground">Specialized knowledge areas</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.domains.map((domain, index) => (
              <motion.span
                key={domain}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {domain}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
