"use client";

import { Files, Image, BookOpen, User, Mail, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FileTab, TabId } from "./ide-layout";
import { FileIcon } from "./file-icon";

interface ActivityBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenGallery?: () => void;
  isMobile?: boolean;
  files?: FileTab[];
  activeTab?: TabId;
  onOpenFile?: (id: TabId) => void;
}

export function ActivityBar({
  sidebarOpen,
  onToggleSidebar,
  onOpenGallery,
  isMobile,
  files,
  activeTab,
  onOpenFile,
}: ActivityBarProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-12 bg-card flex flex-col items-center py-2 border-r border-border shrink-0 relative">
      {/* Explorer Button */}
      <button
        onClick={onToggleSidebar}
        onMouseEnter={() => setHoveredButton("explorer")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("explorer")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        className={`relative p-2.5 rounded-sm mb-1 transition-colors ${
          sidebarOpen 
            ? "text-foreground bg-secondary/50 border-l-2 border-primary" 
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        }`}
        aria-label="Toggle Explorer"
      >
        <Files className="w-5 h-5" />
        {hoveredButton === "explorer" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Explorer
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </button>
      
      {/* Mobile-only: quick page navigation */}
      {isMobile && files?.length && onOpenFile && (
        <div className="mt-1 flex flex-col items-center gap-0.5">
          {files.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={() => onOpenFile(file.id)}
              onMouseEnter={() => setHoveredButton(`tab:${file.id}`)}
              onMouseLeave={() => setHoveredButton(null)}
              onTouchStart={() => setHoveredButton(`tab:${file.id}`)}
              onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
              className={`relative p-2.5 rounded-sm transition-colors ${
                activeTab === file.id
                  ? "text-foreground bg-secondary/50 border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
              aria-label={`Open ${file.name}${file.extension}`}
              title={`${file.name}${file.extension}`}
            >
              <FileIcon type={file.icon} />
              {hoveredButton === `tab:${file.id}` && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
                  {file.name}
                  {file.extension}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Button */}
      <button 
        onMouseEnter={() => setHoveredButton("gallery")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("gallery")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        onClick={() => onOpenGallery?.()}
        className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors rounded-sm"
        aria-label="Gallery"
      >
        <Image className="w-5 h-5" />
        {hoveredButton === "gallery" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Gallery
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </button>

      {/* Admissions Consulting Button */}
      <button
        onMouseEnter={() => setHoveredButton("admissions")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("admissions")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        onClick={() => navigate("/admissions")}
        className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors rounded-sm"
        aria-label="Admissions Consulting"
      >
        <GraduationCap className="w-5 h-5" />
        {hoveredButton === "admissions" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Admissions Consulting
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </button>
      
      {/* Blog Button */}
      <button 
        onMouseEnter={() => setHoveredButton("blog")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("blog")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        onClick={() => {
          // TODO: Navigate to blog
          console.log("Blog clicked");
        }}
        className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors rounded-sm"
        aria-label="Blog"
      >
        <BookOpen className="w-5 h-5" />
        {hoveredButton === "blog" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Blog
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </button>

      <div className="flex-1" />

      {/* Account Button */}
      <button 
        onMouseEnter={() => setHoveredButton("account")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("account")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors rounded-sm"
        aria-label="Account"
      >
        <User className="w-5 h-5" />
        {hoveredButton === "account" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Account
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </button>
      
      {/* Contact Button */}
      <a
        href="mailto:yash.lahoti@icahn.mssm.edu"
        onMouseEnter={() => setHoveredButton("contact")}
        onMouseLeave={() => setHoveredButton(null)}
        onTouchStart={() => setHoveredButton("contact")}
        onTouchEnd={() => setTimeout(() => setHoveredButton(null), 2000)}
        className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors rounded-sm"
        aria-label="Contact"
      >
        <Mail className="w-5 h-5" />
        {hoveredButton === "contact" && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg border border-border whitespace-nowrap pointer-events-none">
            Contact
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-popover"></div>
          </div>
        )}
      </a>
    </div>
  );
}
