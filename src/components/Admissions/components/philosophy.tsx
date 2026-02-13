import { X, Check } from "lucide-react";

const problems = [
  "Following the 'standard' premed checklist",
  "Being well-rounded but average at everything",
  "Generic 'I want to help people' statements",
  "Anonymous application—just another name in the pile",
];

const solutions = [
  "A unified narrative that connects all your experiences",
  "Strategic niche that sets you apart",
  "Authentic story that only you could write",
  "Meaningful impact that demonstrates real passion",
];

export function Philosophy() {
  return (
    <section id="philosophy" className="py-24 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            Why Great Candidates Fail
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
            Don't build a &quot;persona.&quot; Be yourself.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            There is a lot of bad advice out there telling you to 'play the game.' But admissions officers are human beings. We can tell when someone is writing what they think we want to hear.
          </p>
          <p className="text-lg text-foreground font-medium max-w-3xl mx-auto mb-4">
            My approach is simple: we dig deep into your experiences to find the genuine threads that connect your journey.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            We don't invent a story; we uncover the one that is already there. No calculated strategies, just your true self, presented with clarity and confidence.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </span>
              The Checklist Applicant
            </h3>
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li
                  key={problem}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <X className="w-5 h-5 text-destructive/70 shrink-0" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-card border border-primary/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2 font-serif">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </span>
              The Authentic Applicant
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li
                  key={solution}
                  className="flex items-center gap-3 text-foreground"
                >
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
