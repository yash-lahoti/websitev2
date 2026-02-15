"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "High school students applying to BS/MD programs, undergraduates building their pre-med profile, applicants preparing for the current cycle, and STEM graduate school candidates. If you're navigating a competitive admissions process, there's a service here for where you are.",
  },
  {
    question: "Why work with you instead of a larger consulting firm?",
    answer:
      "Most firms run every student through the same formula of standardized templates, recycled frameworks, interchangeable advisors. I work differently. Every engagement starts from where you actually are, not where a playbook assumes you should be. The goal is to build around your specific background, experiences, and trajectory.",
  },
  {
    question: "When should I start?",
    answer:
      "Wherever you are in the process is a good place to start. I offer sessions designed for every stage — from early profile building years out, to strategy and narrative work a year before, to execution support in the final months before submission. Starting earlier gives us more to work with, but there's always something meaningful to do right now.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free initial consultation. We'll look at where you stand, talk through your goals, and figure out whether working together makes sense. No commitment, just an honest conversation about your candidacy.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            Understanding the Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
