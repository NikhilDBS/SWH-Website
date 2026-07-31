import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    allowedDevOrigins: ["192.168.1.9", "0.0.0.0", "localhost"],
  },
};

export default nextConfig;
