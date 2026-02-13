"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="text-center lg:text-left">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium tracking-wide">
              PREMIER MEDICAL SCHOOL ADMISSIONS CONSULTING
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-serif">
            <span className="text-foreground leading-tight">Craft a Narrative That Top Medical Schools Can’t Ignore</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-sans">
            In a sea of perfect GPAs, your story is your only differentiator. I help you escape the "standard" premed trap and craft a narrative that makes admissions committees fight for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Button size="lg" className="text-lg px-8 py-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-sm" asChild>
              <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary rounded-sm"
              asChild
            >
              <a href="#testimonials">View Success Stories</a>
            </Button>
          </div>
        </div>

        {/* Right Column - Portrait */}
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center lg:justify-end">
          <div className="relative relative z-10 w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10"></div>
            <img
              src="/images/profile_full.jpg"
              alt="Yash Lahoti - Medical Admissions Consultant"
              className="w-full h-full object-cover"
              loading="eager"
            />

            {/* Overlay Card on Portrait */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-background/90 backdrop-blur-md border border-primary/20 p-4 rounded-md shadow-lg">
              <p className="font-serif text-lg text-foreground">Yash Lahoti <span className="text-sm font-sans text-muted-foreground ml-1">BAS, MSE, MD Candidate</span></p>
              <p className="text-xs text-primary mt-1 uppercase tracking-wider font-semibold">Icahn School of Medicine at Mount Sinai</p>
            </div>
          </div>

          {/* Decorative elements behind portrait */}
          <div className="absolute -z-10 top-10 right-10 w-full h-full border border-primary/10 rounded-lg transform translate-x-4 translate-y-4"></div>
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </div>
    </section>
  );
}
