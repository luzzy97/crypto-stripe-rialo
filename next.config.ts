import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Abaikan error TypeScript saat deploy
    ignoreBuildErrors: true,
  },
  eslint: {
    // Abaikan error ESLint saat deploy
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;