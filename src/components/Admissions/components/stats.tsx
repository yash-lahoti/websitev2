"use client";

import { Users, FileCheck, Clock, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "100%",
    label: "Client Satisfaction",
  },
  {
    icon: FileCheck,
    value: "$250k+",
    label: "Scholarships Secured",
  },
  {
    icon: BookOpen,
    value: "Top 10",
    label: "Medical Schools Accepted",
  },
];

const schools = [
  { name: "Robert Wood Johnson Medical School", image: "/images/njms.svg", needsWhiteBg: true, isLarge: false },
  { name: "University of Pennsylvania", image: "/images/penn.svg", needsWhiteBg: true, isLarge: false },
  { name: "Drexel University", image: "/images/drexel.svg", needsWhiteBg: true, isLarge: true },
  { name: "Mt. Sinai Icahn", image: "/images/sinai.svg", needsWhiteBg: true, isLarge: true },
];

export function Stats() {
  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Schools Banner */}
      </div>
    </section>
  );
}
