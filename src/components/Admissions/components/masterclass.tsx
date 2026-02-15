"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Globe,
  FlaskConical,
  BookOpen,
  ChevronRight,
  Clock,
  BookMarked,
  Lightbulb,
  Code2,
  PenTool,
  Wand2,
  Brain,
  ScanEye,
  Rocket,
  GraduationCap,
  Minimize2,
  Maximize2,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const masterclasses: Masterclass[] = [
  // ─────────────────────────────────────────────────────────
  // TRACK 1 · AI & DATA SCIENCE FOUNDATIONS
  // ─────────────────────────────────────────────────────────
  {
    id: "data-science-python",
    title: "Python & Data Science for Clinical Research",
    category: "AI/Data Science Foundations",
    icon: Code2,
    duration: "4 hours",
    readme: {
      overview:
        "A hands-on deep dive into Python and data science through the lens of clinical medicine. You'll configure a research-ready coding environment, manipulate real healthcare datasets, EHR exports, NHANES tables, clinical trial CSVs, using Pandas, and run the statistical analyses that underpin every published study. Each exercise mirrors a task you'd encounter in a research lab or quality-improvement project so you walk out writing code, not just reading it.",
      whyItMatters:
        "Physicians who can interrogate their own data lead research teams instead of waiting on analysts. Programs and PIs actively recruit applicants who bring quantitative skills to the bench, and admissions committees notice when your application shows evidence of technical depth rather than passive observation.",
    },
    modules: [
      "Environment Setup & Python Fundamentals for Biomedical Data",
      "Healthcare Data Formats: EHR Exports, FHIR, and Clinical CSVs",
      "Exploratory Analysis & Data Wrangling with Pandas",
      "Hypothesis Testing, Regression, and Publication-Ready Visualizations",
    ],
  },
  {
    id: "medical-imaging",
    title: "Medical Imaging & Computer Vision from First Principles",
    category: "AI/Data Science Foundations",
    icon: ScanEye,
    duration: "4 hours",
    readme: {
      overview:
        "A structured introduction to how machines see medical images. You'll learn how X-rays, CT, MRI, and histology slides are encoded as digital data, walk through the architecture of convolutional neural networks used in FDA-cleared diagnostic tools, and build a working image classifier on a real medical dataset. By session end you'll have a trained model, an understanding of its failure modes, and the vocabulary to discuss AI-assisted diagnostics in any interview or research setting.",
      whyItMatters:
        "AI-powered imaging is already reshaping radiology, pathology, and ophthalmology, and the gap between clinicians who understand these systems and those who don't is widening fast. A concrete computer-vision project on your CV signals technical credibility that no amount of coursework listings can match.",
    },
    modules: [
      "From Photon to Pixel: How Imaging Modalities Produce Digital Data",
      "Neural Network Architectures for Medical Image Analysis",
      "Hands-On Lab: Training a Diagnostic Image Classifier",
      "Evaluation Metrics, Bias Auditing, and Communicating Model Limitations",
    ],
  },
  {
    id: "ai-capstone",
    title: "AI Capstone: Ship a Healthcare AI Project",
    category: "AI/Data Science Foundations",
    icon: Rocket,
    duration: "4 hours",
    readme: {
      overview:
        "Your chance to go from concept to deployed project in a single session. You'll scope a focused healthcare AI application, predictive model, clinical NLP tool, diagnostic classifier, or workflow automation, source an appropriate dataset, and leverage agentic AI coding assistants to build and iterate fast. You leave with a working prototype, clean documentation, and a deployment or publication strategy ready for your portfolio.",
      whyItMatters:
        "Admissions committees and research PIs hire for demonstrated follow-through, not listed interests. A deployed or published project, complete with a GitHub repo, a write-up, and a live demo, is the single strongest signal that you can take a technical idea from zero to one.",
    },
    modules: [
      "Problem Definition, Feasibility Analysis, and Scoping",
      "Dataset Selection: Public Repositories, Synthetic Data, and IRB Considerations",
      "Rapid Prototyping with AI-Assisted Development Tools",
      "Documentation, Deployment, and Presenting Your Work",
    ],
  },

  // ─────────────────────────────────────────────────────────
  // TRACK 2 · MASTERING AI TOOLS
  // ─────────────────────────────────────────────────────────
  {
    id: "claude-code-productivity",
    title: "AI-Powered Workflows for Pre-Med Productivity",
    category: "Mastering AI Tools",
    icon: Wand2,
    duration: "4 hours",
    readme: {
      overview:
        "Learn the prompt engineering and workflow-design principles that turn AI assistants like Claude and ChatGPT into force multipliers for your pre-med life. You'll build reusable systems for active studying, adaptive practice questions, concept mapping, Socratic review, plus literature search pipelines and research task automation. You leave with a personal playbook of templates, tested prompts, and a clear framework for deciding when AI helps and when it gets in the way.",
      whyItMatters:
        "The students who stand out aren't the ones who grind the most hours, they're the ones who produce higher-quality work in less time. Demonstrating that you use AI tools thoughtfully and ethically signals exactly the kind of resourcefulness that admissions committees and lab PIs look for.",
    },
    modules: [
      "AI Assistants: Capabilities, Limitations, and When Not to Use Them",
      "Prompt Engineering Fundamentals for Study and Research",
      "Building Active-Recall and Note-Synthesis Workflows",
      "Automating Literature Search, Summarization, and Citation Tracking",
    ],
  },
  {
    id: "ai-assistant",
    title: "Building Your Personal AI Command Center",
    category: "Mastering AI Tools",
    icon: Bot,
    duration: "4 hours",
    readme: {
      overview:
        "Design and deploy a personal AI-assisted system that handles the administrative overhead of pre-med life: intelligent email triage, deadline tracking, draft communications, and scheduling optimization. Using Claude, ChatGPT, and lightweight automation tools, you'll build workflows you can implement in an afternoon and refine over weeks, freeing cognitive bandwidth for research, clinical exposure, and the work that actually moves your application forward.",
      whyItMatters:
        "Admissions committees read thousands of applications from candidates who are \"passionate about medicine.\" The ones who earn interviews are organized, responsive, and visibly in control of complex commitments. Offloading routine admin to a well-designed system lets you operate that way by default.",
    },
    modules: [
      "Choosing the Right AI Tool for Each Administrative Task",
      "Email Triage, Smart Filtering, and Draft-Response Pipelines",
      "Deadline Management, Calendar Optimization, and Task Prioritization",
      "Integration Patterns: Connecting Tools into a Seamless Daily System",
    ],
  },

  // ─────────────────────────────────────────────────────────
  // TRACK 3 · PROFESSIONAL DEVELOPMENT
  // ─────────────────────────────────────────────────────────
  {
    id: "academic-writing",
    title: "Scientific Writing, Citation Mastery, and Ethical AI Use",
    category: "Professional Development",
    icon: PenTool,
    duration: "4 hours",
    readme: {
      overview:
        "Master the mechanics and strategy of scientific writing with AI as a responsible co-pilot. You'll set up a professional citation workflow in Zotero or Mendeley, build a repeatable literature-review pipeline, and practice AI-assisted drafting and revision techniques that sharpen your prose without crossing into plagiarism or misrepresentation. Dedicated modules on personal statements and secondaries ensure your application writing stays authentic and committee-ready.",
      whyItMatters:
        "Clear, well-sourced writing is the common denominator of every successful applicant, from research abstracts to AMCAS personal statements. Admissions committees and research mentors can tell immediately when someone knows how to synthesize literature and articulate a coherent argument; this session builds that skill systematically.",
    },
    modules: [
      "Structure and Style: Anatomy of Effective Scientific Writing",
      "Professional Citation Workflows with Zotero and Mendeley",
      "AI-Assisted Literature Review, Synthesis, and Drafting Techniques",
      "Ethical AI Use in Personal Statements, Secondaries, and Applications",
    ],
  },
  {
    id: "research-portfolio",
    title: "Building a Research Portfolio That Gets You Noticed",
    category: "Professional Development",
    icon: FlaskConical,
    duration: "4 hours",
    readme: {
      overview:
        "Transform scattered research experiences into a compelling, cohesive portfolio. You'll learn documentation standards that PIs actually respect, write abstracts and poster narratives that win conference awards, and construct a research identity that threads naturally through your application, from activities list to interview talking points. Includes templates, before-and-after rewrites, and live critique so every principle is immediately applicable to your own work.",
      whyItMatters:
        "How you communicate your research matters more than how many hours you logged. A tightly documented portfolio with a clear narrative arc demonstrates intellectual maturity and scientific communication skills, two qualities that consistently separate competitive applicants from the rest of the pool.",
    },
    modules: [
      "Research Documentation Standards That PIs and Committees Respect",
      "Writing Abstracts and Summaries for Conferences and Applications",
      "Poster Design, Visual Hierarchy, and Scientific Storytelling",
      "Crafting a Unified Research Narrative Across Your Application",
    ],
  },
  {
    id: "portfolio-website",
    title: "Build and Launch Your Professional Portfolio Website",
    category: "Professional Development",
    icon: Globe,
    duration: "4 hours",
    readme: {
      overview:
        "Go from blank screen to live portfolio site in a single session. You'll learn design fundamentals and personal branding strategy, write web-optimized content that tells your story, and build a polished site using modern frameworks and templates, no prior web development experience required. You leave with a deployed, shareable URL that program directors, PIs, and letter writers can find when they look you up.",
      whyItMatters:
        "When an interviewer or program director searches your name, what they find shapes their first impression before you ever shake hands. A clean, professional portfolio site signals initiative and digital fluency, and gives you a single canonical link to share with every letter writer, mentor, and committee.",
    },
    modules: [
      "Personal Branding and Visual Design Principles for the Web",
      "Content Strategy: Writing Copy That Resonates with Your Audience",
      "Site Architecture, Development, and Template Customization",
      "Deployment, Custom Domain Setup, and Long-Term Maintenance",
    ],
  },

  // ─────────────────────────────────────────────────────────
  // TRACK 4 · EXAM & TEST PREP
  // ─────────────────────────────────────────────────────────
  {
    id: "ai-study-strategies",
    title: "AI-Enhanced Study Systems: Mastering Your Mistakes",
    category: "Exam/Test Prep",
    icon: Brain,
    duration: "4 hours",
    readme: {
      overview:
        "Build a closed-loop study system that turns every wrong answer into lasting retention. You'll create a structured error database, use AI to surface patterns in your mistakes, distinguishing content gaps from reasoning errors from timing issues, and integrate spaced repetition via Anki so corrections stick long-term. You leave with a fully operational system and a protocol to apply it after every practice exam.",
      whyItMatters:
        "Score jumps come from targeted, systematic work on weaknesses, not more hours of passive review. A disciplined error-analysis habit signals the kind of metacognitive maturity that sustains performance through medical school, boards, and clinical training.",
    },
    modules: [
      "The Science of Error-Driven Learning and Metacognition",
      "Designing and Maintaining a Structured Error Database",
      "AI-Powered Mistake Pattern Analysis and Study Prioritization",
      "Spaced Repetition with Anki: Integration and Long-Term Retention",
    ],
  },
  {
    id: "mcat-strategy",
    title: "MCAT Strategy, Scheduling, and Section Mastery",
    category: "Exam/Test Prep",
    icon: BookOpen,
    duration: "4 hours",
    readme: {
      overview:
        "An evidence-based, systems-level approach to MCAT preparation. You'll design a personalized study schedule that balances content review, practice questions, and full-length exams against your real-life commitments, then drill section-specific strategies, including a dedicated CARS framework, and build a test-day execution plan covering pacing, energy management, and decision-making under pressure.",
      whyItMatters:
        "The MCAT is a stamina test as much as a knowledge test. Admissions committees read your score as a proxy for your ability to manage complexity under sustained pressure. A strategic, sustainable study plan protects both your score and your capacity to keep doing meaningful work in research, clinical settings, and your personal life throughout the process.",
    },
    modules: [
      "Evidence-Based Study Design: Spacing, Interleaving, and Retrieval Practice",
      "Personalized Schedule Architecture and Milestone Planning",
      "Section Strategies: CARS Reasoning, C/P, B/B, and P/S Frameworks",
      "Test-Day Execution: Pacing, Energy Management, and Decision Protocols",
    ],
  },
];

