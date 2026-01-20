"use client";

import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "../../../../canvas";
import { technologies } from "../../../../../constants";

export function SkillsTab() {
  const [isMobile, setIsMobile] = React.useState(false);

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

  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Technical Stack
          </p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Skills & Technologies
            </h1>
          </div>
        </motion.div>

        {/* Tech Stack (BallCanvas) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Tech Stack</h3>
              <p className="text-xs text-muted-foreground">Tools I use most often</p>
            </div>
          </div>

          {/* Responsive grid (no horizontal scrolling) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((technology, index) => (
              <motion.div
                key={technology.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.65 + index * 0.04 }}
                className="flex flex-col items-center min-w-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  {isMobile ? (
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-muted">
                      <img
                        src={
                          typeof technology.icon === "string"
                            ? technology.icon
                            : (technology.icon as unknown as { src: string }).src
                        }
                        alt={technology.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  ) : (
                    <BallCanvas icon={technology.icon} />
                  )}
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm font-medium mt-2 text-center truncate w-full">
                  {technology.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
