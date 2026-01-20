"use client";

import React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publications } from "../../../lib/data";
import { assetUrl } from "../../../lib/utils";
import { 
  FileText, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Presentation,
  Eye,
  Bone,
  Activity,
  Brain,
  Stethoscope,
  Layers,
  Search,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  Manuscript: BookOpen,
  Presentation: Presentation,
  "Abstract/Poster": FileText
};

const departmentIcons: Record<string, React.ElementType> = {
  All: Layers,
  Ophthalmology: Eye,
  Orthopedics: Bone,
  GI: Stethoscope,
};

const types = ["All", "Manuscript", "Presentation", "Abstract/Poster"];
const departments = ["All", "Ophthalmology", "Orthopedics", "GI"];

export function PublicationsTab() {
  const [activeType, setActiveType] = useState("All");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const typeMatch = activeType === "All" || pub.type === activeType;
      const deptMatch = activeDepartment === "All" || pub.department === activeDepartment;
      const searchMatch = searchQuery === "" || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.conference.toLowerCase().includes(searchQuery.toLowerCase());
      
      return typeMatch && deptMatch && searchMatch;
    });
  }, [activeType, activeDepartment, searchQuery]);

  const featuredPubs = publications.filter((p) => p.featured);

  const stats = useMemo(() => ({
    total: publications.length,
    manuscripts: publications.filter(p => p.type === "Manuscript").length,
    presentations: publications.filter(p => p.type === "Presentation").length,
  }), []);

  const clearFilters = () => {
    setActiveType("All");
    setActiveDepartment("All");
    setSearchQuery("");
  };

  const hasActiveFilters = activeType !== "All" || activeDepartment !== "All" || searchQuery !== "";

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredPubs.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredPubs.length) % featuredPubs.length);
  };

  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Academic Contributions
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Publications & Research
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">{stats.total} works</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">{featuredPubs.length} featured</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Panel with Image Preview */}
        {featuredPubs.length > 0 && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-primary/30 rounded-xl overflow-hidden">
              <div className="grid lg:grid-cols-[280px,1fr] lg:h-[240px]">
                {/* Image Preview Side */}
                <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background lg:border-r border-border overflow-hidden h-40 sm:h-48 lg:h-auto aspect-[4/3] lg:aspect-auto">
                  {/* Placeholder for paper preview image */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                    {featuredPubs[featuredIndex].previewImage ? (
                      <img 
                        src={assetUrl(featuredPubs[featuredIndex].previewImage)} 
                        alt="Preview"
                        className="max-w-full max-h-full w-auto h-auto object-contain mx-auto"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <FileText className="w-16 h-16 text-primary/40 mx-auto mb-3" />
                        <p className="text-xs text-muted-foreground">Paper Preview</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Navigation Arrows - positioned outside image area */}
                  {featuredPubs.length > 1 && (
                    <>
                      <button
                        onClick={prevFeatured}
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-background/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background active:bg-background transition-colors z-30 shadow-lg border border-border/50"
                        aria-label="Previous featured publication"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={nextFeatured}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-background/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background active:bg-background transition-colors z-30 shadow-lg border border-border/50"
                        aria-label="Next featured publication"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Dots Indicator */}
                  {featuredPubs.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {featuredPubs.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFeaturedIndex(idx)}
                          className={`h-0.5 rounded-full transition-all ${
                            idx === featuredIndex 
                              ? "bg-primary/90 w-3 sm:w-4" 
                              : "bg-muted-foreground/20 hover:bg-muted-foreground/35 w-0.5"
                          }`}
                          aria-label={`Go to featured publication ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">Featured Publication</span>
                      </div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featuredIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {(() => {
                            const TypeIcon = typeIcons[featuredPubs[featuredIndex].type] || FileText;
                            const DeptIcon = departmentIcons[featuredPubs[featuredIndex].department];
                            return (
                              <>
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                  <TypeIcon className="w-4.5 h-4.5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  {/* Tags: compact + wrap cleanly on mid widths */}
                                  <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                                    <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                                      {featuredPubs[featuredIndex].type}
                                    </span>
                                    {DeptIcon && (
                                      <span className="text-[11px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                                        <DeptIcon className="w-3 h-3" />
                                        {featuredPubs[featuredIndex].department}
                                      </span>
                                    )}
                                    {featuredPubs[featuredIndex].status && (
                                      <span className="text-[11px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full font-medium">
                                        {featuredPubs[featuredIndex].status}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug break-words whitespace-normal">
                          {featuredPubs[featuredIndex].title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-2 break-words whitespace-normal">
                          {featuredPubs[featuredIndex].authors}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                          <span>{featuredPubs[featuredIndex].conference}</span>
                          {featuredPubs[featuredIndex].year && (
                            <>
                              <span>•</span>
                              <span>{featuredPubs[featuredIndex].year}</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {featuredPubs[featuredIndex].url && (
                    <a
                      href={assetUrl(featuredPubs[featuredIndex].url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all font-medium mt-4"
                    >
                      View Publication
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compact Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-card border border-border rounded-xl p-4">
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications..."
                className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compact Filters Row - Department and Type on separate lines */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground shrink-0">Department:</span>
                <div className="flex gap-1 overflow-x-auto whitespace-nowrap pb-1 -mx-1 px-1">
                  {departments.map((dept) => {
                    const Icon = departmentIcons[dept];
                    const isActive = activeDepartment === dept;
                    return (
                      <button
                        key={dept}
                        onClick={() => setActiveDepartment(dept)}
                        className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                        }`}
                        title={dept}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{dept}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground shrink-0">Type:</span>
                <div className="flex gap-1 overflow-x-auto whitespace-nowrap pb-1 -mx-1 px-1">
                  {types.map((type) => {
                    const isActive = activeType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear ({filteredPublications.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-medium text-muted-foreground">
            {hasActiveFilters ? "Filtered Results" : "All Publications"}
          </h2>
          <span className="text-xs text-muted-foreground">
            {filteredPublications.length} {filteredPublications.length === 1 ? "result" : "results"}
          </span>
        </div>

        {/* Compact Publication List */}
        <AnimatePresence mode="wait">
          {filteredPublications.length > 0 ? (
            <motion.div
              key={`${activeType}-${activeDepartment}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              {filteredPublications.map((pub, index) => {
                const TypeIcon = typeIcons[pub.type] || FileText;
                const DeptIcon = departmentIcons[pub.department];
                return (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2) }}
                    href={pub.url ? assetUrl(pub.url) : undefined}
                    target={pub.url ? "_blank" : undefined}
                    rel={pub.url ? "noopener noreferrer" : undefined}
                    className={`group bg-card rounded-lg p-3 border border-border hover:border-primary/40 hover:bg-card/80 transition-all block relative ${
                      pub.url ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <TypeIcon className="w-4 h-4 text-primary" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          {DeptIcon && (
                            <span className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded flex items-center gap-1">
                              <DeptIcon className="w-3 h-3" />
                              <span className="hidden sm:inline">{pub.department}</span>
                            </span>
                          )}
                          <span className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded">
                            {pub.conference}
                          </span>
                          {pub.year && (
                            <span className="text-xs text-muted-foreground">
                              {pub.year}
                            </span>
                          )}
                          {pub.status && (
                            <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                              {pub.status}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-sm text-foreground font-medium mb-0.5 group-hover:text-primary transition-colors whitespace-normal break-words">
                          {pub.title}
                        </h3>
                        
                        <p className="text-xs text-muted-foreground whitespace-normal break-words">
                          {pub.authors}
                        </p>
                      </div>
                      
                    </div>

                    {/* External-link indicator (bottom-right, no layout shift) */}
                    {pub.url ? (
                      <span className="absolute right-2 bottom-2 inline-flex items-center justify-center w-7 h-7 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    ) : null}
                  </motion.a>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-xl border border-border"
            >
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground mb-1">No publications found</p>
              <p className="text-xs text-muted-foreground mb-3">
                Try adjusting your filters or search query
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}