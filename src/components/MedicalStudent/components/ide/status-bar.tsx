"use client";

import { GitBranch, AlertCircle, Bell } from "lucide-react";
import type { FileTab } from "./ide-layout";

interface StatusBarProps {
  activeFile?: FileTab;
}

const languageMap: Record<string, string> = {
  markdown: "Markdown",
  python: "Python",
  bibtex: "BibTeX",
  notebook: "Jupyter Notebook",
  json: "JSON",
  typescript: "TypeScript",
};

export function StatusBar({ activeFile }: StatusBarProps) {
  const language = activeFile ? languageMap[activeFile.icon] || "Plain Text" : "Plain Text";

  return (
    <div className="h-6 bg-primary flex items-center justify-between px-2 text-[12px] text-primary-foreground shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{language}</span>
        <Bell className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
