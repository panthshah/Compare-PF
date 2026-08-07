import type { NextConfig } from "next";

// GitHub Pages serves the export from a repository subpath. Vercel serves from
// the domain root, so production mode alone must not enable the Pages prefix.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGitHubPages ? "/Compare-PF" : "",
  assetPrefix: isGitHubPages ? "/Compare-PF/" : "",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
