import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "utfs.io",
      "images.pexels.com",
      "images.unsplash.com",
      "img.clerk.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Updated configuration for Next.js 15
  serverExternalPackages: ['@prisma/client'],
  // Fix for development server
  async rewrites() {
    return [];
  },
};

export default nextConfig;