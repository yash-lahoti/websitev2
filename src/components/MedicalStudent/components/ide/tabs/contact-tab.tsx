"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "../../../lib/data";
import { Mail, Github, Linkedin, GraduationCap, Send, MapPin, CheckCircle } from "lucide-react";
import { EarthCanvas } from "../../../../canvas";

const socialLinks = [
  {
    name: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    name: "GitHub",
    value: "@yashlahoti",
    href: profile.links.github,
    icon: Github,
    color: "bg-gray-500/10 text-gray-300 border-gray-500/20"
  },
  {
    name: "LinkedIn",
    value: "/in/yashlahoti",
    href: profile.links.linkedin,
    icon: Linkedin,
    color: "bg-sky-500/10 text-sky-400 border-sky-500/20"
  },
  {
    name: "Google Scholar",
    value: "Publications",
    href: profile.links.scholar,
    icon: GraduationCap,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  }
];

export function ContactTab() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const MOBILE_BREAKPOINT = 768;

    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setSubmitError(null);

      const env = (import.meta as any).env as Record<string, string | undefined>;
      const serviceId = env.VITE_REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS env vars: VITE_REACT_APP_EMAILJS_SERVICE_ID / VITE_REACT_APP_EMAILJS_TEMPLATE_ID / VITE_REACT_APP_EMAILJS_PUBLIC_KEY");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          to_name: profile.name,
          from_email: formState.email,
          to_email: profile.email,
          message: formState.message
        },
        publicKey
      );

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong while sending your message. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full p-8 md:p-12 lg:p-16 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
            Get In Touch
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Contact Me
            </h1>
            <div className="w-16 h-px bg-primary" />
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {"I'm"} always interested in discussing new opportunities, research collaborations, 
            or healthcare AI innovations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card rounded-xl p-6 border border-border mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{profile.location}</p>
                    <p className="text-sm text-muted-foreground">{profile.school}</p>
                  </div>
                </div>

                {/* Small globe, right-aligned (as requested) */}
                <div className="shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary border border-border pointer-events-none flex items-center justify-center">
                    {isMobile ? (
                      <MapPin className="w-8 h-8 text-primary/40" />
                    ) : (
                      <>
                        <EarthCanvas />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Currently a medical student focused on AI/ML applications in healthcare. 
                Open to collaborations in medical imaging, clinical AI, and healthcare innovation.
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${link.color}`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{link.name}</p>
                      <p className="text-sm font-medium truncate">{link.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Send a Message
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Message Sent!
                </h4>
                <p className="text-muted-foreground text-sm">
                  Thanks for reaching out. {"I'll"} get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {submitError ? (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {submitError}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
