import { Button } from "@/components/ui/button";
import { GraduationCap, Download, MessageCircle } from "lucide-react";

const credentials = [
  {
    title: "MD Candidate",
    subtitle: "Icahn School of Medicine at Mount Sinai",
    highlight: false,
  },
  {
    title: "BAS + MSE",
    subtitle: "University of Pennsylvania",
    highlight: false,
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Decorative */}
          <div className="relative">
            <div className="absolute -top-8 -left-4 text-8xl font-bold text-primary/5 select-none">
              MD / AI
            </div>

            {/* Profile Card */}
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 overflow-hidden">
                <img 
                  src="/images/profile.jpg" 
                  alt="Yash Lahoti" 
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>

              <h3 className="text-2xl font-bold text-center text-foreground mb-2">
                Yash Lahoti
              </h3>
              <p className="text-primary text-center text-sm mb-6">
                MD Candidate @ Mt. Sinai | MSE Artificial Intelligence @ UPenn
              </p>

              {/* Credentials */}
              <div className="space-y-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.title}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      cred.highlight
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cred.highlight ? "bg-primary/20" : "bg-primary/10"
                    }`}>
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${
                        cred.highlight ? "text-primary" : "text-foreground"
                      }`}>
                        {cred.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cred.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <p className="text-primary font-medium mb-2">
              Why This Approach is Different
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The &quot;Niche&quot; Strategy
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              My time on an admissions committee taught me exactly what makes
              reviewers advocate for an applicant. The pattern is undeniable:{" "}
              <span className="text-primary font-medium">
                Authenticity beats perfection.
              </span>{" "}
              What I learned from reviewing hundreds of applications is that
              the difference between &quot;yes&quot; and &quot;next&quot; rarely comes down
              to credentials—it comes down to story.
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I didn&apos;t get into medical school just because of my grades. I
              got in because I developed a clear, authentic niche—combining AI
              with Ophthalmology—and built my entire application around that
              vision. Now, I help students find{" "}
              <span className="text-foreground font-medium">their</span> vision.
            </p>

            <p className="text-xl text-primary font-medium italic mb-8">
              &ldquo;Grades get you to the door; your story gets you through
              it.&rdquo;
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2 bg-transparent" asChild>
                <a href="#">
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
              <Button className="gap-2" asChild>
                <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Let&apos;s Talk
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
