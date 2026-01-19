import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CredibilityBar } from "@/components/credibility-bar";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { Philosophy } from "@/components/philosophy";
import { ApplicationEssentials } from "@/components/application-essentials";
import { Services } from "@/components/services";
import { TrajectoryTimeline } from "@/components/trajectory-timeline";
import { LongTerm } from "@/components/long-term";
import { Masterclass } from "@/components/masterclass";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Philosophy />
      <ApplicationEssentials />
      <Services />
      <TrajectoryTimeline />
      <Masterclass />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
