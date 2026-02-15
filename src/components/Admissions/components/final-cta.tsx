import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="py-24 bg-primary/5 border-y border-primary/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Ready to Build Your Strategic Application?
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
          Your complimentary consultation includes a review of your current
          profile, identification of strategic opportunities, and a clear
          roadmap for building a competitive application.
        </p>

        <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto">
          Just an honest assessment of where you
          stand and how I can help.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-base sm:text-lg px-4 sm:px-8 py-6 gap-2 min-w-0 text-center w-full sm:w-auto" asChild>
            <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
              <span className="sm:hidden">Schedule Free Consultation</span>
              <span className="hidden sm:inline">Schedule Your Complimentary Consultation</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </a>
          </Button>
        </div>

        {/* Secondary Contact */}
        <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="text-sm">
            Prefer email?{" "}
            <a
              href="mailto:yash.lahoti.sapient@gmail.com"
              className="text-primary hover:underline"
            >
              yash.lahoti.sapient@gmail.com
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
