import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips raw Mermaid graph definitions, HTML/Markdown clutter, and extra whitespace
 * from imported repository summaries/solutions so UI cards stay crisp and readable.
 */
export function cleanProjectText(raw?: string): string {
  if (!raw) return "";
  return raw
    .replace(/subgraph\s+[\s\S]*?(?=\n\n|$)/gi, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Detects SVG architecture diagrams so they can be framed with `object-contain`
 * rather than cropped with `object-cover`.
 */
export function isDiagramAsset(url?: string): boolean {
  if (!url) return false;
  return /\.svg(\?.*)?$/i.test(url.trim());
}

/**
 * Selects the strongest visual cover asset for a project card or spotlight stage,
 * prioritizing raster screenshots over SVG diagrams and falling back to the client logo.
 */
export function getProjectCover(project: {
  coverImage?: string;
  galleryImages?: string[];
  companyLogo?: string;
}): string {
  if (project.coverImage) return project.coverImage;
  const gallery = project.galleryImages || [];
  const raster = gallery.find((u) => !isDiagramAsset(u));
  if (raster) return raster;
  if (gallery.length > 0) return gallery[0];
  return project.companyLogo ? project.companyLogo.replace("w=120", "w=800") : "";
}

