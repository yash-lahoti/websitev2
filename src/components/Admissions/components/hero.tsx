"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Hero() {
  const defaultRotateX = -8;
  const defaultRotateY = -15;
  const [rotateX, setRotateX] = useState(defaultRotateX);
  const [rotateY, setRotateY] = useState(defaultRotateY);
  const bookRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isMouseActive = useRef(false);
  const lastMouseTime = useRef(0);

  useEffect(() => {
    // Add subtle automatic animation when mouse is not active
    const animate = () => {
      const now = Date.now();
      const timeSinceMouse = now - lastMouseTime.current;
      
      // Only animate if mouse hasn't moved in last 2 seconds
      if (!isMouseActive.current && timeSinceMouse > 2000) {
        const time = Date.now() * 0.001;
        const autoRotateX = defaultRotateX + Math.sin(time * 0.4) * 4;
        const autoRotateY = defaultRotateY + Math.cos(time * 0.25) * 6;
        
        setRotateX(autoRotateX);
        setRotateY(autoRotateY);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: Event) => {
      if (!bookRef.current) return;
      const mouseEvent = e as MouseEvent;
      
      isMouseActive.current = true;
      lastMouseTime.current = Date.now();
      
      const rect = bookRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = mouseEvent.clientX - centerX;
      const mouseY = mouseEvent.clientY - centerY;
      
      // Increased max rotation for more dramatic 3D effect
      const maxRotateX = 25;
      const maxRotateY = 30;
      const rotateXValue = defaultRotateX + (mouseY / rect.height) * maxRotateX * 2;
      const rotateYValue = defaultRotateY + (mouseX / rect.width) * maxRotateY * 2;
      
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
      isMouseActive.current = false;
      lastMouseTime.current = Date.now();
      setRotateX(defaultRotateX);
      setRotateY(defaultRotateY);
    };

    const bookElement = bookRef.current?.closest('.bookWrapper');
    if (bookElement) {
      bookElement.addEventListener('mousemove', handleMouseMove);
      bookElement.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        bookElement.removeEventListener('mousemove', handleMouseMove);
        bookElement.removeEventListener('mouseleave', handleMouseLeave);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="text-center lg:text-left">
        {/* Tag line */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-medium">
            Strategic Differentiation
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          <span className="text-foreground">Medical School Admissions</span>
          <br />
        </h1>

        {/* Name & Role */}
        <div className="mt-6 mb-8">
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            Yash Lahoti{" "}
            <span className="text-muted-foreground font-normal">BAS, MSE</span>
          </p>
          <p className="text-muted-foreground text-base mt-1">
            Icahn School of Medicine at Mount Sinai
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 mb-12 leading-relaxed">
          In a sea of thousands of applicants with perfect GPAs, the
          &quot;standard&quot; premed path is a trap. I help you craft the{" "}
          <span className="text-foreground font-medium">
            authentic, cohesive narrative
          </span>{" "}
          that makes admissions committees fight for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
          <Button size="lg" className="text-lg px-8 py-6 gap-2" asChild>
            <a href="https://calendly.com/lahotiyash14/30min" target="_blank" rel="noopener noreferrer">
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 bg-transparent"
            asChild
          >
            <a href="#services">Build Your Strategy</a>
          </Button>
        </div>

        </div>

        {/* Right Column - Book Cover */}
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          <div className="heroSpotlight"></div>
          <div className="relative z-10 transform transition-transform duration-700 hover:scale-[1.28] scale-[1.25]">
            <div className="bookWrapper" ref={bookRef}>
              <div className="book" style={{'--rotate-x': `${rotateX}deg`, '--rotate-y': `${rotateY}deg`} as React.CSSProperties}>
                <div className="cover">
                  <img 
                    src="/images/book-cover.png" 
                    alt="Medical Admissions Consulting Playbook Book Cover" 
                    className="coverImg"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="edgeFade"></div>
                  <div className="sheen"></div>
                  <div className="rimLight"></div>
                  <div className="spineShadow"></div>
                </div>
                <div className="back"></div>
                <div className="left"></div>
                <div className="right"></div>
                <div className="top"></div>
                <div className="bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>
    </section>
  );
}
