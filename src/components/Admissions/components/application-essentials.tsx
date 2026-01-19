import { User, Lightbulb, Target, MessageSquare } from "lucide-react";

const questions = [
  {
    icon: User,
    question: "Can I picture this person as a physician?",
    explanation:
      "What stands out? Evidence that you understand what being a doctor actually means—beyond the idealized version. Your experiences should show genuine exposure to the realities of patient care.",
  },
  {
    icon: Lightbulb,
    question: "What will they contribute to our program?",
    explanation:
      "Medical schools build classes, not just admit individuals. The question is: what unique perspective, skill, or background will you bring that they don't already have?",
  },
  {
    icon: Target,
    question: "Why our school specifically?",
    explanation:
      "Generic answers are immediately obvious. It's clear when someone has done real research versus copying mission statements. Authentic fit matters.",
  },
  {
    icon: MessageSquare,
    question: "Can they articulate their story compellingly?",
    explanation:
      "Communication is foundational to medicine. How you present yourself in writing and interviews signals how you'll communicate with patients and colleagues.",
  },
];

export function ApplicationEssentials() {
  return (
    <section id="essentials" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">What Actually Matters</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            The Four Questions Every Application Must Answer
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            After reviewing hundreds of applications, I&apos;ve learned that every
            application needs to answer four critical questions convincingly—or risk
            being passed over for someone who does.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {questions.map((item, index) => (
            <div
              key={item.question}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-primary" />
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Callout */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Badge */}
            <div className="shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/profile.jpg"
                    alt="Yash Lahoti"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl text-foreground font-medium mb-4 leading-relaxed">
                &ldquo;I help you build applications that don&apos;t just check boxes—they
                get enthusiastic support during the review process.&rdquo;
              </p>
              <p className="text-muted-foreground">
                After analyzing what makes applications stand out, I&apos;ve learned
                exactly what arguments resonate. I&apos;ll help you create those same
                compelling points in your own application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
