"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FileTab, TabId } from "./ide-layout";

interface StatusBarProps {
  files: FileTab[];
  activeTab: TabId;
  activeFile?: FileTab;
  onNavigateTab: (id: TabId) => void;
}

export function StatusBar({ files, activeTab, activeFile, onNavigateTab }: StatusBarProps) {
  const quotes = useMemo(
    () => [
      "Build in public. Ship small. Iterate fast.",
      "Make it work, make it right, make it delightful.",
      "A portfolio is a story: problems, process, proof.",
      "Good UX is empathy with pixels.",
      "Craft > complexity.",
      "Own the details. They add up.",
    ],
    []
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = window.setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [quotes.length]);

  const activeIndex = files.findIndex((f) => f.id === activeTab);
  const prevTab = activeIndex > 0 ? files[activeIndex - 1]?.id : files[files.length - 1]?.id;
  const nextTab = activeIndex >= 0 && activeIndex < files.length - 1 ? files[activeIndex + 1]?.id : files[0]?.id;

  return (
    <div className="h-6 bg-primary flex items-center justify-between px-2 text-[12px] text-primary-foreground shrink-0">
      <div className="flex items-center gap-2 min-w-0 text-[11px] sm:text-[12px]">
        <span className="opacity-90">“</span>
        <span className="truncate">{quotes[quoteIndex] ?? ""}</span>
        <span className="opacity-90">”</span>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-[60px] sm:w-auto justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center w-6 h-5 rounded-sm hover:bg-white/10 active:bg-white/10 transition-colors focus-visible:outline-none"
          aria-label="Previous file"
          onClick={() => prevTab && onNavigateTab(prevTab)}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center w-6 h-5 rounded-sm hover:bg-white/10 active:bg-white/10 transition-colors focus-visible:outline-none"
          aria-label="Next file"
          onClick={() => nextTab && onNavigateTab(nextTab)}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <span className="hidden sm:inline opacity-90 ml-1">
          {activeFile ? `${activeFile.name}${activeFile.extension}` : "No file"}
        </span>
      </div>
    </div>
  );
}
