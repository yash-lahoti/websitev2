"use client";

import { Users, FileCheck, Clock, BookOpen } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10+",
    label: "Successful Medical School Admissions",
  },
  {
    icon: FileCheck,
    value: "50+",
    label: "Applications Screened",
  },
  {
    icon: Clock,
    value: "5+",
    label: "Years Advising Students",
  },
  {
    icon: BookOpen,
    value: "8+",
    label: "Years Tutoring & Lectureship",
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
        <div className="pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Students Accepted to Top Programs Including
          </p>
          
          {/* Scrolling Banner */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
            
            {/* Scrolling content */}
            <div className="flex animate-scroll items-center">
              {[...schools, ...schools].map((school, index) => (
                <div
                  key={`${school.name}-${index}`}
                  className={`flex items-center justify-center shrink-0 mx-10 ${school.isLarge ? 'h-40' : 'h-36'}`}
                >
                  <div 
                    className={`
                      relative w-auto flex items-center justify-center px-2 py-2 rounded-lg
                      ${school.isLarge ? 'h-36' : 'h-32'}
                      ${school.needsWhiteBg 
                        ? 'bg-gray-200/90 shadow-lg border border-gray-300/50' 
                        : ''
                      }
                    `}
                  >
                    <img
                      src={school.image}
                      alt={school.name}
                      className="h-full w-auto object-contain opacity-100 transition-all duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
