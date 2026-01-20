"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "../../../lib/data";
import { assetUrl } from "../../../lib/utils";
import { 
  ExternalLink,
  Github,
  Link2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

type Project = (typeof projects)[number];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function StatusPill({ status }: { status?: string }) {
  if (!status) return null;
  const cls =
    status === "Production"
      ? "bg-green-500/10 text-green-400"
      : status === "Beta"
        ? "bg-blue-500/10 text-blue-400"
        : "bg-yellow-500/10 text-yellow-400";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/30 px-2 py-1">
      <div className="text-[13px] font-semibold text-foreground leading-none">{value}</div>
      <div className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const hasImage = Boolean(project.image);
  const primaryHref =
    (project as any).demo || (project as any).publication || (project as any).github || "";
  const isClickable = Boolean(primaryHref);

  const Card = isClickable ? (motion.a as any) : (motion.article as any);

  return (
    <Card
      variants={itemVariants}
      href={isClickable ? assetUrl(primaryHref) : undefined}
      target={isClickable ? "_blank" : undefined}
      rel={isClickable ? "noopener noreferrer" : undefined}
      className={`group rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden block ${
        project.featured ? "shadow-lg shadow-primary/10" : ""
      } ${isClickable ? "cursor-pointer hover:border-primary/40" : ""}`}
    >
      {/* Layout: square image anchored top-right; text wraps around; bottom sections clear below */}
      <div className="p-3 sm:p-4 lg:p-5">
        {/* Floating square image (top-right) */}
        <div
          className="w-full aspect-square mb-2 rounded-lg overflow-hidden border border-border bg-gradient-to-br from-primary/15 via-primary/5 to-background
                     sm:w-44 sm:h-44 sm:aspect-auto sm:float-right sm:ml-4 sm:mb-2
                     lg:w-56 lg:h-56"
        >
          {hasImage ? (
            <img
              src={assetUrl(project.image as string)}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary/40" />
            </div>
          )}
        </div>

        {/* Top: tags + summary (wraps around the floated image) */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1 mb-1.5">
            {isClickable ? (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border border-primary/30 bg-primary/15 text-primary font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Open
              </span>
            ) : null}
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary/60 text-secondary-foreground border border-border">
              {project.category}
            </span>
            {project.featured ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/15 text-primary border border-primary/30">
                Featured
              </span>
            ) : null}
            {(project as any).status ? <StatusPill status={(project as any).status} /> : null}
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          {(project as any).highlights?.length ? (
            <ul className="mt-2 space-y-1">
              {(project as any).highlights.slice(0, 2).map((h: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="whitespace-pre-line">{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Bottom: impact + tech + links (starts below floated image) */}
        <div className="clear-both mt-3 pt-3 border-t border-border/60">
          {project.metrics?.length ? (
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1.5">Impact</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {project.metrics.slice(0, 3).map((m, i) => (
                  <MetricChip key={i} label={m.label} value={m.value} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-3">
            <h4 className="text-xs font-semibold text-foreground mb-1.5">Tech</h4>
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 10).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-[11px] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(project as any).github ? (
              <a
                href={(project as any).github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            ) : null}
            {(project as any).demo ? (
              <a
                href={assetUrl((project as any).demo)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/30 text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            ) : null}
            {(project as any).publication ? (
              <a
                href={assetUrl((project as any).publication)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-xs font-medium transition-colors"
              >
                <Link2 className="w-4 h-4" />
                Publication
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ProjectsTab() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header (Works.jsx-inspired) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 text-center">
            Innovation Portfolio
          </p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-px bg-primary/60" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">
              Selected Projects
            </h1>
            <div className="w-16 h-px bg-primary/60" />
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            A curated set of projects spanning clinical AI, medical imaging, and deployable ML systems.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          {featuredProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p as Project} index={idx} />
          ))}
        </motion.div>

        {/* Others */}
        {otherProjects.length ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">More Projects</h2>
              <span className="text-xs text-muted-foreground">{otherProjects.length}</span>
            </div>
            <div className="space-y-6">
              {otherProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p as Project} index={featuredProjects.length + i} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}