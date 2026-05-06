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
