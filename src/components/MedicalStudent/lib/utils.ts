import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Builds a URL for assets under Vite `public/`, respecting `import.meta.env.BASE_URL`.
 * This avoids broken absolute `/...` paths when deploying under a subpath (e.g. GitHub Pages).
 */
export function assetUrl(path?: string) {
  if (!path) return path;
  // leave external links untouched
  if (
    /^(https?:)?\/\//.test(path) ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  const baseRaw = (import.meta as any)?.env?.BASE_URL ?? "/";
  const base = typeof baseRaw === "string" ? baseRaw : "/";
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${baseWithSlash}${normalized}`;
}
