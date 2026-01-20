"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import React, { useMemo, useState } from "react";

export type EducationWorkTimelineItem = {
  title: string;
  org: string;
  date: string;
  kind: "Education" | "Work";
  subtitle?: string;
};

export function EducationWorkTimeline({
  items,
  variant = "split",
}: {
  items: ReadonlyArray<EducationWorkTimelineItem>;
  /** "split" shows list + details (current). "list" shows only the timeline list (compact sidebar style). */
  variant?: "split" | "list";
}) {
  const sortedItems = useMemo(() => items, [items]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = sortedItems[Math.min(selectedIndex, Math.max(sortedItems.length - 1, 0))];

  // Use Vite-compatible asset URLs without requiring TS module declarations for *.png imports.
  const mountSinaiLogoSrc = new URL("../../../../../assets/company/mount_sinai.png", import.meta.url)
    .href;
  const pennLogoSrc = new URL("../../../../../assets/company/penn.png", import.meta.url).href;

  const getOrgLogoSrc = (org: string) => {
    const o = org.toLowerCase();
    if (o.includes("mount sinai")) return mountSinaiLogoSrc;
    if (o.includes("university of pennsylvania") || o.includes("upenn") || o.includes("penn"))
      return pennLogoSrc;
    return null;
  };
  const getLogoContainerClassName = (hasLogo: boolean) => {
    // Logos (esp. SVGs) look best on a neutral white chip, particularly in dark mode.
    return hasLogo ? "bg-white" : "bg-background/35";
  };

  return (
    <div className="w-full">
      {/* Desktop */}
      {variant === "split" ? (
        <div className="hidden md:grid grid-cols-2 gap-6">
          {/* Left: timeline list */}
          <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-4 overflow-hidden">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-border/70" />
            <div className="space-y-2">
              {sortedItems.map((item, index) => {
                const Icon = item.kind === "Education" ? GraduationCap : Briefcase;
                const active = index === selectedIndex;
                return (
                  <button
                    key={`${item.title}-${item.date}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                      active
                        ? "border-primary/50 bg-primary/10"
                        : "border-border bg-background/30 hover:bg-secondary/30"
                    }`}
                  >
                    {/* Node */}
                    <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          active ? "bg-primary ring-4 ring-primary/20" : "bg-border"
                        }`}
                      />
                    </div>
                    <div className="pl-8 flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-9 h-9 rounded-lg border border-border flex items-center justify-center ${
                          active ? "bg-primary/10" : "bg-background/35"
                        }`}
                      >
                        <Icon
                          className={`w-4.5 h-4.5 ${active ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="shrink-0 text-[11px] text-muted-foreground">{item.date}</p>
                          <span
                            className={`inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium ${
                              item.kind === "Education"
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary/60 text-secondary-foreground"
                            }`}
                          >
                            {item.kind}
                          </span>
                        </div>
                        <h3 className="mt-0.5 text-sm font-semibold text-foreground line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.org}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: details */}
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selected?.title}-${selected?.date}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {selected ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">{selected.date}</p>
                        <h3 className="mt-1 text-xl font-semibold text-foreground">
                          {selected.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{selected.org}</p>
                      </div>
                      <span
                        className={`h-fit inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium ${
                          selected.kind === "Education"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/60 text-secondary-foreground"
                        }`}
                      >
                        {selected.kind}
                      </span>
                    </div>

                    {selected.subtitle ? (
                      <div className="mt-4 rounded-xl border border-border bg-background/30 px-4 py-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selected.subtitle}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 rounded-xl border border-border bg-background/30 px-4 py-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Key milestone in my education/work timeline.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 text-xs text-muted-foreground">
                      Tip: click a milestone on the left to view details here.
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="hidden md:block">
          {/* Compact list-only */}
          <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-3 overflow-hidden">
            <div className="space-y-1">
              {sortedItems.map((item, index) => {
                const Icon = item.kind === "Education" ? GraduationCap : Briefcase;
                const active = false;
                const logoSrc = getOrgLogoSrc(item.org);
                return (
                  <div
                    key={`${item.title}-${item.date}-${index}`}
                    className="w-full text-left rounded-lg px-3 py-2"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-11 h-11 rounded-lg border border-border ${getLogoContainerClassName(
                          Boolean(logoSrc),
                        )} flex items-center justify-center shrink-0`}
                      >
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={item.org}
                            className="w-7 h-7 object-contain opacity-95"
                            loading="lazy"
                          />
                        ) : (
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                          <span className="shrink-0">{item.date}</span>
                          <span className="text-muted-foreground/80">{item.kind}</span>
                        </div>
                        <h3 className="mt-0.5 text-sm font-semibold text-foreground whitespace-normal break-words leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground whitespace-normal break-words">{item.org}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile */}
      {variant === "split" ? (
        /* split: list then details (stacked) */
        <div className="md:hidden space-y-4">
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-4">
            <div className="space-y-2">
              {sortedItems.map((item, index) => {
                const active = index === selectedIndex;
                return (
                  <button
                    key={`${item.title}-${item.date}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                      active
                        ? "border-primary/50 bg-primary/10"
                        : "border-border bg-background/30"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="shrink-0 text-[11px] text-muted-foreground">{item.date}</p>
                        <span
                          className={`inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium ${
                            item.kind === "Education"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary/60 text-secondary-foreground"
                          }`}
                        >
                          {item.kind}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground whitespace-normal break-words">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground whitespace-normal break-words">
                        {item.org}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-5">
            {selected ? (
              <>
                <p className="text-xs text-muted-foreground">{selected.date}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{selected.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{selected.org}</p>
                {selected.subtitle ? (
                  <div className="mt-3 rounded-xl border border-border bg-background/30 px-4 py-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{selected.subtitle}</p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      ) : (
        /* list: list-only (non-clickable) */
        <div className="md:hidden">
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-4">
            <div className="space-y-2">
              {sortedItems.map((item, index) => {
                const logoSrc = getOrgLogoSrc(item.org);
                return (
                <div
                  key={`${item.title}-${item.date}-${index}`}
                  className="w-full text-left rounded-xl border border-border bg-background/30 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-11 h-11 rounded-lg border border-border ${getLogoContainerClassName(
                        Boolean(logoSrc),
                      )} flex items-center justify-center shrink-0`}
                    >
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={item.org}
                          className="w-7 h-7 object-contain opacity-95"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span className="shrink-0">{item.date}</span>
                      <span className="text-muted-foreground/80">{item.kind}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground whitespace-normal break-words leading-snug">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-normal break-words">{item.org}</p>
                    {item.subtitle ? (
                      <p className="mt-1 text-xs text-muted-foreground/80 whitespace-normal break-words">
                        {item.subtitle}
                      </p>
                    ) : null}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

