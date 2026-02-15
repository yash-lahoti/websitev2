import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Building2, Download, MessageCircle } from "lucide-react";

type EducationItem = {
  icon: typeof GraduationCap;
  label: string;
  institution: string;
  degree?: string;
};

const education: EducationItem[] = [
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
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Grid: desktop = title + text (left, wraps next to card) | profile card (right). Mobile = text first, then profile. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-x-10 gap-y-10 lg:gap-y-12 lg:items-start">
          {/* Left column: title + body text + buttons (desktop: buttons under text) */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 min-w-0 space-y-4 sm:space-y-5">
            <div>
              <p className="text-primary font-medium mb-2 text-sm sm:text-base">About Me</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-serif leading-tight">
                My Journey to Medical School
              </h2>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I am a MD candidate at the Icahn School of Medicine at Mount Sinai and 
              <span className="font-semibold text-foreground"> former member of the medical school admissions committee</span>,{" "}
               with experience screening applications and evaluating candidates. 
              I came to medicine through engineering, not the traditional pre-med pipeline. I hold <span className="font-semibold text-foreground">dual degrees in Biomedical Science and Artificial Intelligence from the University of Pennsylvania. </span> 
              My academic path has intentionally spanned engineering, research, and clinical medicine, building a focused professional niche at the 
              <span className="font-semibold text-foreground"> intersection of AI and healthcare. </span>
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              In medical school, I continued building: leading <span className="font-semibold text-foreground">translational AI research</span> in ophthalmology as a clinical research fellow at New York Eye and Ear Infirmary, 
              and designing coursework on AI for medical students. I have published extensively in 
              <span className="font-semibold text-foreground"> peer-reviewed journals</span> across ophthalmology, orthopedics, and gastroenterology,
              and I have secured competitive research funding to
              <span className="font-semibold text-foreground"> build my own digital health startup.</span>
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground"> I understand what makes a narrative compelling</span> because I have lived the process myself, 
              <span className="font-semibold text-foreground"> both as a student and evaluator</span>.
              Today I work with applicants across the spectrum: <span className="font-semibold text-foreground">traditional pre-med students</span> looking to sharpen a solid application, 
              <span className="font-semibold text-foreground"> non-traditional candidates</span> figuring out how to frame an unconventional background, 
              and ambitious students aiming to present themselves with the same precision and intentionality as the strongest applicants.
              My goal is not to make you sound like someone else. It is to help you see what committees will see in your file, and make sure your story is clear, coherent, and authentic.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-foreground leading-snug border-l-4 border-primary pl-4 py-2 my-2 italic">
              Strong applications are not built on metrics. They are built on alignment.
            </p>
            {/* Desktop: buttons under the text */}
            <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4 pt-2">
              <Button className="gap-2" asChild>
                <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Let&apos;s Talk
                </a>
              </Button>
            </div>
          </div>

          {/* B: Achievements — desktop: side card; mobile: wide banner with logo, content, and buttons in extra space */}
          <div className="order-3 lg:order-2 lg:col-start-2 lg:row-start-1 w-full lg:max-w-[360px] mx-auto lg:mx-0 lg:sticky lg:top-24 flex flex-col gap-0">
            {/* Card: small mobile = vertical stack; sm+ = horizontal; lg = vertical desktop */}
            <div className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-xl flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-0 items-center lg:items-stretch">
              {/* Logo / profile image — top on small mobile, left on sm, center on lg */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-48 lg:h-48 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden lg:mx-auto lg:mb-5 lg:mb-6">
                <img
                  src="/images/profile.jpg"
                  alt="Yash Lahoti"
                  className="w-full h-full object-cover object-top rounded-full"
                  loading="eager"
                />
              </div>

              {/* Center on mobile: name + the three education items; desktop: same */}
              <div className="flex-1 min-w-0 lg:flex-none flex flex-col justify-center lg:justify-start">
                {/* Name & roles — consistent spacing on desktop */}
                <div className="pb-2 lg:pb-6 mb-2 lg:mb-0 border-b border-primary/20 space-y-1 lg:space-y-2">
                  <h3 className="text-sm sm:text-base lg:text-2xl font-bold text-foreground tracking-tight">
                    Yash Lahoti
                  </h3>
                  {/* Mobile: one line with · between; desktop: stacked list */}
                  <p className="lg:hidden text-[10px] sm:text-xs text-muted-foreground font-medium leading-snug">
                    <span className="text-muted-foreground/60">·</span>{" "}
                    <span className="text-primary/80">MD Candidate (MS4)</span>
                    <span className="text-muted-foreground/60 mx-1">·</span>{" "}
                    <span className="text-primary/80">Ophthalmology</span>
                    <span className="text-muted-foreground/60 mx-1">·</span>{" "}
                    <span className="text-primary/80">AI Scientist</span>
                  </p>
                  <ul className="hidden lg:block text-sm text-muted-foreground font-medium leading-snug space-y-1 flex flex-col">
                    <li className="flex items-center gap-1.5">
                      <span className="text-muted-foreground/60 shrink-0">·</span>
                      <span className="text-primary/80">MD Candidate (MS4)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-muted-foreground/60 shrink-0">·</span>
                      <span className="text-primary/80">Ophthalmology</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-muted-foreground/60 shrink-0">·</span>
                      <span className="text-primary/80">AI Scientist</span>
                    </li>
                  </ul>
                </div>

                {/* Mobile: one block per education item — school and degree only; line-clamp to avoid overlap in row layout */}
                <div className="lg:hidden space-y-1 pt-1 min-w-0">
                  {education.map((item) => (
                    <div
                      key={item.label}
                      className="text-xs sm:text-sm text-primary/90 leading-snug line-clamp-2 sm:line-clamp-none"
                    >
                      <span className="font-semibold text-primary">{item.institution}</span>
                      {item.degree && (
                        <>
                          <span className="text-muted-foreground"> — </span>
                          <span className="text-muted-foreground">{item.degree}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: stacked education list with borders */}
                <div className="hidden lg:flex flex-col pt-5">
                  {education.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === education.length - 1;
                    const isFirst = index === 0;
                    return (
                      <div
                        key={item.label}
                        className={
                          "border-b border-primary/20 " +
                          (isFirst ? "pt-0 pb-5" : isLast ? "pt-5 pb-0" : "py-5")
                        }
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm font-medium text-primary/70">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-base font-semibold text-primary pl-7 leading-snug">
                          {item.institution}
                        </p>
                        {item.degree && (
                          <p className="text-sm text-muted-foreground pl-7 mt-1.5 leading-snug">
                            {item.degree}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: buttons — full width at bottom when stacked, right when row */}
              <div className="lg:hidden shrink-0 flex flex-col gap-2 justify-center w-full sm:w-auto">
                <Button size="sm" className="gap-2 w-full sm:w-auto shrink-0" asChild>
                  <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Let&apos;s Talk
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
