"use client";

import { useState } from "react";
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

export type TabId = "readme" | "experience" | "publications" | "projects" | "skills" | "contact";

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
];

export function IDELayout() {
  const [activeTab, setActiveTab] = useState<TabId>("readme");
  const [openTabs, setOpenTabs] = useState<TabId[]>(["readme"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <span className="ml-4 font-medium text-foreground">Yash Lahoti — Portfolio</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar 
          sidebarOpen={sidebarOpen} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar 
            files={files} 
            activeTab={activeTab} 
            onFileClick={openFile} 
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar
            files={files}
            openTabs={openTabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            onTabClose={closeTab}
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
