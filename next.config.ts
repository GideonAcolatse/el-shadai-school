import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deepskyblue-stork-698121.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
