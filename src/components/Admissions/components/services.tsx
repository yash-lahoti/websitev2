"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GitBranch,
  Building2,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    id: "narrative",
    icon: GitBranch,
    title: "Narrative Development",
    shortTitle: "Narrative",
    tagline: "Your Story",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/50",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    desc: "We move beyond generic 'I want to help people' statements. We dig deep to uncover the authentic experiences that defined your journey.",
    detail:
      "Instead of treating your personal statement, activities, and secondaries as separate documents, we build a unified narrative that runs through every component. We look at your research, your hobbies, and your life experiences to find the unique thread that connects them all.",
    outcomes: [
      "A unified narrative that connects all your experiences",
      "Clear trajectory that admissions committees recognize",
      "Authentic story that only you could write",
    ],
  },
  {
    id: "school",
    icon: Building2,
    title: "Strategic School Selection",
    shortTitle: "Schools",
    tagline: "Your Fit",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/50",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    desc: "Don't just apply to rankings. We identify programs where your specific narrative is a perfect cultural fit.",
    detail:
      "Most applicants create school lists based on rankings and location. This is backwards. We identify programs where your specific narrative is a perfect cultural fit. We analyze each school's culture, mission, and recent initiatives to find genuine alignment.",
    outcomes: [
      "Strategic school list based on genuine fit",
      "Clear articulation of why you belong there",
      "Higher acceptance rates at target programs",
    ],
  },
  {
    id: "outreach",
    icon: Users,
    title: "Strategic Outreach",
    shortTitle: "Outreach",
    tagline: "Your Network",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/50",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    desc: "Most students are anonymous. We guide you on how to genuinely connect with faculty, labs, and mentors before you apply.",
    detail:
      "Strategic Outreach transforms you from an anonymous applicant to a known quantity. This includes identifying relevant research opportunities, reaching out to faculty whose work aligns with your interests, and initiating meaningful conversations.",
    outcomes: [
      "Advocacy inside target programs before applying",
      "Genuine connections with faculty and mentors",
      "You're a known quantity, not anonymous",
    ],
  },
  {
    id: "positioning",
    icon: Award,
    title: "Professional Positioning",
    shortTitle: "Positioning",
    tagline: "Your Impact",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/50",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    desc: "You enter the medical community early through conferences, publications, and initiatives.",
    detail:
      "Professional Positioning means entering the medical community before medical school. We help you present at conferences, publish research, launch initiatives, and build a professional presence that already exists in the field.",
    outcomes: [
      "Professional identity that already exists in the field",
      "Demonstrated contributions through meaningful impact",
      "Application shows trajectory, not just potential",
    ],
  },
];

export function Services() {
  const [selectedId, setSelectedId] = useState<string>("narrative");
  const selectedPillar = pillars.find((p) => p.id === selectedId) || pillars[0];

  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            My Framework  
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Four Pillars of Success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each pillar builds on the others. Together, they transform you from
            another applicant into a memorable candidate with a clear trajectory.
          </p>
        </div>

        {/* Interactive Infographic */}
        <div className="relative">
          {/* Desktop: Horizontal Pillar Selector */}
          <div className="hidden md:block mb-8">
            <div className="relative flex items-center justify-between max-w-4xl mx-auto">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2 rounded-full" />

              {/* Progress Line */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
                style={{
                  width: `${(pillars.findIndex(p => p.id === selectedId) / (pillars.length - 1)) * 100}%`
                }}
              />

              {pillars.map((pillar, index) => {
                const isSelected = selectedId === pillar.id;
                const isPast = pillars.findIndex(p => p.id === selectedId) >= index;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedId(pillar.id)}
                    className="relative z-10 flex flex-col items-center group"
                  >
                    {/* Node */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? `${pillar.bgColor} ${pillar.borderColor} border-2 scale-110 shadow-lg`
                          : isPast
                          ? `${pillar.bgColor} border border-border`
                          : "bg-secondary border border-border"
                      }`}
                    >
                      <pillar.icon
                        className={`w-7 h-7 transition-colors ${
                          isSelected || isPast ? pillar.textColor : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    
                    {/* Label */}
                    <div className="mt-3 text-center">
                      <p
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? pillar.textColor : "text-muted-foreground"
                        }`}
                      >
                        {pillar.shortTitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pillar.tagline}
                      </p>
                    </div>

                    {/* Arrow connector (except last) */}
                    {index < pillars.length - 1 && (
                      <ArrowRight 
                        className={`absolute -right-8 top-5 w-5 h-5 transition-colors ${
                          isPast && pillars.findIndex(p => p.id === selectedId) > index
                            ? "text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: Horizontal Scroll Tabs */}
          <div className="md:hidden mb-6 -mx-6 px-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {pillars.map((pillar) => {
                const isSelected = selectedId === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedId(pillar.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all shrink-0 ${
                      isSelected
                        ? `${pillar.bgColor} ${pillar.borderColor} border`
                        : "bg-secondary border border-border"
                    }`}
                  >
                    <pillar.icon
                      className={`w-4 h-4 ${
                        isSelected ? pillar.textColor : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? pillar.textColor : "text-muted-foreground"
                      }`}
                    >
                      {pillar.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Card */}
          <Card
            className={`border-2 transition-all duration-500 ${selectedPillar.borderColor} bg-gradient-to-br ${selectedPillar.color}`}
          >
            <CardContent className="p-5 md:p-6">
              {/* Pillar Badge */}
              <div
                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${selectedPillar.bgColor} mb-4`}
              >
                <selectedPillar.icon className={`w-3.5 h-3.5 ${selectedPillar.textColor}`} />
                <span className={`text-xs font-semibold ${selectedPillar.textColor}`}>
                  Pillar {pillars.findIndex((p) => p.id === selectedId) + 1}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {selectedPillar.title}
              </h3>

              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                {selectedPillar.desc}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedPillar.detail}
              </p>

              {/* Connection hint */}
              {pillars.findIndex((p) => p.id === selectedId) < pillars.length - 1 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      const nextIndex = pillars.findIndex((p) => p.id === selectedId) + 1;
                      setSelectedId(pillars[nextIndex].id);
                    }}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Next: {pillars[pillars.findIndex((p) => p.id === selectedId) + 1].title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom: Foundation Visual */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-border">
              <div className="flex -space-x-2">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className={`w-8 h-8 rounded-full ${pillar.bgColor} border-2 border-background flex items-center justify-center`}
                  >
                    <pillar.icon className={`w-4 h-4 ${pillar.textColor}`} />
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                All four pillars work together to build your differentiated application
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
