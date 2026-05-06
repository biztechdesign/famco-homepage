/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "famco-homepage";

const nextConfig = {
  // Static export only when building for production (GitHub Pages).
  // Dev server stays as a normal Next.js dev experience.
  ...(isProd ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  // Hide the floating "Static route" badge that Next.js shows during dev
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
