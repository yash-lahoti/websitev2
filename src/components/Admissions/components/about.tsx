import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Building2, Download, MessageCircle } from "lucide-react";

const education = [
  {
    icon: GraduationCap,
    label: "Undergraduate",
    institution: "University of Pennsylvania",
    degree: "BAS, Biomedical Science",
  },
  {
    icon: BookOpen,
    label: "Graduate",
    institution: "University of Pennsylvania",
    degree: "MSE, Artificial Intelligence",
  },
  {
    icon: Building2,
    label: "Medical School",
    institution: "Icahn School of Medicine at Mount Sinai",
    degree: "MD Candidate",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column - Profile Card (narrower) */}
          <div className="relative lg:max-w-[360px]">
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
              {/* Profile image */}
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt="Yash Lahoti"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>

              {/* Name & roles */}
              <div className="pb-5 mb-5 border-b border-primary/20 space-y-2">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  Yash Lahoti
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-snug">
                  <span className="text-primary/80">MD Candidate (MS4)</span>
                  <span className="text-muted-foreground/60 mx-1.5">·</span>
                  <span className="text-primary/80">Ophthalmology</span>
                  <br />
                  <span className="text-primary/80">AI Scientist</span>
                  <span className="text-muted-foreground/60 mx-1.5">·</span>
                  <span className="text-primary/80">Entrepreneur</span>
                </p>
              </div>

              {/* Education entries */}
              <div className="pt-1">
                {education.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={
                        index < education.length - 1
                          ? "pt-4 pb-4 border-b border-primary/20"
                          : "pt-4"
                      }
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-primary/70">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-primary pl-7">
                        {item.institution}
                      </p>
                      {item.degree && (
                        <p className="text-sm text-muted-foreground pl-7 mt-0.5">
                          {item.degree}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <p className="text-primary font-medium mb-2">
              About Me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
              From AI Research to Medical Admissions
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I am an MD candidate at the Icahn School of Medicine at Mount Sinai and hold dual degrees in Biomedical Science and Artificial Intelligence from the University of Pennsylvania. My academic path has intentionally spanned engineering, research, and clinical medicine, building a focused professional niche at the intersection of AI and healthcare.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            My work spans both startup and academic environments, where I build applied AI systems and lead multidisciplinary research aimed at real-world clinical implementation. 
            This has included developing predictive tools, contributing to peer-reviewed research, and translating technical models into deployable healthcare solutions. Alongside product and research leadership, I design AI-focused curricula for medical trainees and teach applied machine learning in the context of clinical research. Across these roles, the constant has been the same: converting technical expertise into meaningful, measurable clinical impact.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Today, I work with both traditional and non-traditional applicants across competitive graduate programs. I help students refine how they present their achievements, structure their narratives, and align their applications with what graduate admissions committees are actually evaluating: trajectory, clarity of purpose, and long-term fit. Strong applications are not built on volume. They are built on alignment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2 bg-transparent" asChild>
                <a href="documents/Yash_Lahoti_Resume_2025.pdf" target="_blank" rel="noopener noreferrer" download>
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
