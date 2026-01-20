"use client";

import { useEffect, useMemo, useState } from "react";
import type { FileTab } from "./ide-layout";

interface StatusBarProps {
  activeFile?: FileTab;
}

export function StatusBar({ activeFile }: StatusBarProps) {
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

  return (
    <div className="h-6 bg-primary flex items-center justify-between px-2 text-[12px] text-primary-foreground shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <span className="opacity-90">“</span>
        <span className="truncate">{quotes[quoteIndex] ?? ""}</span>
        <span className="opacity-90">”</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {activeFile ? (
          <span className="opacity-90">
            {activeFile.name}
            {activeFile.extension}
          </span>
        ) : (
          <span className="opacity-90">No file</span>
        )}
      </div>
    </div>
  );
}
