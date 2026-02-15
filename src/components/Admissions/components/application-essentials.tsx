import { User, Lightbulb, Target, MessageSquare } from "lucide-react";

const questions = [
  {
    icon: User,
    question: "Can I picture this person as a physician?",
    explanation:
      "Medical schools are not looking for perfection. They are looking for evidence you understand what the job actually entails. Your experiences should show genuine exposure to patient care realities.",
  },
  {
    icon: Lightbulb,
    question: "What will they contribute to the program?",
    explanation:
      "Medical schools build classes, not just admit individuals. AdCOM is asking: what unique perspective, skill, or background will you bring that they don't already have?",
  },
  {
    icon: Target,
    question: "Why this medical school specifically?",
    explanation:
      "Generic answers are immediately obvious. It's clear when someone has done real research versus copying mission statements. Authentic fit matters.",
  },
  {
    icon: MessageSquare,
    question: "Can they articulate their story compellingly?",
    explanation:
      "Communication is foundational to medicine. AdCOM wants to read your essay and think: this person would make a wonderful classmate.",
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
            After screening competitive applications side by side, I have learned that
            checklist items like GPA, exam scores, and activities are not the defining
            features of standout applications. Here are the 4 critical questions that
            must be answered in your application within 15 minutes of review to get to the top of the pile.
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
      </div>
    </section>
  );
}
