"use client";

interface SectionSeparatorProps {
  variant?: "default" | "gradient" | "dotted" | "minimal";
  className?: string;
}

export function SectionSeparator({ 
  variant = "default",
  className = "" 
}: SectionSeparatorProps) {
  const baseClasses = "w-full my-0";
  
  if (variant === "gradient") {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-0.5" />
      </div>
    );
  }
  
  if (variant === "dotted") {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="flex-1 h-px bg-border" />
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === "minimal") {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="h-px bg-border/50" />
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
          <div className="w-2 h-2 rounded-full bg-primary/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>
    </div>
  );
}
