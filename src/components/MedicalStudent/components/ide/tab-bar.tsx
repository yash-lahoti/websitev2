"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import type { FileTab, TabId } from "./ide-layout";
import { FileIcon } from "./file-icon";

interface TabBarProps {
  files: FileTab[];
  openTabs: TabId[];
  activeTab: TabId;
  onTabClick: (id: TabId) => void;
  onTabClose: (id: TabId) => void;
  onTabReorder: (fromId: TabId, toId: TabId) => void;
}

export function TabBar({
  files,
  openTabs,
  activeTab,
  onTabClick,
  onTabClose,
  onTabReorder,
}: TabBarProps) {
  const openFiles = files.filter((f) => openTabs.includes(f.id));
  const draggingIdRef = useRef<TabId | null>(null);

  return (
    <div className="h-9 mt-1 bg-card flex items-end border-b border-border overflow-x-auto shrink-0">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`group relative flex items-center gap-2 h-[35px] px-3 border-r border-border cursor-pointer transition-colors select-none ${
            activeTab === file.id
              ? "bg-background text-foreground border-t-2 border-primary rounded-t-md -mb-px"
              : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
          onClick={() => onTabClick(file.id)}
          draggable
          onDragStart={(e) => {
            draggingIdRef.current = file.id;
            e.dataTransfer.setData("text/tab-id", file.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragEnd={() => {
            draggingIdRef.current = null;
          }}
          onDragOver={(e) => {
            // Required to allow dropping.
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const fromId =
              (e.dataTransfer.getData("text/tab-id") as TabId) ?? draggingIdRef.current;
            const toId = file.id;
            if (!fromId || fromId === toId) return;
            onTabReorder(fromId, toId);
          }}
        >
          <FileIcon type={file.icon} size="sm" />
          <span className="text-[13px] whitespace-nowrap">
            {file.name}
            <span className={activeTab === file.id ? "text-muted-foreground" : "text-muted-foreground/60"}>
              {file.extension}
            </span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file.id);
            }}
            className={`p-0.5 rounded-sm transition-opacity ${
              activeTab === file.id 
                ? "opacity-100 hover:bg-secondary" 
                : "opacity-0 group-hover:opacity-100 hover:bg-secondary"
            }`}
            aria-label={`Close ${file.name}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <div className="flex-1 bg-card" />
    </div>
  );
}
