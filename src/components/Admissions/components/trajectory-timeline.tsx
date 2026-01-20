"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Clock,
  Rocket,
  Target,
  GitBranch,
  Building2,
  Users,
  Award,
  AlertTriangle,
} from "lucide-react";

type Duration = "2years" | "1year" | "6months";

interface TimelineCard {
  id: string;
  title: string;
  description: string;
  category: "narrative" | "application" | "extracurricular" | "outreach";
  phase: 1 | 2 | 3;
}

const timelineCards: TimelineCard[] = [
  // Phase 1: Foundation (Years 1-2) - 6 items
  {
    id: "niche-id",
    title: "Niche Identification",
    description: "Identify your unique intersection of interests that will differentiate you.",
    category: "narrative",
    phase: 1,
  },
  {
    id: "long-research",
    title: "Longitudinal Research Planning",
    description: "Design a multi-year research roadmap targeting publication or high-impact results.",
    category: "extracurricular",
    phase: 1,
  },
  {
    id: "leadership-traj",
    title: "Leadership & Impact Trajectory",
    description: "Move beyond member status to executive, founder, or change-maker roles.",
    category: "extracurricular",
    phase: 1,
  },
  {
    id: "clinical-roadmap",
    title: "Clinical & Service Roadmap",
    description: "Strategic selection of clinical sites and service work that reinforces your niche.",
    category: "extracurricular",
    phase: 1,
  },
  {
    id: "competency-gap",
    title: "Competency Gap Analysis",
    description: "Audit your profile against medical school requirements and identify weak spots early.",
    category: "application",
    phase: 1,
  },
  {
    id: "academic-planning",
    title: "Academic Planning",
    description: "Create a master timeline for coursework and MCAT to peak at application time.",
    category: "application",
    phase: 1,
  },
  // Phase 2: Expansion (6-12 months before) - 6 items
  {
    id: "narrative-excavation",
    title: "Narrative Excavation",
    description: "Deep-dive sessions to uncover your Why Medicine story and core themes.",
    category: "narrative",
    phase: 2,
  },
  {
    id: "recommender-building",
    title: "Recommender Relationship Building",
    description: "Identify best letter writers and cultivate relationships for strong advocacy.",
    category: "outreach",
    phase: 2,
  },
  {
    id: "faculty-networking",
    title: "Faculty & Mentor Networking",
    description: "Build professional connections with faculty and decision-makers at target programs.",
    category: "outreach",
    phase: 2,
  },
  {
    id: "school-analysis",
    title: "Target School Analysis",
    description: "Evaluate school missions and cultures to build a strategically aligned school list.",
    category: "application",
    phase: 2,
  },
  {
    id: "scholarly-presentation",
    title: "Scholarly Presentation Strategy",
    description: "Submit abstracts and present research at conferences to validate academic potential.",
    category: "extracurricular",
    phase: 2,
  },
  {
    id: "casper-strategy",
    title: "MCAT and CASPer Strategy",
    description: "Prepare for MCAT, CASPer, Snapshot, and PREview exams",
    category: "application",
    phase: 2,
  },
  // Phase 3: Execution (Final 6 months) - 6 items
  {
    id: "primary-narrative",
    title: "Primary Application Narrative Arc",
    description: "Structure your Personal Statement as a thesis statement for your career.",
    category: "narrative",
    phase: 3,
  },
  {
    id: "activity-framing",
    title: "Activity Description Impact Framing",
    description: "Write your 15 AMCAS activities to emphasize results and impact, not just duties.",
    category: "narrative",
    phase: 3,
  },
  {
    id: "secondary-strategy",
    title: "Secondary Thematic Strategy",
    description: "Analyze prompts and create a content bank of stories adaptable across schools.",
    category: "narrative",
    phase: 3,
  },
  {
    id: "application-timing",
    title: "Application Timing & Document Verification",
    description: "Strategically manage timeline and submission checklist to avoid common pitfall",
    category: "application",
    phase: 3,
  },
  {
    id: "interview-strategy",
    title: "Interview Communication Strategy",
    description: "Coach on verbal and non-verbal techniques so your person matches your paper.",
    category: "narrative",
    phase: 3,
  },
  {
    id: "post-submission",
    title: "Post-Submission Update Strategy",
    description: "Write Letters of Intent and Update Letters to keep schools engaged.",
    category: "outreach",
    phase: 3,
  },
];

