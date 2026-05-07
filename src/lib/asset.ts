/**
 * Prefix a path with the configured Astro `base` (set in astro.config.mjs).
 * Use for raw <img>/<video>/<source>/<a> elements pointing at public assets
 * or internal routes.
 *
 * Astro injects `import.meta.env.BASE_URL` (e.g. "/famco-homepage/") so
 * trailing-slash aware concatenation works for any depth.
 */
const BASE = import.meta.env.BASE_URL || "/";

function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  // BASE always ends in "/", path always starts with "/" — collapse the seam.
  return `${BASE.replace(/\/$/, "")}${path}`;
}

export function asset(path: string): string {
  return withBase(path);
}

export function link(path: string): string {
  return withBase(path);
}
