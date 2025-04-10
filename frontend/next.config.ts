import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  // disable dev indicator for debugging tool
  devIndicators: false,
};

export default nextConfig;
