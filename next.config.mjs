/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "famco-homepage";

const nextConfig = {
  output: "export",                       // static HTML/CSS/JS export
  images: { unoptimized: true },          // GitHub Pages can't run the optimizer
  trailingSlash: true,                    // makes /about → /about/index.html (Pages-friendly)
  basePath: isProd ? `/${repo}` : "",     // /<repo>/ subpath on github.io
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
