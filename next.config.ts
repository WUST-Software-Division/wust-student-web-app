import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow Next.js Image to serve from any HTTPS origin (CMS CDN URLs are dynamic)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  poweredByHeader: false,
};

export default nextConfig;
