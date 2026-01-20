"use client";

import React from "react";
import { useState } from "react";
import {
  Bot,
  Globe,
  FlaskConical,
  BookOpen,
  ChevronRight,
  Clock,
  Play,
  ExternalLink,
  Github,
  BookMarked,
  Lightbulb,
  Code2,
  PenTool,
  Wand2,
  Brain,
  ScanEye,
  Rocket,
  FileText,
  GraduationCap,
  Minimize2,
  Maximize2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Deliverable {
  type: "video" | "paper" | "repo" | "article";
  title: string;
  url: string;
}

interface Masterclass {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  duration: string;
  readme: {
    overview: string;
    whyItMatters: string;
  };
  modules: string[];
  deliverables: Deliverable[];
}

const masterclasses: Masterclass[] = [
  {
    id: "data-science-python",
    title: "Foundations of Data Science & Python for Medicine",
    category: "AI/ML Foundations",
    icon: Code2,
    duration: "4 hours",
    readme: {
      overview:
        "Python programming and data science fundamentals through a medical lens. Work with healthcare datasets, statistical analysis, and visualizations.",
      whyItMatters:
        "Data literacy is becoming essential in modern medicine. Physicians who can analyze data will lead healthcare innovation.",
    },
    modules: [
      "Python Fundamentals & Environment Setup",
      "Working with Medical Data Formats",
      "Data Manipulation with Pandas",
      "Statistical Analysis for Research",
    ],
    deliverables: [
      { type: "video", title: "Python Setup Walkthrough", url: "#" },
      { type: "repo", title: "Medical Dataset Examples", url: "#" },
      { type: "article", title: "Python in Healthcare", url: "#" },
    ],
  },
  {
    id: "medical-imaging",
    title: "Introduction to Medical Imaging & Computer Vision",
    category: "AI/ML Applied",
    icon: ScanEye,
    duration: "4 hours",
    readme: {
      overview:
        "Medical imaging AI fundamentals. Learn about imaging modalities, deep learning for image analysis, and hands-on classification.",
      whyItMatters:
        "AI-assisted diagnostics is one of the fastest-growing areas in healthcare. Understanding these systems is essential.",
    },
    modules: [
      "Medical Imaging Modalities Overview",
      "Digital Image Fundamentals",
      "Deep Learning for Image Analysis",
      "Building a Simple Image Classifier",
    ],
    deliverables: [
      { type: "video", title: "Imaging AI Demo", url: "#" },
      { type: "repo", title: "Image Classification Starter", url: "#" },
      { type: "paper", title: "AI in Radiology Review", url: "#" },
    ],
  },
  {
    id: "ai-capstone",
    title: "AI Capstone: Build Your Healthcare AI Project",
    category: "AI/ML Applied",
    icon: Rocket,
    duration: "4 hours",
    readme: {
      overview:
        "Choose your own AI in Healthcare application, find data, and use agentic AI tools to build and publish your project.",
      whyItMatters:
        "Nothing demonstrates technical competence like a published project. This capstone gives you a portfolio piece.",
    },
    modules: [
      "Project Ideation & Scoping",
      "Finding Healthcare Datasets",
      "Using AI to Write Production Code",
      "Publishing & Sharing Your Work",
    ],
    deliverables: [
      { type: "video", title: "Project Showcase Examples", url: "#" },
      { type: "repo", title: "Capstone Templates", url: "#" },
      { type: "article", title: "Healthcare AI Project Ideas", url: "#" },
    ],
  },
  {
    id: "claude-code-productivity",
    title: "Claude Code & AI Tools for Pre-Med Productivity",
    category: "Productivity",
    icon: Wand2,
    duration: "4 hours",
    readme: {
      overview:
        "Master prompt engineering, build study workflows, and automate research tasks with Claude Code and other AI assistants.",
      whyItMatters:
        "Students who master AI tools now will complete tasks faster and learn more efficiently.",
    },
    modules: [
      "Introduction to AI Assistants",
      "Prompt Engineering Basics",
      "Building Study Aid Workflows",
      "Automating Research Tasks",
    ],
    deliverables: [
      { type: "video", title: "Claude Code Setup Guide", url: "#" },
      { type: "repo", title: "Prompt Templates", url: "#" },
      { type: "article", title: "AI Productivity Guide", url: "#" },
    ],
  },
  {
    id: "ai-assistant",
    title: "Building Your Administrative AI Assistant",
    category: "Productivity",
    icon: Bot,
    duration: "4 hours",
    readme: {
      overview:
        "Create a personalized AI assistant for emails, tasks, and deliverables using ChatGPT, Claude, and automation tools.",
      whyItMatters:
        "Students who leverage modern tools stand out to admissions committees as future-ready.",
    },
    modules: [
      "AI Fundamentals & Tool Selection",
      "Email Automation & Filtering",
      "Task Planning Systems",
      "Integration & Deployment",
    ],
    deliverables: [
      { type: "video", title: "Demo: Email Assistant", url: "#" },
      { type: "repo", title: "Starter Templates", url: "#" },
      { type: "article", title: "AI in Healthcare", url: "#" },
    ],
  },
  {
    id: "academic-writing",
    title: "AI-Powered Academic Writing & Citation Mastery",
    category: "Research",
    icon: PenTool,
    duration: "4 hours",
    readme: {
      overview:
        "Scientific writing with AI tools. Master Zotero and Mendeley, build literature review workflows, and write ethically.",
      whyItMatters:
        "Strong writing skills separate good researchers from great ones throughout your career.",
    },
    modules: [
      "Scientific Writing Fundamentals",
      "Citation Management Tools",
      "AI-Powered Literature Reviews",
      "Personal Statement Writing",
    ],
    deliverables: [
      { type: "video", title: "Zotero Setup Tutorial", url: "#" },
      { type: "repo", title: "Writing Templates", url: "#" },
      { type: "article", title: "AI Ethics in Academia", url: "#" },
    ],
  },
  {
    id: "research-portfolio",
    title: "Building a Research Portfolio",
    category: "Research",
    icon: FlaskConical,
    duration: "4 hours",
    readme: {
      overview:
        "Document projects professionally, write abstracts, design posters, and create a narrative connecting your experiences.",
      whyItMatters:
        "The ability to communicate research differentiates you more than the experience itself.",
    },
    modules: [
      "Research Documentation Standards",
      "Abstract Writing Mastery",
      "Conference Poster Design",
      "Building a Research Narrative",
    ],
    deliverables: [
      { type: "video", title: "Poster Design Walkthrough", url: "#" },
      { type: "paper", title: "Example Abstract", url: "#" },
      { type: "repo", title: "Templates", url: "#" },
    ],
  },
  {
    id: "ai-study-strategies",
    title: "AI-Enhanced Study: Mastering Incorrect Questions",
    category: "Test Prep",
    icon: Brain,
    duration: "4 hours",
    readme: {
      overview:
        "Build incorrect question databases, analyze error patterns with AI, and integrate spaced repetition with Anki.",
      whyItMatters:
        "The difference between good and great scores comes down to how well you learn from mistakes.",
    },
    modules: [
      "Science of Learning from Errors",
      "Building Your Question Database",
      "AI-Powered Error Analysis",
      "Anki + AI Integration",
    ],
    deliverables: [
      { type: "video", title: "Error Analysis Demo", url: "#" },
      { type: "repo", title: "Anki Integration Templates", url: "#" },
      { type: "article", title: "Science of Spaced Repetition", url: "#" },
    ],
  },
  {
    id: "mcat-strategy",
    title: "MCAT Study Strategies + Content Review",
    category: "Test Prep",
    icon: BookOpen,
    duration: "4 hours",
    readme: {
      overview:
        "Evidence-based study techniques, personalized scheduling, and test-taking strategies for maximum performance.",
      whyItMatters:
        "Scoring well while maintaining other activities shows you can handle medical school demands.",
    },
    modules: [
      "Science of Effective Studying",
      "Personalized Schedule Design",
      "Section-Specific Strategies",
      "Test Day Framework",
    ],
    deliverables: [
      { type: "video", title: "Schedule Builder", url: "#" },
      { type: "article", title: "CARS Case Study", url: "#" },
      { type: "repo", title: "Anki Decks", url: "#" },
    ],
  },
  {
    id: "portfolio-website",
    title: "Building Your Personal Portfolio Website",
    category: "Technology",
    icon: Globe,
    duration: "4 hours",
    readme: {
      overview:
        "Build a professional portfolio showcasing your research, experiences, and identity with modern web tools.",
      whyItMatters:
        "When a program director Googles your name, a polished portfolio shows professionalism.",
    },
    modules: [
      "Design Principles & Branding",
      "Content Strategy & Storytelling",
      "Development with Modern Tools",
      "Deployment & Domain Setup",
    ],
    deliverables: [
      { type: "video", title: "Live Build Demo", url: "#" },
      { type: "repo", title: "Portfolio Template", url: "#" },
      { type: "article", title: "Personal Branding Guide", url: "#" },
    ],
  },
];

const categories = [
  "AI/ML Foundations",
  "AI/ML Applied",
  "Productivity",
  "Research",
  "Test Prep",
  "Technology",
];

const categoryAccents: Record<string, string> = {
  "AI/ML Foundations": "text-violet-400",
  "AI/ML Applied": "text-blue-400",
  Productivity: "text-amber-400",
  Research: "text-emerald-400",
  "Test Prep": "text-rose-400",
  Technology: "text-slate-400",
};

const deliverableIcons = {
  video: Play,
  paper: FileText,
  repo: Github,
  article: ExternalLink,
};

export function Masterclass() {
  const [selectedId, setSelectedId] = useState<string>(masterclasses[0].id);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0]]);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [isViewerClosed, setIsViewerClosed] = useState(false);

  const selectedClass = masterclasses.find((m) => m.id === selectedId)!;
  const IconComponent = selectedClass.icon;
  const accentColor = categoryAccents[selectedClass.category];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleAllCategories = () => {
    if (expandedCategories.length === 0) {
      // Expand all if all are collapsed
      setExpandedCategories(categories);
    } else {
      // Collapse all
      setExpandedCategories([]);
    }
  };

  const toggleMobileCategory = (category: string) => {
    setMobileExpanded((prev) => (prev === category ? null : category));
  };

  return (
    <section id="masterclass" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Included With Your Package</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Masterclass Library
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hands-on courses designed to build the skills that set elite applicants apart.
          </p>
        </div>

        {/* Mobile Course Navigation */}
        <div className="md:hidden mb-4 space-y-1.5">
          {categories.map((category) => {
            const categoryClasses = masterclasses.filter((m) => m.category === category);
            const isExpanded = mobileExpanded === category;
            const hasSelectedCourse = categoryClasses.some((mc) => mc.id === selectedId);

            return (
              <div key={category} className="rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory(category)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-[#1e1e2e]"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                    <span className={`font-medium text-sm ${categoryAccents[category]}`}>
                      {category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasSelectedCourse && !isExpanded && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {categoryClasses.length}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="bg-[#181825]">
                    {categoryClasses.map((mc) => {
                      const CourseIcon = mc.icon;
                      return (
                        <button
                          type="button"
                          key={mc.id}
                          onClick={() => {
                            setSelectedId(mc.id);
                            setIsViewerClosed(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left border-t border-border/30 transition-colors ${
                            selectedId === mc.id ? "bg-primary/10" : "hover:bg-[#1e1e2e]"
                          }`}
                        >
                          <CourseIcon
                            className={`w-4 h-4 shrink-0 ${
                              selectedId === mc.id ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              selectedId === mc.id ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {mc.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* IDE Container */}
        <div className="rounded-xl border border-border overflow-hidden shadow-xl min-h-[600px]">
          {/* IDE Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                masterclass-library
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsContentExpanded(!isContentExpanded)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              {isContentExpanded ? (
                <Minimize2 className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row bg-[#11111b] min-h-[550px] overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-72 border-r border-border/50 bg-[#181825] shrink-0">
              <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground uppercase tracking-wider">
                    Explorer
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleAllCategories}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  title={expandedCategories.length === 0 ? "Expand all categories" : "Collapse all categories"}
                >
                  {expandedCategories.length === 0 ? (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {categories.map((category) => {
                  const isExpanded = expandedCategories.includes(category);
                  const categoryClasses = masterclasses.filter((m) => m.category === category);

                  return (
                    <div key={category} className="mb-0.5">
                      <button
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-xs hover:bg-white/5 transition-colors"
                      >
                        <ChevronRight
                          className={`w-3 h-3 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                        <span className={`font-medium ${categoryAccents[category]}`}>
                          {category}
                        </span>
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {categoryClasses.length}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="ml-3 border-l border-border/30 pl-2 mt-0.5">
                          {categoryClasses.map((mc) => {
                            const CourseIcon = mc.icon;
                            return (
                              <button
                                type="button"
                                key={mc.id}
                                onClick={() => {
                                  setSelectedId(mc.id);
                                  setIsViewerClosed(false);
                                }}
                                className={`w-full flex items-start gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                                  selectedId === mc.id
                                    ? "bg-primary/15 text-primary"
                                    : "text-foreground/80 hover:bg-white/5"
                                }`}
                              >
                                <CourseIcon className="w-3 h-3 shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-tight">
                                  {mc.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            {isContentExpanded && !isViewerClosed && (
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Tab Bar */}
                <div className="flex items-center justify-between border-b border-border/50 bg-[#1e1e2e] px-1 shrink-0">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#11111b] border-x border-t border-border/50 rounded-t -mb-px">
                    <IconComponent className={`w-4 h-4 ${accentColor}`} />
                    <span className="text-sm font-medium text-foreground">
                      {selectedClass.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsViewerClosed(true)}
                    className="p-1.5 mr-2 rounded hover:bg-white/10 transition-colors"
                    title="Close viewer"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-5 md:p-6 overflow-y-auto custom-scrollbar min-h-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                    {/* Left Content */}
                    <div className="lg:col-span-3 space-y-5">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <IconComponent className={`w-6 h-6 ${accentColor}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-foreground leading-snug">
                            {selectedClass.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 ${accentColor}`}
                            >
                              {selectedClass.category}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {selectedClass.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Overview */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookMarked className={`w-4 h-4 ${accentColor}`} />
                          <h4 className="font-semibold text-foreground text-sm">Overview</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {selectedClass.readme.overview}
                        </p>
                      </div>

                      {/* Why It Matters */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <h4 className="font-semibold text-foreground text-sm">Why It Matters</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {selectedClass.readme.whyItMatters}
                        </p>
                      </div>
                    </div>

                    {/* Right Sidebar - Curriculum */}
                    <div className="lg:col-span-2">
                      <div className="rounded-lg border border-border/50 bg-white/[0.02] overflow-hidden">
                        <div className="px-4 py-3 border-b border-border/50 bg-white/[0.02]">
                          <span className="text-sm font-semibold text-foreground">Curriculum</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            4 modules
                          </span>
                        </div>
                        <div className="p-3 space-y-1">
                          {selectedClass.modules.map((module, i) => (
                            <div
                              key={module}
                              className="flex items-start gap-3 px-2 py-2 rounded hover:bg-white/5 transition-colors"
                            >
                              <span
                                className={`w-6 h-6 rounded text-xs font-medium flex items-center justify-center shrink-0 ${
                                  i === 0
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-white/10 text-muted-foreground"
                                }`}
                              >
                                {i + 1}
                              </span>
                              <span className="text-sm text-foreground leading-snug pt-0.5">
                                {module}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables - Full Width */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className={`w-4 h-4 ${accentColor}`} />
                      <h4 className="font-semibold text-foreground text-sm">Deliverables</h4>
                    </div>
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar">
                      {selectedClass.deliverables.map((deliverable) => {
                        const DeliverableIcon = deliverableIcons[deliverable.type];
                        return (
                          <a
                            key={deliverable.title}
                            href={deliverable.url}
                            className="flex items-center gap-2 px-3 py-2 rounded-md bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-colors group shrink-0 whitespace-nowrap"
                          >
                            <DeliverableIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                            <span className="text-sm text-foreground group-hover:text-primary">
                              {deliverable.title}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed State */}
            {(!isContentExpanded || isViewerClosed) && (
              <div className="flex-1 flex items-center justify-center py-6 px-4">
                <div className="text-center">
                  <IconComponent className={`w-6 h-6 mx-auto mb-1.5 ${accentColor}`} />
                  <p className="text-sm font-medium text-foreground">{selectedClass.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedClass.duration} · 4 modules
                  </p>
                  {isViewerClosed && (
                    <button
                      type="button"
                      onClick={() => setIsViewerClosed(false)}
                      className="mt-3 text-xs text-primary hover:underline"
                    >
                      Reopen viewer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <a href="#pricing">Get Access to All Masterclasses</a>
          </Button>
        </div>
      </div>

    </section>
  );
}
