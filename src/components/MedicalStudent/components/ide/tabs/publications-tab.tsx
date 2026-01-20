"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publications } from "../../../lib/data";
import { FileText, ExternalLink, Award, BookOpen, Presentation } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  Manuscript: BookOpen,
  Presentation: Presentation,
  "Abstract/Poster": FileText
};

const types = ["All", "Manuscript", "Presentation", "Abstract/Poster"];

export function PublicationsTab() {
  const [activeType, setActiveType] = useState("All");

  const filteredPublications = publications.filter(
    (pub) => activeType === "All" || pub.type === activeType
  );

  const featuredPubs = publications.filter((p) => p.featured);

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
            Academic Contributions
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Publications
            </h1>
            <div className="w-16 h-px bg-primary" />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-card rounded-xl p-5 border border-border text-center">
            <p className="text-3xl font-bold text-primary">{publications.length}</p>
            <p className="text-sm text-muted-foreground">Total Works</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border text-center">
            <p className="text-3xl font-bold text-primary">
              {publications.filter(p => p.type === "Manuscript").length}
            </p>
            <p className="text-sm text-muted-foreground">Manuscripts</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border text-center">
            <p className="text-3xl font-bold text-primary">
              {publications.filter(p => p.type === "Presentation").length}
            </p>
            <p className="text-sm text-muted-foreground">Presentations</p>
          </div>
        </motion.div>

        {/* Featured Publications */}
        {featuredPubs.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Featured
            </h2>
            <div className="space-y-4">
              {featuredPubs.map((pub, index) => {
                const Icon = typeIcons[pub.type] || FileText;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 border border-primary/30 hover:border-primary/60 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {pub.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {pub.conference} {pub.year && `• ${pub.year}`}
                          </span>
                          {pub.status && (
                            <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                              {pub.status}
                            </span>
                          )}
                        </div>
                        <h3 className="text-foreground font-medium mb-1">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {pub.authors}
                        </p>
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Publication
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Type Filter */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Publication List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {filteredPublications.map((pub, index) => {
              const Icon = typeIcons[pub.type] || FileText;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                          {pub.conference}
                        </span>
                        {pub.year && (
                          <span className="text-xs text-muted-foreground">
                            {pub.year}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm text-foreground font-medium line-clamp-2">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {pub.authors}
                      </p>
                    </div>
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
