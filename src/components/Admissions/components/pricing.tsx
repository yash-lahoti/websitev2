import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, BookOpen } from "lucide-react";

const flexibleFeatures = [
  "Use for any admissions task — essays, strategy, interview prep",
  "Book Masterclass sessions (~4 hours guided learning)",
  "Flexible scheduling on your timeline",
  "No minimum commitment",
  "Hours never expire",
];

const mentorshipFeatures = [
  "Everything in Hourly at a reduced rate",
  "Dedicated long-term strategy across your application cycle",
  "Priority scheduling and faster turnaround",
  "Allocate hours across any mix of sessions and masterclasses",
  "Milestone check-ins between sessions",
];

const comprehensiveFeatures = [
  "Everything in Mentorship at the lowest rate",
  "Full-cycle coverage from foundation through post-submission",
  "Allocate hours across unlimited masterclass topics",
  "Same-week scheduling availability",
  "Direct access for quick-turn questions between sessions",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            Consulting Hours
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Invest in Your Candidacy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every engagement - strategy sessions, essay work, interview prep,
            and masterclasses — runs on consulting hours. Buy them individually
            or commit to a package for a better rate.
          </p>
        </div>

        {/* Two-Column Pricing Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column: Hourly */}
          <Card className="border border-border bg-card">
            <CardContent className="p-6 lg:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Hourly
                </h3>
                <p className="text-sm text-muted-foreground">
                  Purchase hours as you need them. Use for one-on-one
                  consulting, essay reviews, or structured masterclass sessions.
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-foreground">
                    $450
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <p className="text-sm text-muted-foreground">No commitment required</p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>
                    Masterclasses: structured learning session you can customize
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {flexibleFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <a href="#contact">Book Hours</a>
              </Button>
            </CardContent>
          </Card>

          {/* Right Column: Hour Packages */}
          <Card className="border-2 border-primary bg-card relative">
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                Best Value
              </span>
            </div>

            <CardContent className="p-6 lg:p-8 pt-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Hour Packages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Commit to a block of hours for a reduced rate. Use across any
                  combination of consulting sessions and masterclasses.
                </p>
              </div>

              {/* Tier 1: Mentorship (20+ Hours) */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">
                    The Mentorship Package
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    20+ Hours
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-foreground">
                    $420
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium ml-2">
                    Save 7%
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  Recommended for 2–3 masterclass topics plus ongoing strategy work.
                </p>

                <ul className="space-y-2">
                  {mentorshipFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tier 2: Comprehensive (35+ Hours) */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">
                    Comprehensive Guidance
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    35+ Hours
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-foreground">
                    $400
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium ml-2">
                    Save 11%
                  </span>
                </div>

                <ul className="space-y-2">
                  {comprehensiveFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button className="w-full" asChild>
                <a href="#contact">Choose a Package</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
