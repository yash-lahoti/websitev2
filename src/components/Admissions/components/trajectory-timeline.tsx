"use client";

import { Search, Compass, PenTool, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Application Review & Feedback",
    description: "Deep-dive diagnostic of your profile to identify unique narrative angles and competitive gaps.",
    icon: Search,
  },
  {
    id: 2,
    title: "Narrative Strategy",
    description: "We’ll sit down and talk through your experiences until we find the core message that represents you best. Then, I’ll help you translate that into essays that feel true to you.",
    icon: Compass,
  },
  {
    id: 3,
    title: "Execution & Drafting",
    description: "Iterative refinement of Personal Statement and 15 Activities to ensure maximum impact.",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Interview Mastery",
    description: "Mock interviews and communication coaching to translate your paper persona to real-life confidence.",
    icon: MessageCircle,
  },
];

export function TrajectoryTimeline() {
  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase mb-3">The Roadmap</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
            Your Narrative Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A structured, proven 4-step framework to build an application that stands out.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-border/40 z-0">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="w-24 h-24 rounded-full bg-card border border-border group-hover:border-primary/50 shadow-lg flex items-center justify-center mb-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20 relative z-10">
                    <div className="absolute inset-2 rounded-full border border-dashed border-primary/20 animate-spin-slow"></div>
                    <step.icon className="w-10 h-10 text-primary" />

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-md">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 font-serif group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector (Vertical) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-24 bottom-[-48px] w-px bg-border/50 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <a href="https://calendly.com/lahotiyash14/30min" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium border-b border-primary/30 pb-0.5 hover:border-primary">
            Start your diagnosis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
