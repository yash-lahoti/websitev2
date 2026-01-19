import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Gift, Trophy, Clock, BookOpen } from "lucide-react";

const flexibleFeatures = [
  "Use for ANY admissions-related task",
  "Essays, Interview Prep, Strategy Sessions",
  "Purchase individual Masterclass sessions",
  "No minimum commitment—pay as you go",
  "Standard scheduling priority",
];

const focusedFeatures = [
  "Priority scheduling",
  "Dedicated strategist assigned",
  "Narrative development sessions",
  "School list optimization",
];

const ultimateFeatures = [
  "Highest priority scheduling",
  "Long-term narrative development",
  "Research publication mentoring",
  "Post-acceptance support",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            Flexible Investment Options
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Path to Acceptance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need targeted support or a comprehensive, long-term
            strategy, we have a plan to fit your goals.
          </p>
        </div>

        {/* Two-Column Pricing Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column: Flexible & A la Carte */}
          <Card className="border border-border bg-card">
            <CardContent className="p-6 lg:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Flexible Engagement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Purchase individual hours or specific courses for targeted
                  assistance. Use them whenever and however you need.
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
                <p className="text-sm text-muted-foreground">Pay as you go</p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>
                    Individual Masterclasses starting at{" "}
                    <span className="text-foreground font-medium">$499</span>
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
                <a href="#contact">Purchase Hours or Courses</a>
              </Button>
            </CardContent>
          </Card>

          {/* Right Column: Strategic Packages */}
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
                  Strategic Packages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Commit to a structured plan and unlock exclusive resources,
                  significant discounts, and premium mentorship.
                </p>
              </div>

              {/* Tier 1: 15+ Hours */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">
                    The Strategist
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    20+ Hours
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

                {/* Bonus Box */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                  <Gift className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      BONUS INCLUDED
                    </p>
                    <p className="text-sm text-muted-foreground">
                      1 Masterclass Sessions of Your Choice
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {focusedFeatures.map((feature) => (
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

              {/* Tier 2: 30+ Hours */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">
                    The Architect
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    35+ Hours
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-foreground">
                    $360
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium ml-2">
                    Save 20%
                  </span>
                </div>

                {/* Mega Bonus Box */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/15 border border-primary/30 mb-4">
                  <Trophy className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-primary uppercase tracking-wide">
                      Mega Bonus
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      2 Masterclass Sessions of Your Choice
                    </p>
                    <p className="text-sm text-muted-foreground">
                      + Research Publication Mentoring
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {ultimateFeatures.map((feature) => (
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
                <a href="#contact">Select a Package</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Who Benefits */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-4">
            Who Will Benefit From This
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Our approach is designed for ambitious candidates who understand
            that medical school admissions requires more than just strong
            credentials.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "High-Achieving Applicants",
                desc: "Strong grades and activities but struggling to differentiate in a competitive pool",
              },
              {
                title: "Career Changers",
                desc: "Non-traditional applicants needing to craft a compelling narrative from diverse experiences",
              },
              {
                title: "Strategic Planners",
                desc: "Students who want to build their profile strategically over time",
              },
              {
                title: "Research-Focused Candidates",
                desc: "Applicants with research interests who want to align with specific programs and faculty",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h4 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