const durations: { id: Duration; label: string; subtitle: string }[] = [
  { id: "2years", label: "2 Years", subtitle: "The Architect" },
  { id: "1year", label: "1 Year", subtitle: "The Strategist" },
  { id: "6months", label: "6 Months", subtitle: "The Executor" },
];

const categories = {
  narrative: {
    label: "Narrative",
    icon: GitBranch,
    bg: "bg-teal-500",
    bgLight: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
  },
  application: {
    label: "Application Logistics",
    icon: Building2,
    bg: "bg-violet-500",
    bgLight: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
  },
  extracurricular: {
    label: "Extracurricular",
    icon: Award,
    bg: "bg-amber-500",
    bgLight: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
  },
  outreach: {
    label: "Outreach",
    icon: Users,
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
};

const phases = [
  { id: 1, title: "Foundation", subtitle: "2+ Years Before", icon: Target },
  { id: 2, title: "Expansion", subtitle: "1 Year before", icon: Rocket },
  { id: 3, title: "Execution", subtitle: "Final 6 months", icon: Clock },
];

function getVisiblePhases(duration: Duration): number[] {
  switch (duration) {
    case "2years":
      return [1, 2, 3];
    case "1year":
      return [2, 3];
    case "6months":
      return [3];
  }
}

export function TrajectoryTimeline() {
  const [selectedDuration, setSelectedDuration] = useState<Duration>("2years");
  const visiblePhases = getVisiblePhases(selectedDuration);

  return (
    <section id="timeline" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-medium mb-2">Plan Your Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strategic Trajectory Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The earlier you start, the more levers you have.
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-secondary/50 rounded-xl p-1 border border-border">
            {durations.map((duration) => (
              <button
                key={duration.id}
                type="button"
                onClick={() => setSelectedDuration(duration.id)}
                className={cn(
                  "relative px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                  selectedDuration === duration.id
                    ? duration.id === "6months"
                      ? "bg-amber-500 text-amber-950 shadow-lg"
                      : "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-bold">{duration.label}</span>
                  <span className="text-xs opacity-80 hidden sm:block">
                    {duration.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Warning for 6 months */}
        {selectedDuration === "6months" && (
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl max-w-xl mx-auto animate-in fade-in duration-300">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-amber-200 text-sm">
              <span className="font-semibold">Limited Timeline:</span> Focus on packaging your existing profile.
            </p>
          </div>
        )}

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <div className={cn("w-3 h-3 rounded-sm", cat.bg)} />
              <span className="text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Main Timeline Container */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Phase Headers */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
            {phases.map((phase) => {
              const isVisible = visiblePhases.includes(phase.id);
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.id}
                  className={cn(
                    "p-3 text-center border-b md:border-b-0 md:border-r last:border-r-0 border-border transition-all duration-300",
                    isVisible
                      ? selectedDuration === "6months" && phase.id === 3
                        ? "bg-amber-500/10"
                        : "bg-secondary/30"
                      : "bg-secondary/10 opacity-40"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <PhaseIcon
                      className={cn(
                        "w-4 h-4",
                        selectedDuration === "6months" && phase.id === 3
                          ? "text-amber-500"
                          : "text-primary"
                      )}
                    />
                    <span className="font-semibold text-foreground text-sm">
                      {phase.title}
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      ({phase.subtitle})
                    </span>
                  </div>
                  {!isVisible && (
                    <p className="text-xs text-muted-foreground mt-1">Not available</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {phases.map((phase) => {
              const isVisible = visiblePhases.includes(phase.id);
              const phaseCards = timelineCards.filter((c) => c.phase === phase.id);

              return (
                <div
                  key={phase.id}
                  className={cn(
                    "p-3 border-b md:border-b-0 md:border-r last:border-r-0 border-border transition-all duration-300",
                    !isVisible && "opacity-30 bg-secondary/5"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    {phaseCards.map((card) => {
                      const cat = categories[card.category];
                      const Icon = cat.icon;

                      return (
                        <div
                          key={card.id}
                          className={cn(
                            "p-2.5 rounded-lg border transition-all duration-300",
                            isVisible
                              ? cn(cat.bgLight, cat.border, "hover:scale-[1.02]")
                              : "bg-secondary/10 border-transparent"
                          )}
                        >
                          {/* Category Tag */}
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center",
                                cat.bg
                              )}
                            >
                              <Icon className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className={cn("text-[10px] font-medium", cat.text)}>
                              {cat.label}
                            </span>
                          </div>

                          {/* Card Content */}
                          <h4 className="font-semibold text-foreground text-xs leading-tight mb-1">
                            {card.title}
                          </h4>
                          <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2">
                            {card.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
