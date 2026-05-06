/**
 * Prefix a public asset path with the configured Next.js basePath.
 * Use for raw <img> / <video> / <source> tags (next/image handles its own).
 *
 * Example:
 *   <img src={asset("/brand/logo.png")} />
 *
 * In dev: returns the path unchanged.
 * In prod (NODE_ENV=production): returns "/famco-homepage/brand/logo.png".
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/famco-homepage" : "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

/**
 * Prefix an internal route with the configured Next.js basePath.
 * Use for raw <a href={...}> elements (next/link handles its own prefix).
 *
 * Example:
 *   <a href={link("/stock?category=trucks")}>Trucks</a>
 *
 * In dev: returns the path unchanged.
 * In prod: returns "/famco-homepage/stock?category=trucks".
 *
 * Pass-through for absolute URLs (https://...) and non-leading-slash paths
 * like "tel:80032626", "mailto:...", "#anchor".
 */
export function link(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
