import type { NextConfig } from "next";

// Static export: `npm run build` produces a plain `out/` folder
// that can be uploaded to any hosting (cPanel, Nginx, S3...).
// NEXT_PUBLIC_BASE_PATH is set when the site lives in a sub-folder (GitHub Pages: "/<repo>").
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
