import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Required allowlist since Next.js 16
    qualities: [75, 90],
  },
};

export default nextConfig;
