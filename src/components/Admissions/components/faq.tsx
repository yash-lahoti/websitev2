"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who will benefit from this service?",
    answer:
      "Undergraduates building their pre-med trajectory, high school BS/MD applicants, medical school applicants, and STEM graduate applicants can all benefit.",
  },
  {
    question: "Why choose personal mentorship over larger consulting groups?",
    answer:
      "Large firms optimize for volume with templated approaches. You can build your package exactly as you need it, and I genuinely enjoy mentoring and helping students succeed!",
  },
  {
    question: "When should I start working with you?",
    answer:
      "Anytime from the preperation to application stage. Ideally 12–18 months before your application cycle will give more time to pursue focused experiences."
  },
  {
    question: "How do I get started?",
    answer:
      "Book an initial consultation and see where you stand, free of charge. Let's see if we're a good fit, and how I can help you!",
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
