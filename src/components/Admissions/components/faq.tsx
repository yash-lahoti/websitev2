"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes your approach different from other consultants?",
    answer:
      "After reviewing hundreds of applications, I've learned exactly what separates accepted from rejected. Most consultants edit documents; I help you build the strategic identity that makes those documents compelling in the first place.",
  },
  {
    question: "How involved are you personally in the process?",
    answer:
      "I work directly with every student myself. There's no team of junior editors or outsourced reviewers. When you book a session, you're working with me—the person who has reviewed hundreds of applications and learned what actually matters.",
  },
  {
    question: "How many students do you work with?",
    answer:
      "I intentionally limit my practice to ensure every student gets the attention they deserve. This isn't a volume business. I'd rather help fewer students exceptionally well than many students adequately.",
  },
  {
    question: "When should I start working with you?",
    answer:
      "The earlier, the better. Students who start 1-2 years before applying have time to build genuine experiences and relationships. Current cycle applicants can still benefit significantly, but strategic planning takes time to execute properly.",
  },
  {
    question: "Do you work with students with lower stats?",
    answer:
      "Yes. While strong academics matter, I've learned that compelling narratives can overcome lower numbers when they demonstrate authentic passion and clear trajectory. If you have a genuine story and realistic expectations, we can build something powerful.",
  },
  {
    question: "What if I don't know what kind of doctor I want to be?",
    answer:
      "That's actually common and not a problem. What matters is having a coherent trajectory that shows genuine exploration and development. We work together to identify themes in your experiences that point toward authentic interests.",
  },
  {
    question: "Can you guarantee acceptance?",
    answer:
      "No ethical consultant can guarantee admission. What I guarantee is that you'll have a strategically positioned application that answers the four questions every application needs to answer. The rest depends on factors neither of us control.",
  },
  {
    question: "Do you help with MD and MD/PhD applications?",
    answer:
      "Yes to both. MD/PhD applications require even more coherent research narratives and clear articulation of why you need both degrees. My research background in AI and engineering is particularly valuable for physician-scientist candidates.",
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
