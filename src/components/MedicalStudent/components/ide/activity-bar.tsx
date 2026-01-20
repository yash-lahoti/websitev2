"use client";

import { Files, Search, GitBranch, User, Mail } from "lucide-react";

interface ActivityBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ActivityBar({ sidebarOpen, onToggleSidebar }: ActivityBarProps) {
  return (
    <div className="w-12 bg-card flex flex-col items-center py-2 border-r border-border shrink-0">
      <button
        onClick={onToggleSidebar}
        className={`p-2.5 rounded-sm mb-1 transition-colors ${
          sidebarOpen 
            ? "text-primary bg-primary/10 border-l-2 border-primary" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Toggle Explorer"
      >
        <Files className="w-5 h-5" />
      </button>
      
      <button 
        className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
      
      <button 
        className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Source Control"
      >
        <GitBranch className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      <button 
        className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Account"
      >
        <User className="w-5 h-5" />
      </button>
      
      <a
        href="mailto:yash.lahoti@icahn.mssm.edu"
        className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Contact"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
}
