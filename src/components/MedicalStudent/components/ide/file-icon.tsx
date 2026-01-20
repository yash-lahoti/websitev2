"use client";

import React from "react"

import { FileText, FileCode, BookOpen, Database, Settings, Mail } from "lucide-react";

interface FileIconProps {
  type: string;
  size?: "sm" | "md";
}

export function FileIcon({ type, size = "md" }: FileIconProps) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const iconConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    markdown: {
      icon: <FileText className={sizeClass} />,
      color: "text-[#519aba]",
    },
    python: {
      icon: <FileCode className={sizeClass} />,
      color: "text-[#3572A5]",
    },
    bibtex: {
      icon: <BookOpen className={sizeClass} />,
      color: "text-[#cf4a31]",
    },
    notebook: {
      icon: <FileCode className={sizeClass} />,
      color: "text-[#f37626]",
    },
    json: {
      icon: <Database className={sizeClass} />,
      color: "text-[#cbcb41]",
    },
    typescript: {
      icon: <Mail className={sizeClass} />,
      color: "text-[#3178c6]",
    },
    settings: {
      icon: <Settings className={sizeClass} />,
      color: "text-[#6d8086]",
    },
  };

  const config = iconConfig[type] || iconConfig.settings;

  return <span className={config.color}>{config.icon}</span>;
}
