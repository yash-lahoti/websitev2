"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { TabBar } from "./tab-bar";
import { StatusBar } from "./status-bar";
import { ActivityBar } from "./activity-bar";
import { ReadmeTab } from "./tabs/readme-tab";
import { ExperienceTab } from "./tabs/experience-tab";
import { PublicationsTab } from "./tabs/publications-tab";
import { ProjectsTab } from "./tabs/projects-tab";
import { SkillsTab } from "./tabs/skills-tab";
import { ContactTab } from "./tabs/contact-tab";
import { GalleryTab } from "./tabs/gallery-tab";

export type TabId = "readme" | "experience" | "publications" | "projects" | "skills" | "contact" | "gallery";

export interface FileTab {
  id: TabId;
  name: string;
  icon: string;
  extension: string;
}

const files: FileTab[] = [
  { id: "readme", name: "README", icon: "markdown", extension: ".md" },
  { id: "experience", name: "experience", icon: "python", extension: ".py" },
  { id: "publications", name: "publications", icon: "bibtex", extension: ".bib" },
  { id: "projects", name: "projects", icon: "notebook", extension: ".ipynb" },
  { id: "skills", name: "skills", icon: "json", extension: ".json" },
  { id: "contact", name: "contact", icon: "typescript", extension: ".ts" },
  { id: "gallery", name: "gallery", icon: "image", extension: ".jpg" },
];

export function IDELayout() {
  const [activeTab, setActiveTab] = useState<TabId>("readme");
  const [openTabs, setOpenTabs] = useState<TabId[]>(["readme"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    const initialMobile = window.innerWidth < 768;
    setIsMobile(initialMobile);
    if (initialMobile) {
      setSidebarOpen(false);
    }
    
    // Listen for resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openFile = (id: TabId) => {
    if (!openTabs.includes(id)) {
      setOpenTabs([...openTabs, id]);
    }
    setActiveTab(id);
  };

  const closeTab = (id: TabId) => {
    const newTabs = openTabs.filter((t) => t !== id);
    setOpenTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const reorderTabs = (fromId: TabId, toId: TabId) => {
    setOpenTabs((prev) => {
      if (fromId === toId) return prev;
      const fromIndex = prev.indexOf(fromId);
      const toIndex = prev.indexOf(toId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const next = [...prev];
      // Swap positions (drop-on-tab behavior)
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "readme":
        return <ReadmeTab />;
      case "experience":
        return <ExperienceTab />;
      case "publications":
        return <PublicationsTab />;
      case "projects":
        return <ProjectsTab />;
      case "skills":
        return <SkillsTab />;
      case "contact":
        return <ContactTab />;
      case "gallery":
        return <GalleryTab />;
      default:
        return <ReadmeTab />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Title Bar */}
      <div className="h-8 bg-card flex items-center px-4 text-xs text-muted-foreground border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 font-medium text-foreground">Self-coded portfolio — Yash Lahoti, BAS, MSE</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Activity Bar */}
        <ActivityBar 
          sidebarOpen={sidebarOpen} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenGallery={() => openFile("gallery")}
        />

        {/* Mobile Overlay - darkens content when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        {sidebarOpen && (
          <div className={`absolute md:relative inset-y-0 left-12 md:left-0 z-50 md:z-auto transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            <Sidebar 
              files={files} 
              activeTab={activeTab} 
              onFileClick={(id) => {
                openFile(id);
                // Close sidebar on mobile after selecting a file
                if (isMobile) {
                  setSidebarOpen(false);
                }
              }} 
            />
          </div>
        )}

        {/* Main Content */}
        <div 
          className={`flex-1 flex flex-col overflow-hidden transition-opacity duration-300 ${
            sidebarOpen ? "md:opacity-100 opacity-40 pointer-events-none md:pointer-events-auto" : "opacity-100 pointer-events-auto"
          }`}
          onClick={() => {
            // Close sidebar on mobile when clicking content area
            if (sidebarOpen && isMobile) {
              setSidebarOpen(false);
            }
          }}
        >
          {/* Tab Bar */}
          <TabBar
            files={files}
            openTabs={openTabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            onTabClose={closeTab}
            onTabReorder={reorderTabs}
          />

          {/* Editor Content */}
          <div className="flex-1 overflow-auto bg-background">
            {openTabs.length > 0 ? (
              renderContent()
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg mb-2">No file open</p>
                  <p className="text-sm">Select a file from the explorer</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={files.find((f) => f.id === activeTab)} />
    </div>
  );
}