const categories = [
  "Professional Development",
  "AI/Data Science Foundations",
  "Mastering AI Tools",
  "Exam/Test Prep",
];

const categoryAccents: Record<string, string> = {
  "Professional Development": "text-emerald-400",
  "AI/Data Science Foundations": "text-violet-400",
  "Mastering AI Tools": "text-amber-400",
  "Exam/Test Prep": "text-rose-400",
};

export function Masterclass() {
  const [selectedId, setSelectedId] = useState<string>(masterclasses[0].id);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0]]);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [isViewerClosed, setIsViewerClosed] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleBarScrollRef = useRef<HTMLDivElement>(null);

  // IDE title bar: slow back-and-forth auto-scroll; stops permanently on any interaction in this section
  useEffect(() => {
    const container = titleBarScrollRef.current;
    if (!container) return;

    const section = container.closest("#masterclass");
    if (!section) return;

    let animationId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let hasInteracted = false;
    let direction = 1;
    const speed = 0.25;

    const stopAnimation = () => {
      hasInteracted = true;
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };

    const animate = () => {
      if (!container || hasInteracted) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      const nearEnd = container.scrollLeft >= maxScroll - 6;
      const nearStart = container.scrollLeft <= 6;
      if (direction === 1 && nearEnd) direction = -1;
      else if (direction === -1 && nearStart) direction = 1;

      container.scrollLeft += speed * direction;
      animationId = requestAnimationFrame(animate);
    };

    timeoutId = setTimeout(() => {
      if (!hasInteracted) animationId = requestAnimationFrame(animate);
    }, 1000);

    section.addEventListener("mousedown", stopAnimation);
    section.addEventListener("touchstart", stopAnimation, { passive: true });
    section.addEventListener("wheel", stopAnimation);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      section.removeEventListener("mousedown", stopAnimation);
      section.removeEventListener("touchstart", stopAnimation);
      section.removeEventListener("wheel", stopAnimation);
    };
  }, []);

  // Mobile tabs: back-and-forth auto-scroll when container is visible and has overflow
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let hasInteracted = false;
    let direction = 1;
    const speed = 0.4;

    const stopAnimation = () => {
      hasInteracted = true;
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };

    const startAnimation = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0 || hasInteracted) return;

      const animate = () => {
        if (hasInteracted || !container) return;
        const max = container.scrollWidth - container.clientWidth;
        if (max <= 0) return;

        const nearEnd = container.scrollLeft >= max - 8;
        const nearStart = container.scrollLeft <= 8;
        if (direction === 1 && nearEnd) direction = -1;
        else if (direction === -1 && nearStart) direction = 1;

        container.scrollLeft += speed * direction;
        animationId = requestAnimationFrame(animate);
      };

      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 1500);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (container.clientWidth > 0 && container.scrollWidth > container.clientWidth) {
        startAnimation();
      }
    });
    resizeObserver.observe(container);
    const initialDelay = setTimeout(() => startAnimation(), 300);

    container.addEventListener("touchstart", stopAnimation, { passive: true });
    container.addEventListener("mousedown", stopAnimation);
    container.addEventListener("wheel", stopAnimation);

    return () => {
      clearTimeout(initialDelay);
      stopAnimation();
      resizeObserver.disconnect();
      container.removeEventListener("touchstart", stopAnimation);
      container.removeEventListener("mousedown", stopAnimation);
      container.removeEventListener("wheel", stopAnimation);
    };
  }, []);

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
    <section id="masterclass" className="py-24 bg-background overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Modern Skills for Future Doctors</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Research & Skills Development
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Medicine is changing. I share the technical skills I learned (like Python and AI) to help you stand out in research labs and prepare for the future of healthcare.
          </p>
        </div>



        {/* IDE Container */}
        <div className="rounded-xl border border-border overflow-hidden shadow-xl min-h-[600px]">
          {/* IDE Title Bar ,  scrollable left section with slow back-and-forth auto-scroll */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-border">
            <div
              ref={titleBarScrollRef}
              className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-none scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex items-center gap-3 min-w-max">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  masterclass-library
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsContentExpanded(!isContentExpanded)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors hidden md:block"
            >
              {isContentExpanded ? (
                <Minimize2 className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row bg-[#11111b] min-h-[550px] max-h-[78vh] overflow-hidden">
            {/* Sidebar (Desktop) ,  min-h-0 so it can shrink and scroll */}
            <div className="hidden md:flex flex-col w-72 min-h-0 border-r border-border/50 bg-[#181825] shrink-0">
              <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground uppercase tracking-wider">
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

              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
                {categories.map((category) => {
                  const isExpanded = expandedCategories.includes(category);
                  const categoryClasses = masterclasses.filter((m) => m.category === category);

                  return (
                    <div key={category} className="mb-0.5">
                      <button
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-sm hover:bg-white/5 transition-colors"
                      >
                        <ChevronRight
                          className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${isExpanded ? "rotate-90" : ""
                            }`}
                        />
                        <span className={`font-medium ${categoryAccents[category]}`}>
                          {category}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {categoryClasses.length}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="ml-3 border-l border-border/30 pl-2.5 mt-1">
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
                                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded text-left transition-colors ${selectedId === mc.id
                                  ? "bg-primary/15 text-primary"
                                  : "text-foreground/80 hover:bg-white/5"
                                  }`}
                              >
                                <CourseIcon className="w-4 h-4 shrink-0 mt-0.5" />
                                <span className="text-sm leading-snug">
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

            {/* Mobile Horizontal Tabs: auto-scroll hint, no overscroll white space */}
            <div
              ref={scrollContainerRef}
              className="flex md:hidden overflow-x-auto overflow-y-hidden overscroll-x-none border-b border-border/50 bg-[#1e1e2e] custom-scrollbar pb-2 shrink-0 touch-pan-x"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {masterclasses.map((mc) => {
                const isSelected = selectedId === mc.id;
                const CourseIcon = mc.icon;
                return (
                  <button
                    key={mc.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(mc.id);
                      setIsViewerClosed(false);
                    }}
                    className={`
                      flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 transition-colors
                      ${isSelected
                        ? "border-primary bg-[#11111b] text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-[#252535]"
                      }
                    `}
                  >
                    <CourseIcon className={`w-3.5 h-3.5 ${isSelected ? "text-primary" : ""}`} />
                    <span className="text-xs font-medium">{mc.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content */}
            {isContentExpanded && !isViewerClosed && (
              <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
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
                <div className="flex-1 min-h-0 p-5 md:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
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
                                className={`w-6 h-6 rounded text-xs font-medium flex items-center justify-center shrink-0 ${i === 0
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
                </div>
              </div>
            )}

            {/* Collapsed State */}
            {(!isContentExpanded || isViewerClosed) && (
              <div className="flex-1 min-h-0 flex items-center justify-center py-6 px-4">
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
