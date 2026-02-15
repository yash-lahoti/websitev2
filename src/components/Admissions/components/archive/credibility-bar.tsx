"use client";

import { Users, GraduationCap, FileCheck, CalendarClock } from "lucide-react";

const credentials = [
  {
    icon: Users,
    title: "Admissions Experience",
    subtitle: "Hundreds of Applications Reviewed",
  },
  {
    icon: GraduationCap,
    title: "MD Candidate",
    subtitle: "Icahn School of Medicine",
  },
  {
    icon: FileCheck,
    title: "Comprehensive Support",
    subtitle: "Full Application Guidance",
  },
  {
    icon: CalendarClock,
    title: "Limited Capacity",
    subtitle: "Selective Annual Enrollment",
  },
];

const schools = [
  "Harvard",
  "Stanford",
  "Columbia",
  "Penn",
  "Duke",
  "Yale",
  "Northwestern",
  "Johns Hopkins",
  "WashU",
  "Mount Sinai",
];

export function CredibilityBar() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Credential Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {credentials.map((cred) => (
            <div
              key={cred.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <cred.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {cred.title}
                </p>
                <p className="text-xs text-muted-foreground">{cred.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* School Banner */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Students accepted to top medical schools including:
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {schools.map((school) => (
                <span
                  key={school}
                  className="text-muted-foreground/60 font-semibold text-sm md:text-base hover:text-primary transition-colors cursor-default"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
