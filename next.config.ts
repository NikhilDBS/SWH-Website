import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["192.168.1.9", "0.0.0.0", "localhost"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        // Supabase Storage CDN — serves images published by Prism
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
