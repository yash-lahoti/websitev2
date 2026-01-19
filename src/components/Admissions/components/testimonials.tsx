import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";

const testimonials = [
  {
    quote:
      "Yash's engineering approach to my application completely transformed how I presented my story. I got accepted to my top choice medical school!",
    name: "Sarah Chen",
    position: "Medical Student, Johns Hopkins",
  },
  {
    quote:
      "The strategic narrative development helped me stand out in a competitive pool. His AI background brings a unique perspective to admissions consulting.",
    name: "Michael Rodriguez",
    position: "Medical Student, Harvard",
  },
  {
    quote:
      "Working with Yash was a game-changer. His systems engineering approach helped me craft a compelling application that got me multiple acceptances.",
    name: "Emily Johnson",
    position: "Medical Student, Stanford",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">
            What students say about working with me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border border-border">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
