"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { FileTab, TabId } from "./ide-layout";
import { FileIcon } from "./file-icon";

interface SidebarProps {
  files: FileTab[];
  activeTab: TabId;
  onFileClick: (id: TabId) => void;
}

export function Sidebar({ files, activeTab, onFileClick }: SidebarProps) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [portfolioOpen, setPortfolioOpen] = useState(true);

  return (
    <div className="w-60 h-full bg-card border-r border-border flex flex-col shrink-0 shadow-xl md:shadow-none">
      {/* Explorer Header */}
      <div className="h-9 flex items-center px-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Explorer
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-auto text-[13px]">
        {/* Portfolio Folder */}
        <button
          onClick={() => setPortfolioOpen(!portfolioOpen)}
          className="w-full flex items-center gap-1 px-2 py-1.5 hover:bg-secondary active:bg-secondary focus-visible:bg-secondary text-foreground font-semibold text-[11px] uppercase tracking-wider rounded-sm"
        >
          {portfolioOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          yash-lahoti-portfolio
        </button>

        {portfolioOpen && (
          <div className="ml-4">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => onFileClick(file.id)}
                className={`w-full flex items-center gap-2 px-2 py-1 text-left transition-colors rounded-sm focus-visible:outline-none ${
                  activeTab === file.id
                    ? "bg-primary/10 text-foreground border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground active:bg-secondary active:text-foreground focus-visible:bg-secondary focus-visible:text-foreground"
                }`}
              >
                <FileIcon type={file.icon} />
                <span className="truncate">
                  {file.name}
                  <span className="text-muted-foreground/60">{file.extension}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Outline Section */}
      <div className="border-t border-border">
        <button className="w-full flex items-center gap-1 px-2 py-1.5 hover:bg-secondary active:bg-secondary focus-visible:bg-secondary text-foreground font-medium text-[11px] uppercase tracking-wider rounded-sm">
          <ChevronRight className="w-4 h-4" />
          Outline
        </button>
      </div>
    </div>
  );
}
