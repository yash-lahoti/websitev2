"use client";

import { motion } from "framer-motion";
import { projects } from "../../../lib/data";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export function ProjectsTab() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-full p-8 md:p-12 lg:p-16 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
            Innovation Portfolio
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Selected Projects
            </h1>
            <div className="w-16 h-px bg-primary" />
          </div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-stretch`}
            >
              {/* Project Visual */}
              <div className="lg:w-1/2">
                <div className="h-full min-h-[280px] bg-gradient-to-br from-primary/20 via-card to-card rounded-2xl border border-border p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      Featured Project
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category}
                  </p>
                  
                  {/* Metrics Display */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Other Noteworthy Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      {project.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-4 mb-4">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <span className="text-lg font-bold text-primary">{metric.value}</span>
                        <span className="text-xs text-muted-foreground ml-1">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
